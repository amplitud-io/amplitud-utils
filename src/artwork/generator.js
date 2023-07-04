function generatePreview(traitsAndAttributes, traitsOrder, rule, tokenCount) {
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

    while (generated.length < tokenCount && attempts < maxAttempts) {
        attempts++;
        let attrs = [];
        let idParts = [];
        let map = {};

        traitsOrder.forEach(traitName => {
            let attributeName = pickAttribute(traitName);
            if (attributeName) {
                attrs.push(traitsAndAttributes[traitName].attributes[attributeName].file)
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
                if (rule.type === 'combination' || rule.type === 'exclusion') {
                    skip = true;
                    if (map[rule.trait] && map[rule.trait][rule.attribute]) {
                        for (let other of rule.others) {
                            if (map[other.trait] && map[other.trait][other.attribute]) {
                                skip = false;
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

    if (generated.length < tokenCount) {
        throw new Error("Couldn't generate " + tokenCount + " NFTs. Please add more traits, reduce the number of NFTs or revise the combinations/exclusions.");
    }


    return generated;
}

function generateNFTs(traitsAndAttributes, traitsOrder, rules, tokenCount) {
    let generated = [];
    let mapAttributes = {};
    let ids = {};
    let mapRarities = {};
    let tokenId = 1;

    let maxAttempts = 100000;
    let attempts = 0;

    if (!rules) {
        rules = [];
    }

    traitsOrder.forEach(traitName => {
        mapAttributes[traitName] = Object.keys(traitsAndAttributes[traitName].attributes);
        mapRarities[traitName] = {
            weight: traitsAndAttributes[traitName].weight || 0,
            attributeWeightSum: 0,
            attributes: [],
            onlyOneAttributes: [],
        };

        mapAttributes[traitName].forEach(attributeName => {
            let attribute = traitsAndAttributes[traitName].attributes[attributeName];
            if (attribute.dynamic) {
                return;
            }
            if (attribute.onlyone) {
                mapRarities[traitName].onlyOneAttributes.push(attributeName);
            } else {
                let attrWeight = 0;
                let totalSum = mapRarities[traitName].attributeWeightSum;
                if (attribute.weight) {
                    attrWeight = attribute.weight;
                    totalSum += attrWeight;
                }

                mapRarities[traitName].attributeWeightSum = totalSum;
                mapRarities[traitName].attributes.push({ attributeName: attributeName, weight: totalSum });
            }
        });
    });

    function pickAttribute(traitName) {
        let attributeName = null;
        let onlyone = false;

        let onlyoneAttributes = mapRarities[traitName].onlyOneAttributes;

        let traitWeight = mapRarities[traitName].weight;
        if (traitWeight < Math.random() && onlyoneAttributes.length === 0) {
            return null;
        }

        let attributes = mapRarities[traitName].attributes;

        if (onlyoneAttributes.length > 0) {
            attributeName = onlyoneAttributes[0];
            onlyone = true;
        } else if (attributes.length > 0) {
            let pick = Math.random() * mapRarities[traitName].attributeWeightSum;
            for (let i = 0; i < attributes.length; i++) {
                if (attributes[i].weight > pick) {
                    attributeName = attributes[i].attributeName;
                    break;
                }
            }
        }

        if (attributeName) {
            return { name: attributeName, onlyone: onlyone }
        } else {
            return null;
        }
    }

    while (generated.length < tokenCount && attempts < maxAttempts) {
        attempts++;
        let attrs = {};
        let idParts = [];
        let map = {};

        let onlyOneAttrs = [];

        traitsOrder.forEach(traitName => {
            let attribute = pickAttribute(traitName);
            if (attribute) {
                attrs[traitName] = attribute.name;
                idParts.push(traitName + '_' + attribute.name);
                if (!map[traitName]) {
                    map[traitName] = {};
                }
                map[traitName][attribute.name] = true;

                if (attribute.onlyone) {
                    onlyOneAttrs.push({ trait: traitName, attribute: attribute.name });
                }
            } else {
                attrs[traitName] = null;
            }
        });

        let id = idParts.join("|");

        if (!ids[id]) {
            let skip = false;

            for (let rule of rules) {
                if (skip) {
                    break;
                }
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
                generated.push({
                    ...attrs
                });
                ids[id] = true;
                onlyOneAttrs.forEach(attr => {
                    mapRarities[attr.trait].onlyOneAttributes.shift();
                });
            }
        }
    }

    if (generated.length < tokenCount) {
        throw new Error("Couldn't generate " + tokenCount + " NFTs. Please add more traits, reduce the number of NFTs or revise the combinations/exclusions.");
    }


    return generated;
}

function getTokenImages(traitsAndAttributes, traitsOrder, tokens) {
    let imageList = [];
    tokens.forEach(token => {
        let images = [];
        traitsOrder.forEach(traitName => {
            let attributeName = token.metadata[traitName];
            if (attributeName) {
                let attribute = traitsAndAttributes[traitName].attributes[attributeName];
                images.push(attribute.file);
            }
        });
        imageList.push(images);
    });

    return imageList;
}

export default {

    generateLayerPreview(traitsAndAttributes, traitsOrder, tokenCount) {
        return generatePreview(traitsAndAttributes, traitsOrder, null, tokenCount);
    },

    generateRulePreview(traitsAndAttributes, traitsOrder, rule, tokenCount) {
        return generatePreview(traitsAndAttributes, traitsOrder, rule, tokenCount);
    },

    generateNFTs(traitsAndAttributes, traitsOrder, rules, tokenCount) {
        return generateNFTs(traitsAndAttributes, traitsOrder, rules, tokenCount);
    },

    getTokenImages(traitsAndAttributes, traitsOrder, tokens) {
        return getTokenImages(traitsAndAttributes, traitsOrder, tokens);
    }
}
