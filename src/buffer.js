export default {
    append(buffer1, buffer2) {
        if (buffer1 === null) {
            return buffer2;
        }
        var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
        tmp.set(new Uint8Array(buffer1), 0);
        tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
        return tmp.buffer;
    }

}
