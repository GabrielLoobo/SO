fileSystem = require('./file-system');
ExecutionSimulator = require('../sisprog-modules/simulator/index').ExecutionSimulator
Loader = require('../sisprog-modules/loader-dumper/loader').Loader
Dumper = require('../sisprog-modules/loader-dumper/dumper').Dumper
Assembler = require('../sisprog-modules/assembler/index').Assembler

const parseIntToHex = (intValue, hexDigits) => {

    return '0x' + intValue.toString(16).toUpperCase().padStart(hexDigits, '0');
}

const test1 = async () => {
    const _es = new ExecutionSimulator();
    const _loader = new Loader();
    const _assembler = new Assembler();
    const _dumper = new Dumper();

    function setupExecution(rawInputCode) {
        const assemblerResult = _assembler.assembleFromRawInput(rawInputCode)
        const initialAddress = _loader.loadFromBinaryString(assemblerResult, _es._memory);
        _es._PC.set(initialAddress)
        return {
            RD: _es._RD.get(),
            PC: _es._PC.get(),
            memory: _es._memory.get_memory()
        }
    
    }

    function getMemoryState(){
        return {
            RD: _es._RD.get(),
            PC: _es._PC.get(),
            memory: _es._memory.get_memory()
        }
    }

    function printMemFromPos(startPosInt, window = 20) {
        let curr_mem_state = getMemoryState().memory;
        console.log("Valores a partir do endereço " + parseIntToHex(startPosInt));
        const hexVector = []
        curr_mem_state.slice(startPosInt,startPosInt+window).forEach(val => {
            hexVector.push(parseIntToHex(val));
        })
        console.log(hexVector + "\n");
    }

    // Rotina de testes
    inputProgram = await fileSystem.readFile('input-file.txt');

    // A) 
    console.log("Teste 1 - item A");
    console.log("Programa de exemplo inserido na memória: ")
    setupExecution(inputProgram);
    printMemFromPos(660, 30)
    _es._memory.clearMem();

    // B) 
    console.log("Teste 1 - item B");
    console.log("Conteúdo da memória antes de executar efetuar a carga: \n");
    printMemFromPos(660, 30) // 660 decimal = 294 hex
    
    setupExecution(inputProgram);
    console.log("Conteúdo da memória após de executar efetuar a carga: \n");
    printMemFromPos(660, 30)

    // C)
    console.log("Teste 1 - item C");
    console.log("Valores da memória que serão inseridos na fita objeto pelo dumper: ");
    printMemFromPos(660, 30)
    fitaSaida = _dumper.dumpToBinaryStringFromAddr(_es._memory.get_memory(), 660);
    console.log("Fita objeto obtida: ");
    console.log(fitaSaida + "\n");

    //D)
    console.log("Teste 1 - item D");
    console.log("Zerando o conteúdo da memória..");
    _es._memory.clearMem();
    printMemFromPos(660, 30);

    console.log("Inserindo o conteúdo da fita objeto na memória..")
    _loader.loadFromBinaryString(fitaSaida, _es._memory);
    printMemFromPos(660, 30);

}


const test3 = () => {
    fileSystem.mainLoop();
}

const main = (async () => {
    // await test1();
    await test3();

})();