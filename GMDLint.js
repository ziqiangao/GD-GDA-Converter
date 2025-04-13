const mappings = require("./TiledMappings");

function LintGMD(GMD) {
    // Check if the "colors" property exists
    if (GMD["info"] && GMD["info"]["colors"]) {
        // Iterate through each color object
        for (let i = 0; i < GMD["info"]["colors"].length; i++) {
            let color = GMD["info"]["colors"][i];
            
            // Check if the channel value exists and is between 5 and 1000
            let channel = parseInt(color["channel"]);
            if (channel > 4 && channel < 1000) {
                console.warn(`Unsupported Colour Channel Found ${channel}`)
            }
        }
    } else {
        console.warn("No colors information found in GMD.");
    }

    if (GMD["data"]) {
        // Iterate through each color object
        for (let i = 0; i < GMD["data"].length; i++) {
            let object = GMD["data"][i];
            
            // Check if the channel value exists and is between 5 and 1000
            let id = parseInt(object["id"]);
            if (!(mappings.gdOBJToTiledGrid[id] || mappings.gdOBJToTiledSP[id])) {
                console.warn(`Unsupported Tiled Mapping Found, #${i} ID ${id} at ${object["x"]/30},${object["y"]/30}`)
            }
            let flipx = object["flipx"]
            let flipy = object["flipy"]
            let r = object["r"]
            if ((flipx || flipy || r !== 0) && mappings.gdOBJToTiledSP[id]) {
                if (flipx || flipy) {
                    if (r) {
                        // Both flip and rotation detected, check if supported
                        console.warn(`Unsupported Rotation And Flip Combination, #${i} ID ${id} at ${object["x"] / 30},${object["y"] / 30}`);
                    }
                }
            }
        }
    } else {
        console.warn("Empty Level!")
    }
}

function Mitigate(GMD) {
    for (let i = 0; i < GMD["data"].length; i++) {
        let object = GMD["data"][i];
        
        
    }
}

module.exports = {
    LintGMD
}

