const fs = require('fs');
const zlib = require('zlib');

// Function to decode URL-safe base64 and decompress using zlib
function decodeUrlSafeBase64AndDecompress(base64UrlSafeString) {
    return new Promise((resolve, reject) => {
        let base64String = base64UrlSafeString
            .replace(/-/g, '+')
            .replace(/_/g, '/')
            .padEnd(base64UrlSafeString.length + (4 - base64UrlSafeString.length % 4) % 4, '=');

        const buffer = Buffer.from(base64String, 'base64');

        zlib.unzip(buffer, (err, decompressedBuffer) => {
            if (err) {
                return reject(new Error("Decompression failed: " + err.message));
            }

            resolve(decompressedBuffer.toString());
        });
    });
}

async function parseGMD(filePath = "Stereo Madness.gmd", outputPath = "parsed_level.json") {
    const { default: gdparse } = await import('gdparse');

    const gmdRaw = fs.readFileSync(filePath, "utf-8");
    const match = gmdRaw.match(/<k>k4<\/k>\s*<s>(.*?)<\/s>/s);

    if (!match) {
        throw new Error("k4 not found in the plist file.");
    }

    const gmdlvlstring = await decodeUrlSafeBase64AndDecompress(match[1]);
    const lvl = gdparse.parseLevel(gmdlvlstring);

    fs.writeFileSync(outputPath, JSON.stringify(lvl, null, 2), "utf-8");

    return lvl;
}

module.exports = {
    parseGMD
};
