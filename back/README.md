# DionisioPet - Backend

Este é o diretório do backend do aplicativo DionisioPet, desenvolvido em Node.js, Express e MongoDB.

## Configuração do Ambiente

Antes de executar o backend, certifique-se de ter as seguintes dependências instaladas:

- Node.js

## Executando o Backend

Siga as etapas abaixo para executar o backend:

1. Clone este repositório.
2. Navegue até o diretório `back`.
3. Execute o comando `yarn` ou `npm install` para instalar as dependências.
4. Crie um arquivo chamado `.env` com as variáveis `MONGODB_CONNECTION`, `PASSWORD_APP` e `EMAIL_APP`, e nelas serão inseridas as strings da conexão com o banco, seu e-mail do Gmail e sua senha de app.
5. Execute o comando `npx tsc` para transpilar o código de Typescript para Javascript.
6. E por fim, execute o comando `npm start` para iniciar o backend.