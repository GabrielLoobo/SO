class Memory {
    _memory;

    constructor(byteSize=4096){
        this._memory = new Array(byteSize).fill(0);
    }

    get_at(byteAddress){
        return this._memory[byteAddress] // Supondo que o endereço passado seja em bytes
    }

    set_at(byteAddress, value) {
        if (value > 2**8 -1 || value < 0) {
            throw new Error("Tentativa de inserção de valor muito grande ou pequeno na memória")
        } 
        
        this._memory[byteAddress] = value;
    }

    get_memory(){
        return this._memory;
    }

    clearMem(){
        this._memory.forEach((element, index) => {
            this._memory[index] = 0;
        });
    }
}

module.exports = {
    Memory: Memory
}