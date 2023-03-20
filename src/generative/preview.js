function generatePreview(traitsAndAttributes, traitsOrder, rule, previewCount) {
    let generated = [];
    let mapAttributes = {};
    let ids = {};

    let maxAttempts = 100000;
    let attempts = 0;


    traitsOrder.forEach(traitName => {
        mapAttributes[traitName] = Object.keys(traitsAndAttributes[traitName].attributes);
    });

    function pickAttribute(traitName) {
        let items = mapAttributes[traitName];
        return items[items.length * Math.random() | 0];
    }

    while (generated.length < previewCount && attempts < maxAttempts) {
        attempts++;
        let attrs = [];
        let idParts = [];
        let map = {};

        traitsOrder.forEach(traitName => {
            let attributeName = pickAttribute(traitName);
            if (attributeName) {
                let attr = {
                    trait: traitName,
                    attribute: attributeName
                };
                attrs.push(attr);
                idParts.push(traitName + '_' + attributeName);
                if (!map[traitName]) {
                    map[traitName] = {};
                }
                map[traitName][attributeName] = true;
            }
        });

        let id = idParts.join("|");

        if (!ids[id]) {
            let skip = false;
            if (rule) {
                if (rule.type === 'combination') {
                    if (map[rule.trait] && map[rule.trait][rule.attribute]) {
                        skip = true;
                        for (let other of rule.others) {
                            if (map[other.trait] && map[other.trait][other.attribute]) {
                                skip = false;
                                break;
                            }
                        }
                    }
                } else if (rule.type === 'exclusion') {
                    if (map[rule.trait] && map[rule.trait][rule.attribute]) {
                        skip = false;
                        for (let other of rule.others) {
                            if (map[other.trait] && map[other.trait][other.attribute]) {
                                skip = true;
                                break;
                            }
                        }

                    }

                } else {
                    throw new Error("Invalid rule type:", rule.type);
                }
            }


            if (!skip) {
                generated.push(attrs);
                ids[id] = true;
            }
        }
    }

    if (generated.length < previewCount) {
        throw new Error("Not enough traits to generate " + previewCount + " NFTs. Please try adding more traits or reducing the number of NFTs.");
    }


    return generated;
}

export default {

    generateLayerPreview(traitsAndAttributes, traitsOrder, previewCount) {
        return generatePreview(traitsAndAttributes, traitsOrder, null, previewCount);
    },

    generateRulePreview(traitsAndAttributes, traitsOrder, rule, previewCount) {
        return generatePreview(traitsAndAttributes, traitsOrder, rule, previewCount);
    },
}
