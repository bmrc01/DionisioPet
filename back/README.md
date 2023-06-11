# API dos Pets

API que realiza um CRUD de pets no banco de dados MongoDB e faz envio de e-mail com dados já setados.

## Veja a documentação da API:

A API está hospedada no fly.io, pelo swagger é possível testá-la com os endpoints.
https://api-pets.fly.dev/doc/

## Configuração do Ambiente:

Antes de executar a API, certifique-se de ter as seguintes dependências instaladas:

- Node.js

## Executando a API:

Siga as etapas abaixo para executar:

1. Clone este repositório.
2. Execute o comando `yarn` ou `npm install` para instalar as dependências.
3. Crie um arquivo chamado `.env` com as variáveis `MONGODB_CONNECTION`, `PASSWORD_APP` e `EMAIL_APP`, e nelas serão inseridas as strings da conexão com o banco, seu e-mail do Gmail e sua senha de app.
4. Execute o comando `npx tsc` para transpilar o código de Typescript para Javascript.
5. E por fim, execute o comando `npm start` para iniciar o backend.
