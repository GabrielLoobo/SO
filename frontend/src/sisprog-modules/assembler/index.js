function bin4bit(unitHexa){  // funcao de conversao de hex pra bit que forca 4 bits sempre
    switch(unitHexa){
        case '0':
            return '0000';
            break;
        
        case '1':
            return '0001';
            break;

        case '2':
            return '0010';
            break;

        case '3':
            return '0011';
            break;
            
        case '4':
            return '0100';
            break;

        case '5':
            return '0101';
            break;

        case '6':
            return '0110';
            break;

        case '7':
            return '0111';
            break;

        case '8':
            return '1000';
            break;

        case '9':
            return '1001';
            break;

        case 'A':
            return '1010';
            break;

        case 'B':
            return '1011';
            break;

        case 'C':
            return '1100';
            break;

        case 'D':
            return '1101';
            break;

        case 'E':
            return '1110';
            break;

        case 'F':
            return '1111';
            break;

        case 'a':
            return '1010';
            break;

        case 'b':
            return '1011';
            break;

        case 'c':
            return '1100';
            break;

        case 'd':
            return '1101';
            break;

        case 'e':
            return '1110';
            break;

        case 'f':
            return '1111';
            break;
    }
}

function toBin(hexa){           // conversor da palavra de 3 hexa para bin
    var numHexa = hexa.split('');
    if(numHexa.length === 1){
        numHexa.unshift('0', '0');
    }
    else if(numHexa.length === 2){
        numHexa.unshift('0');
    }

    return bin4bit(numHexa[0]) + bin4bit(numHexa[1]) + bin4bit(numHexa[2]);
}

function toBin2(hexa){           // conversor da palavra de 2 hexa para bin
    var numHexa = hexa.split('');

    if(numHexa.length === 1){
        numHexa.unshift('0');
    }

    return bin4bit(numHexa[0]) + bin4bit(numHexa[1]);
}

class Assembler {
    constructor(){}

    assembleFromRawInput(input){
        // utilizado como separador de termos 
        var regex = /^[\t ]*(?:([.A-Za-z]\w*)[:])?(?:[\t ]*([A-Za-z]{2,6})(?:[\t ]+(\[(\w+((\+|-)\d+)?)\]|\".+?\"|\'.+?\'|[.A-Za-z0-9]\w*)(?:[\t ]*[,][\t ]*(\[(\w+((\+|-)\d+)?)\]|\".+?\"|\'.+?\'|[.A-Za-z0-9]\w*))?)?)?/;

        var lines = input.split('\n');  // separa o codigo fonte em linhas 
        var code = '0000';
        var endereco = [];
        var tabelaDeSimbolos = {};

        // remocao de linhas vazias
        for(var i = 0; i < lines.length; i++){   
            if(regex.exec(lines[i])[2] == undefined){
                lines.splice(i, 1);
            }
        }
    
        for(var i = 0; i < lines.length; i++){   // primeiro passo do montador, geracao de tabelas de simbolos
            try{
                var termo = regex.exec(lines[i]);

                if(i === 0 && termo[2] === 'ORG'){
                    endereco[i] = parseInt(termo[3], 16); //endereco inicialmente em decimal
                }

                
                else if(termo[2] === 'JUMP' || termo[2] === 'JUMP0' || termo[2] === 'JUMPN' || termo[2] === 'ADD' || termo[2] === 'SUB' || termo[2] === 'MUL' || termo[2] === 'DIV' || termo[2] === 'LOAD' || termo[2] === 'STORE' || termo[2] === 'CALL'){
                    endereco[i] = endereco[i-1] + 2;
                }

                else if(termo[2] === 'RTN' || termo[2] === 'STOP' || termo[2] === 'READ' || termo[2] === 'WRITE' || termo[2] === 'DATA'){
                    endereco[i] = endereco[i-1] + 1;
                }

                else if(termo[2] === 'AREA'){
                    endereco[i] = endereco[i-1] + parseInt(termo[3], 16);
                }

                else if(termo[2] === 'END'){
                    // throw "Fim da fita";
                    break;
                }

                else{
                    throw "erro de minemonicos ou outros"
                }

                if(termo[1] != undefined){
                    tabelaDeSimbolos[termo[1]] = endereco[i-1];
                }

            }
            catch(e){
                console.log(e, "line:", i);
            }
        }

        for(var k = 0; k < lines.length; k++){
            var termo2 = regex.exec(lines[k]);

            if(k===0 && termo2[2] != 'ORG'){
                code = code + '000000000000'
            }
            else if(k === 0 && termo2[2] === 'ORG'){
                code = code + toBin(termo2[3]);
            }

            switch(termo2[2]){
                case 'JUMP':
                    code = code + '0000' + toBin(tabelaDeSimbolos[termo2[3]].toString(16));
                    break;

                case 'JUMP0':
                    code = code + '0001' + toBin(tabelaDeSimbolos[termo2[3]].toString(16));
                    break;

                case 'JUMPN':
                    code = code + '0010' + toBin(tabelaDeSimbolos[termo2[3]].toString(16));
                    break;

                case 'ADD':
                    code = code + '0011' + toBin(tabelaDeSimbolos[termo2[3]].toString(16));
                    break;
                
                case 'SUB':
                    code = code + '0100' + toBin(tabelaDeSimbolos[termo2[3]].toString(16));
                    break;

                case 'MUL':
                    code = code + '0101' + toBin(tabelaDeSimbolos[termo2[3]].toString(16));
                    break;

                case 'DIV':
                    code = code + '0110' + toBin(tabelaDeSimbolos[termo2[3]].toString(16));
                    break;

                case 'LOAD':
                    code = code + '0111' + toBin(tabelaDeSimbolos[termo2[3]].toString(16));
                    break;
                
                case 'STORE':
                    code = code + '1000' + toBin(tabelaDeSimbolos[termo2[3]].toString(16));
                    break;

                case 'CALL':
                    code = code + '1001' + toBin(tabelaDeSimbolos[termo2[3]].toString(16));
                    break;

                case 'RTN':
                    code = code + '11000000';
                    break;

                case 'STOP':
                    code = code + '11010000';
                    break;

                case 'DATA':
                    code = code + toBin2(termo2[3]);
                    break;
            }
        }
        return code;
    }
}

module.exports = {
    Assembler: Assembler
}