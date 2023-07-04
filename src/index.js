import fs from "fs";
import ArtworkGenerator from "./artwork/generator.js";
import ArtworkParser from "./artwork/parser.js";


function readLayers() {
    const fileBuffer = fs.readFileSync("resources/layers.zip");
    ArtworkParser.processLayersZip(fileBuffer, {
        onNewEntry(entry) {
            console.log(entry);
        }
    });
}

function generatePreviews() {

    let traits_and_attributes = {
        "Iris": {
            "weight": 1,
            "attributes": {
                "large": {
                    "file": "231_p9GiSGFp6n",
                    "hash": "b279d45e5fa0c8eb0cb09dcaadb12284",
                    "size": 5476,
                    "weight": null,
                    "dynamic": true,
                    "onlyone": false,
                    "original_order": 19
                },
                "small": {
                    "file": "229_wHaPdy0n3y",
                    "hash": "40203fc8fa4078c8d1feebd59aeeaa4d",
                    "size": 5037,
                    "weight": null,
                    "dynamic": false,
                    "onlyone": true,
                    "original_order": 17
                },
                "medium": {
                    "file": "230_AYARXK3LaK",
                    "hash": "80bd3e120ec4b0e195c3dec045d95c07",
                    "size": 6106,
                    "weight": null,
                    "dynamic": true,
                    "onlyone": false,
                    "original_order": 18
                }
            }
        },
        "Shine": {
            "weight": 1,
            "attributes": {
                "shapes": {
                    "file": "225_DY3bwWsOIV",
                    "hash": "90e5fb925aa02b37a7b3b47cdb96de05",
                    "size": 5837,
                    "weight": 1,
                    "dynamic": false,
                    "onlyone": false,
                    "original_order": 13
                }
            }
        },
        "Eyeball": {
            "weight": 1,
            "attributes": {
                "red": {
                    "file": "223_d1hwKCBlmt",
                    "hash": "dedddbfe7a3a763d5e84a3d6707c8d2f",
                    "size": 197823,
                    "weight": 0.3333333333,
                    "dynamic": false,
                    "onlyone": false,
                    "original_order": 11
                },
                "white": {
                    "file": "224_syfS2DljBj",
                    "hash": "5ab7f65c5663230f3dd023d4aa8eb282",
                    "size": 72116,
                    "weight": 0.6666666666,
                    "dynamic": false,
                    "onlyone": false,
                    "original_order": 12
                }
            }
        },
        "Top lid": {
            "weight": 1,
            "attributes": {
                "low": {
                    "file": "226_T5xDC6XGoa",
                    "hash": "a32417a975047628298a0e8bf3fd5b99",
                    "size": 88423,
                    "weight": 1,
                    "dynamic": false,
                    "onlyone": false,
                    "original_order": 14
                },
                "high": {
                    "file": "228_c61T7ZK6rk",
                    "hash": "6bf67765bcdb5ba7b5897f6f16edef40",
                    "size": 70037,
                    "weight": null,
                    "dynamic": true,
                    "onlyone": false,
                    "original_order": 16
                },
                "middle": {
                    "file": "227_8aXTzE6rSN",
                    "hash": "fff66cdbea94925bbd205f757932bd95",
                    "size": 93157,
                    "weight": null,
                    "dynamic": true,
                    "onlyone": false,
                    "original_order": 15
                }
            }
        },
        "Eye color": {
            "weight": 1,
            "attributes": {
                "red": {
                    "file": "221_XZmRMCDAk4",
                    "hash": "df341fe2cd5dcbcaa23b1c2754882768",
                    "size": 46544,
                    "weight": null,
                    "dynamic": true,
                    "onlyone": false,
                    "original_order": 9
                },
                "cyan": {
                    "file": "217_KkpMMOetBm",
                    "hash": "16823aaede90beabcad8a65e6bf9baed",
                    "size": 48873,
                    "weight": null,
                    "dynamic": false,
                    "onlyone": true,
                    "original_order": 5
                },
                "pink": {
                    "file": "219_p5nYAntsWE",
                    "hash": "495e3e691d9e784c2cfe8487b803cb59",
                    "size": 43160,
                    "weight": null,
                    "dynamic": true,
                    "onlyone": false,
                    "original_order": 7
                },
                "green": {
                    "file": "218_ziIzb0bIuR",
                    "hash": "622f8af18bac72b134ed80e77f733a33",
                    "size": 48804,
                    "weight": 1,
                    "dynamic": false,
                    "onlyone": false,
                    "original_order": 6
                },
                "purple": {
                    "file": "220_Zb5XF0w9Qw",
                    "hash": "e902b97f707d6f4a5b1753dd01555202",
                    "size": 48838,
                    "weight": null,
                    "dynamic": true,
                    "onlyone": false,
                    "original_order": 8
                },
                "yellow": {
                    "file": "222_5QZhi176xk",
                    "hash": "6889e69c56f92c21231d1b7071a5de81",
                    "size": 51239,
                    "weight": null,
                    "dynamic": true,
                    "onlyone": false,
                    "original_order": 10
                }
            }
        },
        "Background": {
            "weight": 1,
            "attributes": {
                "black": {
                    "file": "213_H6AWBAMakn",
                    "hash": "8af85a688b2bf2a31e4a81af0e0858b6",
                    "size": 2426,
                    "weight": 1,
                    "dynamic": false,
                    "onlyone": false,
                    "original_order": 1
                }
            }
        },
        "Bottom lid": {
            "weight": 1,
            "attributes": {
                "low": {
                    "file": "214_2pfP6lDXzn",
                    "hash": "aa7419465ee5801f94eeae81ebd58c23",
                    "size": 78010,
                    "weight": 1,
                    "dynamic": false,
                    "onlyone": false,
                    "original_order": 2
                },
                "high": {
                    "file": "216_L3DGFrDKL4",
                    "hash": "b1e26ead2b0eb4444a1789caf61bc390",
                    "size": 94702,
                    "weight": null,
                    "dynamic": true,
                    "onlyone": false,
                    "original_order": 4
                },
                "middle": {
                    "file": "215_cAeJmcoXuA",
                    "hash": "5752b276ba3ff2ffe6eb87570ed5f86b",
                    "size": 101329,
                    "weight": null,
                    "dynamic": true,
                    "onlyone": false,
                    "original_order": 3
                }
            }
        }
    };


    // let traits_and_attributes = {
    //     "Background": {
    //         "weight": 1,
    //         "attributes": {
    //             "black": {
    //                 "weight": 1,
    //                 "file": "black.png",
    //                 "hash": "522748524ad010358705b6852b81be4c",
    //                 "onlyone": false,
    //                 "upload_order": 1
    //             }
    //         }
    //     },
    //     "Bottom lid": {
    //         "weight": 1,
    //         "attributes": {
    //             "high": {
    //                 "weight": null,
    //                 "file": "bottom_high.png",
    //                 "hash": "1326e8dbd2ff57d8d6ccd53ac919dc96",
    //                 "onlyone": true,
    //                 "upload_order": 2
    //             },
    //             "low": {
    //                 "weight": 0.5,
    //                 "file": "bottom_low.png",
    //                 "hash": "480120be005697f81d03f1e867f5ac2c",
    //                 "onlyone": false,
    //                 "upload_order": 3
    //             },
    //             "middle": {
    //                 "weight": 0.5,
    //                 "file": "bottom_middle.png",
    //                 "hash": "379c9c9a47ab6279b7c0d95cd8994467",
    //                 "onlyone": false,
    //                 "upload_order": 4
    //             }
    //         }
    //     },
    //     "Eye color": {
    //         "weight": 1,
    //         "attributes": {
    //             "cyan": {
    //                 "weight": null,
    //                 "file": "cyan.png",
    //                 "hash": "7daa361598dfacc4a2a634b73575ed65",
    //                 "onlyone": true,
    //                 "upload_order": 5
    //             },
    //             "green": {
    //                 "weight": 0.2,
    //                 "file": "green.png",
    //                 "hash": "7daa361598dfacc4a2a634b73575ed65",
    //                 "onlyone": false,
    //                 "upload_order": 6
    //             },
    //             "purple": {
    //                 "weight": 0.2,
    //                 "file": "purple.png",
    //                 "hash": "7daa361598dfacc4a2a634b73575ed65",
    //                 "onlyone": false,
    //                 "upload_order": 7
    //             },
    //             "red": {
    //                 "weight": 0.2,
    //                 "file": "red.png",
    //                 "hash": "7daa361598dfacc4a2a634b73575ed65",
    //                 "onlyone": false,
    //                 "upload_order": 8
    //             },
    //             "pink": {
    //                 "weight": 0.2,
    //                 "file": "red.png",
    //                 "hash": "7daa361598dfacc4a2a634b73575ed65",
    //                 "onlyone": false,
    //                 "upload_order": 9
    //             },
    //             "yellow": {
    //                 "weight": 0.2,
    //                 "file": "yellow.png",
    //                 "hash": "7daa361598dfacc4a2a634b73575ed65",
    //                 "onlyone": false,
    //                 "upload_order": 10
    //             }
    //         }
    //     },
    //     "Eyeball": {
    //         "weight": 1,
    //         "attributes": {
    //             "red": {
    //                 "weight": 0.5,
    //                 "file": "cyan.png",
    //                 "hash": "7daa361598dfacc4a2a634b73575ed65",
    //                 "onlyone": false,
    //                 "upload_order": 11
    //             },
    //             "white": {
    //                 "weight": 0.5,
    //                 "file": "red.png",
    //                 "hash": "7daa361598dfacc4a2a634b73575ed65",
    //                 "onlyone": false,
    //                 "upload_order": 12
    //             }
    //         }
    //     },
    //     "Iris": {
    //         "weight": 1,
    //         "attributes": {
    //             "large": {
    //                 "weight": null,
    //                 "file": "white.png",
    //                 "hash": "7daa361598dfacc4a2a634b73575ed65",
    //                 "onlyone": false,
    //                 "upload_order": 13
    //             },
    //             "medium": {
    //                 "weight": null,
    //                 "file": "large.png",
    //                 "hash": "7daa361598dfacc4a2a634b73575ed65",
    //                 "onlyone": true,
    //                 "upload_order": 14
    //             },
    //             "small": {
    //                 "weight": 1,
    //                 "file": "medium.png",
    //                 "hash": "7daa361598dfacc4a2a634b73575ed65",
    //                 "onlyone": false,
    //                 "upload_order": 15
    //             }
    //         }
    //     },
    //     "Shine": {
    //         "weight": 0.5,
    //         "attributes": {
    //             "shapes": {
    //                 "weight": 1,
    //                 "file": "small.png",
    //                 "hash": "7daa361598dfacc4a2a634b73575ed65",
    //                 "onlyone": false,
    //                 "upload_order": 16
    //             }
    //         }
    //     },
    //     "Top lid": {
    //         "weight": 1,
    //         "attributes": {
    //             "high": {
    //                 "weight": null,
    //                 "file": "shine.png",
    //                 "hash": "7daa361598dfacc4a2a634b73575ed65",
    //                 "onlyone": true,
    //                 "upload_order": 17
    //             },
    //             "low": {
    //                 "weight": null,
    //                 "file": "sup_high.png",
    //                 "hash": "1326e8dbd2ff57d8d6ccd53ac919dc96",
    //                 "onlyone": true,
    //                 "upload_order": 18
    //             },
    //             "middle": {
    //                 "weight": null,
    //                 "file": "sup_low.png",
    //                 "hash": "480120be005697f81d03f1e867f5ac2c",
    //                 "onlyone": true,
    //                 "upload_order": 19
    //             }
    //         }
    //     }
    // };

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
                "attribute": "small"
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
    console.log(ArtworkGenerator.generateLayerPreview(traits_and_attributes, trait_order, 12));
    console.log("\n\n");

    console.log("Combination preview\n");
    console.log(ArtworkGenerator.generateRulePreview(traits_and_attributes, trait_order, rule1, 4));
    console.log("\n\n");

    console.log("Exclusion preview\n\n");
    console.log(ArtworkGenerator.generateRulePreview(traits_and_attributes, trait_order, rule2, 4));
    console.log("\n\n");


    console.log("NFTs generation\n\n");
    let nfts = ArtworkGenerator.generateNFTs(traits_and_attributes, trait_order, [], 3);
    // let imgs = ArtworkGenerator.getTokenImages(traits_and_attributes, trait_order, nfts);
    console.log(nfts);
    //console.log(imgs);
    console.log("\n\n");

}

generatePreviews();
//readLayers();