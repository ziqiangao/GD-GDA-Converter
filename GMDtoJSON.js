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

function toUrlSafeBase64(str) {
    return Buffer.from(str)
        .toString('base64')         // Standard Base64
        .replace(/\+/g, '-')        // Replace '+' with '-'
        .replace(/\//g, '_')        // Replace '/' with '_'
}

async function parseGMD(filePath) {
    const { default: gdparse } = await import('gdparse');
    const gmdRaw = fs.readFileSync(filePath, "utf-8");
    const match = gmdRaw.match(/<k>k4<\/k>\s*<s>(.*?)<\/s>/s);

    if (!match) {
        throw new Error("k4 not found in the plist file.");
    }

    let gmdlvlstring;
    if (match[1].startsWith("H4sIAAAAAAAA")) {
        gmdlvlstring = await decodeUrlSafeBase64AndDecompress(match[1]);
    } else {
        gmdlvlstring = match[1];
    }

    const lvl = gdparse.parseLevel(gmdlvlstring);
    return lvl;
}


async function JSONtoGMD(Level, Name, Author) {
    const { default: gdparse } = await import('gdparse');
    objCount = Level.data.length
    return `
<?xml version="1.0"?>
<plist version="1.0" gjver="2.0">
  <dict>
    <k>kCEK</k><i>4</i>
    <k>k2</k><s>${Name}</s>
    <k>k3</k><s>${toUrlSafeBase64("This Level Has Been Modified To Fix Rotation and Flip Collisons.\nPlease Profreed the level to make sure there aren't any messed up parts")}</s>
    <k>k4</k><s>${gdparse.serializeLevel(Level)}</s>
    <k>k5</k><s>${Author}</s>
    <k>k13</k><t />
    <k>k21</k><i>2</i>
    <k>k50</k><i>45</i>
    <k>k47</k><t />
    <k>k48</k><i>${objCount}</i>
  </dict>
</plist>`
}

module.exports = {
    parseGMD,
    JSONtoGMD
};
