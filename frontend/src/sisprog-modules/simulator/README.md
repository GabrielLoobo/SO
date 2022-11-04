# Simulador de execução

Este simulador tem como intuito emular um processador simples com uma arquitetura suficiente para trabalhar todos os conceitos desenvolvido ao longo da disciplina de sistemas de programação. 

# Especificação

## Hardware

- Memória de 4086 Bytes
<!-- TODO: Confirmar nome do registrador -->
- 1 registrador de endereços (program counter/PC) de 12 bits 
- 1 registrador de dados (RD) 8 bits

## Software

### Instruções

- Desvio Incondicional (JUMP): `0000<Endereço(12)>`, 2 Palavras
- Desvio se zero (JUMP0): `0001<Endereço(12)>`, 2 Palavras
- Desvio se negativo (JUMPN): `0010<Endereço(12)>`, 2 Palavras
- Soma (ADD): `0011XXXX<Arg(8)>`, 2 Palavras, Soma Arg(8 bits) com valor de RD e bota em RD
- Subtração (SUB): `0100XXXX<Arg(8)>`, 2 Palavras, Subtrai Arg(8 bits) do valor de RD e bota em RD
- Multiplicação (MUL): `0101XXXX<Arg(8)>`, 2 Palavras, Multiplica Arg(8 bits) com valor de RD e bota em RD
- Divisão (DIV): `0110XXXX<Arg(8)>`, 2 Palavras, Divide por Arg(8 bits) o valor de RD e bota em RD
- Carrega RD (LOAD): `0111XXXX<Arg(8)>`, 2 Palavras, Carrega Arg(8 bits) em RD
- Guardar na memória (STORE): `0111XXXX<Arg(8)>`, 2 Palavras, Guarda valor de RD na memória