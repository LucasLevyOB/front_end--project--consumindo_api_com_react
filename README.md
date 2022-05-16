# Consumindo API com React JS e Axios.

Projeto para consumir uma API de produtos, utilizando React JS e outras tecnologias.

**\*Projeto desenvolvido em Maio de 2022**

## Assista ao Vídeo:

Nesse vídeo você poderá ver a funcionalidades implantadas.

[![Alt text](https://img.youtube.com/vi/Oly30VzBizA/0.jpg)](https://www.youtube.com/watch?v=Oly30VzBizA)

## Features Implementadas:

1. Criar, listar, editar e deletar produtos
2. Paginação e pesquisa
3. Carregamento da listagem de produtos (Skeleton)
4. Carregamento de dados no formulário e execução de alteração de produtos (Circular Progress)
5. Validação do formulário
6. Mensagens de erro
7. Mensagens de feedback de ações (Snackbar)
8. Rotas de navegação

## Tecnologias utilizadas:

1. React JS
2. Material UI
3. React-Router-Dom
4. Axios
5. Prop-Types
6. React-Hook-Form
7. Yup

### React JS

1. Utilização de hooks personalizados e hooks do React
   1. [useAxios](src/hooks/useAxios.js), exemplo de hook personalizado.
   2. [useReducer](src/providers/productsProvider.js), exemplo de hook do React JS.
2. Utilização do useReducer para lidar com um estado complexo.
   1. [Reducer](src/reducers/productsReducer.js), reducer criado.
   2. [useReducer](src/providers/productsProvider.js), utilização do useReducer.
3. Utilização da Context API para prover um estado para vários componentes, de forma organizada
   1. [productsProvider](src/providers/productsProvider.js), criação do productsProvider, utilizando (useReducer, createContext).
   2. [useProducts](src/hooks/useProducts.js), utilizando o Context criado (useContext e productsContext).
   3. [index.js](src/index.js), utilizando o ProductsProvider para passar os produtos pelos componentes.
4. Renderização condicional.
5. Componentes personalizados.

### Outros

1. Utilização de componentes prontos do Material UI, ex:
   1. [Pagination](src/components/Pagination/index.js).
2. Criação de Rotas com React Router Dom, navegação e utlização de parâmetros pela url, ex:
   1. [Routes](src/routes.js)
   2. [Edit](src/pages/Edit/index.js)
3. Consumir API pelo Axios, ex:
   1. [useAxios](src/hooks/useAxios.js)
4. Utilização do Prop-Types para checagem de tipos em componentes, ex:
   1. [Card](src/components/card/index.js)
5. Utilização do React Hook Form para validar o formulário do produto, ex:
   1. [formProduct](src/components/FormProduct/index.js)
6. Utilização do Yup para criar o schema utilizado na validação do formulário, ex:
   1. [Schema](src/components/FormProduct/schema.js)
7. Telas de loading e feedback para o usuário, ex:
   1. Skeleton, [Home](src/pages/Home/index.js);
   2. Circular progress, [FormProduct](src/components/FormProduct/index.js);
   3. Snackbar, [Edit](src/pages/Edit/index.js);

## Como Executar o Projeto

### Backend

##### Pré-requisitos

- [JSON Server](https://www.npmjs.com/package/json-server) instalado.

##### Como Rodar o Backend

Com o JSON Server instalado, abra o terminal na pasta do projeto e rode o seguinte comando:

```bash
  json-server --watch db.json --port 3001
```

##### Restaurar o Banco de Dados

Para restaurar os dados, basta copiar o conteúdo do arquivo [backup.txt](backup.txt) e usá-lo para substituir o conteúdo do arquivo [db.json](db.json)

### Fron-end

1. Após clonar o projeto para seu computador, execute o comando para instalar as dependências:

```bash
  npm install
  #or
  yarn install
```

2. Para executar o front-end, rode o comando:

```bash
 npm start
 #or
 yarn start
```
