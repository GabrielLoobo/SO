const fs = require('fs');
const path = require('path');

var readlineSync = require('readline-sync');


const BASE_OUTPUT_PATH = path.resolve("src/modules/output/fs");
const BASE_INPUT_PATH = path.resolve("src/modules/input");

const VIRTUAL_MACHINE_PATH = path.resolve("src/modules/vm/fs");

// Leitura a partir de BASE_INPUT_PATH
const readFile = async (fileName) => {
    data = await fs.readFileSync(path.resolve(`${BASE_INPUT_PATH}/${fileName}`), 'utf8');

    return data;
}

const readFileFromVM = async (commandArgs) => {
    const fileName = commandArgs[1];
    data = fs.readFileSync(path.resolve(`${VIRTUAL_MACHINE_PATH}/${fileName}`), 'utf8');

    console.log(data);
    return data;
}

const createFileFromVM = (commandArgs) => {
    const fileName = commandArgs[1]

    fs.appendFile(`${VIRTUAL_MACHINE_PATH}/${fileName}`, "", function(err){
        console.log(err);
    });
}

const removeFileFromVM = (commandArgs) => {
    const fileName = commandArgs[1]

    fs.unlink(path.resolve(`${VIRTUAL_MACHINE_PATH}/${fileName}`), function (err) {
        if (err) throw err;
      });
}

const arrayFromPathString = (pathString) => {
    pathString = pathString.split("/");
    if (pathString[pathString.length - 1] === ""){
        pathString = pathString.slice(0, -1)
    }
    if (pathString[0] === ""){
        pathString = pathString.slice(1, pathString.length)
    }

    return pathString
}

const moveFromVM = (commandArgs, currentPath) => {

    if(commandArgs[1] === ".."){
        currentPath = arrayFromPathString(currentPath);
        currentPath = currentPath.slice(0, -1);
        return "/" + currentPath.join("/");
    }

    // TODO: Verificar se diretório existe antes de prosseguir
    return currentPath + "/" + commandArgs[1];
}

const createDirFromVM = (commandArgs) => {
    fs.mkdir(path.resolve(`${VIRTUAL_MACHINE_PATH}/${commandArgs[1]}`), () => {})
}

const removeDirFromVM = (commandArgs) => {
    fs.rmdir(path.resolve(`${VIRTUAL_MACHINE_PATH}/${commandArgs[1]}`), { recursive: true }, (err) => {
        console.log(err)
    })
}

const showDirFromVM = (commandArgs) => {
    console.log("\nnome\n--------");
}

const writeFileFromVM = () => {}

const openFileFromVM = () => {}

const closeFileFromVM = () => {}

let currentPath = ""

const runCommand = (commandLine) => {
    commandArgs = commandLine.split(" ");

    switch(commandArgs[0]){
        case "ca": // Criar arquivo
            createFileFromVM(commandArgs);
            break;
        case "da": // Deletar arquivo
            removeFileFromVM(commandArgs);
            break;
        case "la": // Ler arquivo
            readFileFromVM(commandArgs);
            break;
        case "ga": // Gravar arquivo
            writeFileFromVM(commandArgs);
            break;
        case "aa": // Abrir arquivo
            openFileFromVM(commandArgs);
            break;
        case "fa": // Fechar arquivo
            closeFileFromVM(commandArgs);
            break;
        case "move":
            currentPath = moveFromVM(commandArgs, currentPath);
            break;
        case "show":
            showDirFromVM(commandArgs);
            break;
        case "cdir": // Cria diretório
            createDirFromVM(commandArgs);
            break;
        case "ddir": // Deleta diretório
            removeDirFromVM(commandArgs);
            break;
        default:
            break;         
    }
}

const mainLoop = async () => {
    while(true){
        const command = readlineSync.question(`VM :${currentPath} `);
        runCommand(command);
    }
}

module.exports = {
    mainLoop:mainLoop, 
    readFile: readFile
}