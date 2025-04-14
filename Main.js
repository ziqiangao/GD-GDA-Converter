const { LintGMD, Mitigate } = require("./GMDLint");
const { parseGMD, JSONtoGMD } = require("./GMDtoJSON");
const fs = require('fs');

async function main() {
  try {
    // Wait for the data to be parsed before proceeding
    const parsedLevelData = await parseGMD("Stereo Madness (Mitergated).gmd");
    console.log(parsedLevelData);

    // Now you can safely call LintGMD with the parsed data
    LintGMD(parsedLevelData);
    let fixed = Mitigate(parsedLevelData)

    fs.writeFileSync("mitergated.json",JSON.stringify(fixed))

    GMD = await JSONtoGMD(fixed,"(Mitergated)","ziqgao")
    fs.writeFileSync("mitergated.gmd",GMD)

    console.log("checking corruption")
    
    fs.writeFileSync("reparse.json",JSON.stringify(await parseGMD("mitergated.gmd")))
  } catch (err) {
    console.error("Error parsing GMD:", err);
  }
}

main();
