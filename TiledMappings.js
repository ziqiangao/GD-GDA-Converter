UnitsPerBlock = {
    GD: 30,
    Tiled: 16
}

gdOBJToTiledGrid = {
    "offset": 1,
    "unittype": "GD",
    1: 2,
    2: {
        rot: {
            0: 4,
            90: 6,
            180: 5,
            270: 7,
        }
    },
    3: {
        fliptable: {
            N: 0,
            V: 270,
            H: 90,
            VH: 180
        },
        rot: {
            0: 8,
            90: 9,
            180: 11,
            270: 10,
        }
    },
    4: {
        fliptable: {
            N: 0,
            V: 270,
            H: 90,
            VH: 180
        },
        rot: {
            0: 12,
            90: 13,
            180: 15,
            270: 14,
        }
    },
    5: 22,
    6: {
        rot: {
            0: 16,
            90: 19,
            180: 17,
            270: 18,
        }
    },
    7: {
        rot: {
            0: 20,
            180: 20,
            90: 21,
            270: 21
        }
    },
    8: {
        rot: {
            0: 1,
            90: 24,
            180: 23,
            270: 25,
        }
    },
    9: {
        rot: {
            0: 30,
            90: 32,
            180: 31,
            270: 33,
        }
    },
    62: {
        rot: {
            0: 184,
            90: 204,
            180: 188,
            270: 200,
        }
    },
    65: {
        rot: {
            0: 185,
            90: 205,
            180: 187,
            270: 199,
        }
    },
    66: {
        rot: {
            0: 183,
            90: 203,
            180: 189,
            270: 201,
        }
    },
    68: {
        rot: {
            0: 182,
            90: 202,
            180: 186,
            270: 198,
        }
    },
    69: 64,
    70: {
        rot: {
            0: 65,
            90: 68,
            180: 66,
            270: 67,
        }
    },
    71: {
        fliptable: {
            N: 0,
            V: 270,
            H: 90,
            VH: 180
        },
        rot: {
            0: 69,
            90: 70,
            180: 72,
            270: 71,
        }
    },
    72: {
        fliptable: {
            N: 0,
            V: 270,
            H: 90,
            VH: 180
        },
        rot: {
            0: 73,
            90: 74,
            180: 76,
            270: 75,
        }
    },
    73: 77,
    74: {
        rot: {
            0: 78,
            90: 81,
            180: 79,
            270: 80,
        }
    },
    75: {
        rot: {
            0: 82,
            90: 83,
            180: 82,
            270: 83,
        }
    },
}

gdOBJToTiledSP = {
    offset: 16385,
    unittype: "GD",
    10: 14,
    11: 15,
    12: 2,
    13: 1,
    15: { offset: { y: -3 }, ID: 13 },
    16: { offset: { y: -1 }, ID: 11 },
    17: { offset: { y: -8 }, ID: 12 },
    18: 4,
    19: 5,
    20: 6,
    21: 7,
    29: { ID: 3, Properties: { Channel: "BG", Color: "v_color", "Copy Color": "[v_copiedID?false:true]", "Copy from channel": "v_copiedID" } },
    30: { ID: 3, Properties: { Channel: "GROUND", Color: "v_color", "Copy Color": "[v_copiedID?false:true]", "Copy from channel": "v_copiedID" } },
    35: { offset: { y: -13 }, ID: 10 },
    36: 9,
    39: { offset: { y: -9 }, ID: 32 },
    40: { offset: { y: 8 }, ID: 44 },
    41: { offset: { y: 21.5 }, ID: 8 },
    45: 45,
    46: 46,
    47: 26,
    48: 24,
    49: 25,
    50: 20,
    51: 21,
    52: 90,
    53: 22,
    54: 23,
    60: 51,
    61: { offset: { y: -11 }, ID: 38 },
    67: { offset: { y: -13 }, ID: 17 },

}

ObjectLayerPrio = {
    ID: "Tiled",
    L2: [expandRanges("22,38-42,337-342,355-366,1360-1421,1432-1435")]
}

function expandRanges(rangeStr) {
    return rangeStr
        .split(',')
        .flatMap(part => {
            if (part.includes('-')) {
                const [start, end] = part.split('-').map(Number);
                return Array.from({ length: end - start + 1 }, (_, i) => start + i);
            } else {
                return Number(part); // Handle single numbers
            }
        });
}

function rotationFlipToRotation(VFlip, HFlip, Rotation, Fliptable = {}) {
    return (VFlip * 180 + Rotation) % 360
}

//console.log(JSON.stringify(gdOBJToTiledGrid))

module.exports = {
    gdOBJToTiledGrid,
    gdOBJToTiledSP,
    ObjectLayerPrio
};

