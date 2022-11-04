import ExecutionSimulator from '../simulator/index'
import Loader from '../loader-dumper/loader';
import Assembler from '../assembler';

export default class Controller {
    _es;
    _loader;
    _assembler;

    constructor() {
        this._es = new ExecutionSimulator();
        this._loader = new Loader();
        this._assembler = new Assembler();
    }
    
    getMemoryState(){
        return {
            RD: this._es._RD.get(),
            PC: this._es._PC.get(),
            memory: this._es._memory.get_memory()
        }
    }

    setupExecution(rawInputCode) {
        const assemblerResult = this._assembler.assembleFromRawInput(rawInputCode)
        const initialAddress = this._loader.loadFromBinaryString(assemblerResult, this._es._memory);
        this._es._PC.set(initialAddress)
        return {
            RD: this._es._RD.get(),
            PC: this._es._PC.get(),
            memory: this._es._memory.get_memory()
        }
    
    }

    runInstruction(){
        this._es.runNextInstruction();
        return this.getMemoryState();
    }

    run(){
        let stopExec = false;
        let execCounter = 0
        console.log( this._es._PC.get(), this._es._memory.get_memory().length)
        while(
            !stopExec &&
            this._es._PC.get() < this._es._memory.get_memory().length &&
            execCounter < 500
            ){
            execCounter += 1;
            stopExec = this._es.runNextInstruction();
        }

        return this.getMemoryState();
    }
}