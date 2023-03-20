import ArtworkGenerator from "./artwork/generator.js";

let traitsAndAttributes = {
    "Background": {
        "weight": 1,
        "attributes": {
            "black": {
                "weight": 1,
                "file": "black.png",
                "hash": "522748524ad010358705b6852b81be4c",
                "onlyone": false,
                "upload_order": 1
            }
        }
    },
    "Bottom lid": {
        "weight": 1,
        "attributes": {
            "high": {
                "weight": null,
                "file": "bottom_high.png",
                "hash": "1326e8dbd2ff57d8d6ccd53ac919dc96",
                "onlyone": true,
                "upload_order": 2
            },
            "low": {
                "weight": 0.5,
                "file": "bottom_low.png",
                "hash": "480120be005697f81d03f1e867f5ac2c",
                "onlyone": false,
                "upload_order": 3
            },
            "middle": {
                "weight": 0.5,
                "file": "bottom_middle.png",
                "hash": "379c9c9a47ab6279b7c0d95cd8994467",
                "onlyone": false,
                "upload_order": 4
            }
        }
    },
    "Eye color": {
        "weight": 1,
        "attributes": {
            "cyan": {
                "weight": null,
                "file": "cyan.png",
                "hash": "7daa361598dfacc4a2a634b73575ed65",
                "onlyone": true,
                "upload_order": 5
            },
            "green": {
                "weight": 0.2,
                "file": "green.png",
                "hash": "7daa361598dfacc4a2a634b73575ed65",
                "onlyone": false,
                "upload_order": 6
            },
            "purple": {
                "weight": 0.2,
                "file": "purple.png",
                "hash": "7daa361598dfacc4a2a634b73575ed65",
                "onlyone": false,
                "upload_order": 7
            },
            "red": {
                "weight": 0.2,
                "file": "red.png",
                "hash": "7daa361598dfacc4a2a634b73575ed65",
                "onlyone": false,
                "upload_order": 8
            },
            "pink": {
                "weight": 0.2,
                "file": "red.png",
                "hash": "7daa361598dfacc4a2a634b73575ed65",
                "onlyone": false,
                "upload_order": 9
            },
            "yellow": {
                "weight": 0.2,
                "file": "yellow.png",
                "hash": "7daa361598dfacc4a2a634b73575ed65",
                "onlyone": false,
                "upload_order": 10
            }
        }
    },
    "Eyeball": {
        "weight": 1,
        "attributes": {
            "red": {
                "weight": 0.5,
                "file": "cyan.png",
                "hash": "7daa361598dfacc4a2a634b73575ed65",
                "onlyone": false,
                "upload_order": 11
            },
            "white": {
                "weight": 0.5,
                "file": "red.png",
                "hash": "7daa361598dfacc4a2a634b73575ed65",
                "onlyone": false,
                "upload_order": 12
            }
        }
    },
    "Iris": {
        "weight": null,
        "attributes": {
            "large": {
                "weight": null,
                "file": "white.png",
                "hash": "7daa361598dfacc4a2a634b73575ed65",
                "onlyone": false,
                "upload_order": 13
            },
            "medium": {
                "weight": null,
                "file": "large.png",
                "hash": "7daa361598dfacc4a2a634b73575ed65",
                "onlyone": true,
                "upload_order": 14
            },
            "small": {
                "weight": 1,
                "file": "medium.png",
                "hash": "7daa361598dfacc4a2a634b73575ed65",
                "onlyone": false,
                "upload_order": 15
            }
        }
    },
    "Shine": {
        "weight": 1,
        "attributes": {
            "shapes": {
                "weight": 1,
                "file": "small.png",
                "hash": "7daa361598dfacc4a2a634b73575ed65",
                "onlyone": false,
                "upload_order": 16
            }
        }
    },
    "Top lid": {
        "weight": null,
        "attributes": {
            "high": {
                "weight": null,
                "file": "shine.png",
                "hash": "7daa361598dfacc4a2a634b73575ed65",
                "onlyone": true,
                "upload_order": 17
            },
            "low": {
                "weight": null,
                "file": "sup_high.png",
                "hash": "1326e8dbd2ff57d8d6ccd53ac919dc96",
                "onlyone": true,
                "upload_order": 18
            },
            "middle": {
                "weight": null,
                "file": "sup_low.png",
                "hash": "480120be005697f81d03f1e867f5ac2c",
                "onlyone": true,
                "upload_order": 19
            }
        }
    }
};

let trait_order = [
    "Background",
    "Bottom lid",
    "Eye color",
    "Eyeball",
    "Iris",
    "Shine",
    "Top lid"
];

let rule1 = {
    "type": "combination",
    "trait": "Bottom lid",
    "attribute": "low",
    "others": [
        {
            "trait": "Iris",
            "attribute": "large"
        },
        {
            "trait": "Iris",
            "attribute": "medium"
        }
    ]
};

let rule2 = {
    "type": "exclusion",
    "trait": "Eyeball",
    "attribute": "red",
    "others": [
        {
            "trait": "Eye color",
            "attribute": "red"
        },
        {
            "trait": "Eye color",
            "attribute": "pink"
        }
    ]
};


console.log("Layer preview\n");
console.log(ArtworkGenerator.generateLayerPreview(traitsAndAttributes, trait_order, 3));
console.log("\n\n");

console.log("Combination preview\n");
console.log(ArtworkGenerator.generateRulePreview(traitsAndAttributes, trait_order, rule1, 3));
console.log("\n\n");

console.log("Exclusion preview\n\n");
console.log(ArtworkGenerator.generateRulePreview(traitsAndAttributes, trait_order, rule2, 3));
console.log("\n\n");

