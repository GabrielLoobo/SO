# Projeto - Sistemas de Programação

# Ferramentas/versões utilizadas
Para evitar problemas de compatibilidade por conta de ambiente, as ferramentas que precisam ser instaladas são:

- Node v16.15.0
- npm 8.11.0

# Setup

### Frontend

- `cd frontend`
- `npm install` para instalar todas as dependências no `node_modules 

# Estrutura

Como o projeto deve ser desenvolvido de forma que cada modulo seja auto-suficiente, devemos criá-los de forma isolada. Dessa forma, para que não ocorra problemas de escopo com a aplicação do react, os módulos implementados para o projeto de sisprog devem ficar dentro de `frontend/src/sisprog-modules`, sendo que cada um deles deve estar dentro de um diretório diferente