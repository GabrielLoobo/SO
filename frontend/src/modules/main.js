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

    // B) 
    console.log("Teste 1 - item B");
    console.log("Conteúdo da memória antes de executar o teste: \n");
    printMemFromPos(660, 20) // 660 decimal = 294 hex
    inputProgram = await fileSystem.readFile('input-file.txt');
    setupExecution(inputProgram);
    printMemFromPos(660, 20)

    // C)
    console.log("Teste 1 - item C");
    printMemFromPos(660, 20)
    // TODO: Implementar dumper simples
    fitaSaida = _dumper.dumpToBinaryStringFromAddr(_es._memory.get_memory(), 660);

    //D)
    console.log("Teste 1 - item D");
    _es._memory.clearMem();
    printMemFromPos(660, 20);
    _loader.loadFromBinaryString(fitaSaida, _es._memory);
    printMemFromPos(660, 20);

}

const main = (async () => {
    await test1();
})();