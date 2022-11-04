const fs = require('fs');
const path = require('path');

const BASE_OUTPUT_PATH = path.resolve("src/modules/output/fs");
const BASE_INPUT_PATH = path.resolve("src/modules/input");

// Leitura a partir de BASE_INPUT_PATH
const readFile = async (fileName) => {
    data = await fs.readFileSync(path.resolve(`${BASE_INPUT_PATH}/${fileName}`), 'utf8');

    return data;
}

module.exports = {
    readFile: readFile
}