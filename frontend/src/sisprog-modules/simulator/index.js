Memory = require('./components/memory').Memory
Register = require('./components/Register').Register

class ExecutionSimulator {
    _memory;
    _PC;
    _RD
    
    constructor(){
        this._memory = new Memory();
        this._PC = new Register(12);
        this._RD = new Register();
    }

    getNibbles(byteValue){
        return [byteValue & 15, byteValue >> 4]
    }

    _getLast12Bits(firstByte, secondByte){
        const nibbles = this.getNibbles(firstByte)
        return ( nibbles[0] << 8 )+ secondByte;
    }

    _JUMP(firstByte, secondByte){
        const newAddress = this._getLast12Bits(firstByte, secondByte);
        this._PC.set(newAddress);
    }

    _JUMP0(firstByte, secondByte){
        if(this._RD.get() === 0){
           const newAddress = this._getLast12Bits(firstByte, secondByte);
           this._PC.set(newAddress); 
        }
    }

    _JUMPN(firstByte, secondByte){
        console.log('TODO_JUMPN')
    }

    _ADD(firstByte, secondByte){
        const address = this._getLast12Bits(firstByte, secondByte);
        this._RD.set(this._RD.get() + this._memory.get_at(address));
    }

    _SUB(firstByte, secondByte){
        const address = this._getLast12Bits(firstByte, secondByte);
        this._RD.set(this._RD.get() - this._memory.get_at(address));
    }

    _MUL(firstByte, secondByte){
        const address = this._getLast12Bits(firstByte, secondByte);
        this._RD.set(this._RD.get() * this._memory.get_at(address));
    }

    _DIV(firstByte, secondByte){
        const address = this._getLast12Bits(firstByte, secondByte);
        this._RD.set(this._RD.get() / this._memory.get_at(address));
    }

    _LOAD(firstByte, secondByte){
        const address = this._getLast12Bits(firstByte, secondByte);
        this._RD.set(this._memory.get_at(address))
    }

    _STORE(firstByte, secondByte){
        const address = this._getLast12Bits(firstByte, secondByte);
        this._memory.set_at(address, this._RD.get())
    }

    _STOP(){

    }

    runNextInstruction(){
        const firstByte = this._memory.get_at(this._PC.get())
        console.log(this._PC.get())
        this._PC.set(this._PC.get() + 1)
        const nibbles = this.getNibbles(firstByte)
        const opCode = nibbles[1]
        let stopExecution = false;
        
        // Operations with 2 words
        if(opCode >= 0 && opCode <=9){
            const secondByte = this._memory.get_at(this._PC.get());
            this._PC.set(this._PC.get() + 1)
            switch(opCode){
                case 0: // 0000
                    this._JUMP(firstByte, secondByte);
                    break;
                case 1: // 0001
                    this._JUMP0(firstByte, secondByte);
                    break;
                case 2: // 0010
                    this._JUMPN(firstByte, secondByte);
                    break;
                case 3: // 0011
                    this._ADD(firstByte, secondByte);
                    break;
                case 4: // 0100
                    this._SUB(firstByte, secondByte);
                    break;
                case 5: // 0101
                    this._MUL(firstByte, secondByte);
                    break;
                case 6: // 0110
                    this._DIV(firstByte, secondByte);
                    break;
                case 7: // 0111
                    this._LOAD(firstByte, secondByte);
                    break;
                case 8: // 1000
                    this._STORE(firstByte, secondByte);
                    break;
                default:
                    break;
            }
        // Operations with 1 word
        }else if(opCode > 9 && opCode <= 15){
            switch(opCode){
                case 13: // 1101
                    this._STOP();
                    stopExecution = true;
                    break;
                default:
                    break;
            }
        }

        return stopExecution;
    }

}

module.exports = {
    ExecutionSimulator: ExecutionSimulator
}