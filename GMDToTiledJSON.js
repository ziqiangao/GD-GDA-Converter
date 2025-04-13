const LevelParams = require("./LevelParams");
const fs = require('fs');
const lint = require("./GMDLint")

// Read the contents of 'parsed_level.json' synchronously and store it in a variable
const parsedLevelData = JSON.parse(fs.readFileSync("parsed_level.json", 'utf8'));

// Now you can work with 'parsedLevelData'

lint.LintGMD(parsedLevelData)

console.log(LevelParams.getBestSize(parsedLevelData["data"]));
console.log(JSON.stringify(LevelParams.findDuplicatePositions(parsedLevelData["data"])))
console.log(JSON.stringify(parsedLevelData["info"]))
