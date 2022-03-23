# Digital Account

A <😁> é uma startup brasileira dedicada a promover o acesso a crédito à população das classes C, D e E, de maneira simples, justa, rápida e sem taxas ocultas.
Como próximo passo de expansão dos produtos de nossa empresa, queremos lançar uma conta digital.

## 🔨 Funcionalidades do projeto

O projeto provê três rotas:

- Criação de contas digitais.
```bash
  POST /api/account
```
- Transferencia entre contas (efetua uma transação atômica)
```bash
  POST /api/transfer
```
- Listagem de transações por conta
```bash
  GET /api/transfer/:accountId
```

## ✔️ Técnicas e tecnologias utilizadas

Todo o projeto foi feito com **Typescript**.
A API Rest foi criada usando o **Express**.
A persistência dos dados, assim como a funcionalidade de transações atômicas foi feito com o **mongoose**.
Os testes unitários foram produzidos usando o **Jest**.

Para executar a funcionalidade de transações do MongoDB é necessário utilizar um banco de dados Mongo com replica set. Para desenvolvimento local foi adicionado um script no projeto para subir um simulador de MongoDB utilizando replica set.

## 👍 Decisões técnicas tomadas

- Utilizei o eslint e o prettier para padronização do código.
- Utilizei transações do Mongo para a operação de transferência de valor entre contas, para tornar essa operação atômica, ou seja, se um dos passos do processo falhar, toda a operação falha.
- Para evitar transferências duplicadas, adicionei um cache em memória. Dessa forma, quando uma transferência é realizada, guardo ela em um Map junto com um setTimout que a removerá após 2 minutos. Caso uma nova requisição chegue com os mesmos dados da transferência salva em cache, a requisição retorna com erro.
  - Para evitar usar cache em memória e reiniciar os dados sempre que há um deploy, pode ser utilizado um cliente Redis para manter esse cache. Fica para uma versão 2 desse projeto.
- Para a rota de listagem de transações, é necessário o id da conta para acessar os dados. Fiz isso principalmente porque é uma quebra de segurança utilizar o documento diretamente na url.
- Usei paginação na rota de listagens de transações, com valores default para limite e página atual.

## 🛠️ Execução do projeto

Para executar o projeto é necessário ter instalado o NodeJs v16.14 ou superior.

### Instalando as dependencias

```bash
  npm install
```

### Copie a variável de ambiente exemplo

Dentro do projeto há um arquivo chamado **.env.example**. Faça uma copia desse arquivo e o renomeei para **.env**. Dentro dele adicione valores válidos para SERVER_PORT e MONGO_URI. Caso você não tenha uma url para o MongoDb com replica set, execute o próximo passo.

### Script de inicialização do Banco de dados com Replica Set

Execute o script:

```bash
  npm run initDatabase
```

o script irá gerar um banco de dados MongoDb com replica set utilizando a lib run-rs. Esse script pode demorar alguns minutos para ser executado. Ao final do processo será disponibilizado uma url de acesso ao Mongo criado. Adicione essa url no .env no MONGO_URI.

Obs. Durante a execução da aplicação esse script deve estar ativo, pois caso sua execução seja finalizada, o banco de dados não estará mais disponível.

### Execute a aplicação

```bash
  npm run dev
```

### Executar testes

```bash
  npm test
```
