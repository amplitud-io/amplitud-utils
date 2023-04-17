import { everyLimit } from 'modern-async';
import BufferUtils from "../buffer.js";

import unzip from 'unzip-js';
import util from 'util';
import SparkMD5 from 'spark-md5';

let readZipEntries = function (zipFile) {
    return new Promise(function (resolve, reject) {
        zipFile.readEntries(function (err, entries) {
            if (err) {
                reject(err);
            } else {
                resolve(entries);
            }
        });
    });
};

let readEntry = function (zipFile, entry) {
    return new Promise(function (resolve, reject) {
        zipFile.readEntryData(entry, false, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export default {

    async processLayersZip(file, layerHandler) {
        let zipFile = await util.promisify(unzip)(file);
        let entries = await readZipEntries(zipFile);

        let finalEntries = entries.filter(entry => {
            if (!(entry.name.endsWith('.png'))) {
                return false;
            }

            let pathPos = entry.name.indexOf('/');

            if (pathPos < 0) {
                return false;
            }

            if (entry.name.lastIndexOf('/') !== pathPos) {
                return false;
            }

            entry.traitName = entry.name.substr(0, pathPos);
            entry.attributeName = entry.name.substr(pathPos + 1).replace(".png", "");

            if (entry.attributeName[0] === '.') {
                return false;
            }

            return true;
        });

        let processEntry = async function (entry) {
            return await new Promise(async function (resolve, reject) {

                let finished = false;
                function reportError(error) {
                    if (!finished) {
                        finished = true;
                        reject(error);
                        return;
                    }
                }

                try {
                    let readStream = await readEntry(zipFile, entry);
                    let data = null;
                    let md5 = new SparkMD5.ArrayBuffer();

                    readStream.on('data', function (chunk) {
                        try {
                            data = BufferUtils.append(data, chunk);
                            md5.append(chunk);
                        } catch (e) {
                            reportError(e);
                        }
                    });

                    readStream.on('end', function () {
                        if (!finished) {
                            finished = true;
                            let md5hash = md5.end();
                            resolve({ data, md5hash });
                        }
                    });

                } catch (err) {
                    reportError(err);
                }
            });
        };

        let blockingError = null;

        await everyLimit(finalEntries, async (entry) => {
            try {
                layerHandler.onNewEntry(entry);
                let result = await processEntry(entry);
                layerHandler.handleEntry(entry, result.data, result.md5hash);
                return false;
            } catch (err) {
                console.log(err);
                layerHandler.onError(err);
                blockingError = err;
                return false;
            }

        }, 3);

        if (blockingError) {
            throw blockingError;
        }
    }
}