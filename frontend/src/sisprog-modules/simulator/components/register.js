class Register {
    _value;
    _regSize;

    constructor(regSize=8){
        this._value = 0;
        this._regSize = regSize;
    }

    set(value){
        if (value < 0 || value > 2**this._regSize){
            throw new Error("Tentativa inválida de inserção no registrador")
        }
        this._value = value;
    }

    get(){
        return this._value;
    }
}


module.exports = {
    Register: Register
}