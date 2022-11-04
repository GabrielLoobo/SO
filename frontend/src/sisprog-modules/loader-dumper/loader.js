
class Loader{
    constructor(){}

    getFirstByteFromString(binaryString) {
        return binaryString.slice(0, 8);
    }

    loadFromBinaryString(binaryString, memory){
        const initialAddress = parseInt(binaryString.slice(0, 16), '2')
        let addressOffset = 0;
        let codeString = binaryString.slice(16, binaryString.length)

        while(codeString !== ''){
            // TODO: Validar Strings sem múltiplo de 8 bits
            const byteStrValue = this.getFirstByteFromString(codeString);
            memory.set_at( initialAddress + addressOffset, parseInt(byteStrValue, '2'))
            addressOffset += 1;
            codeString = codeString.slice(8, codeString.length)
        }

        return initialAddress;
    }
}


module.exports = {
    Loader: Loader
}