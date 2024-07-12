# Golden Raspberry Awards API

API RESTful para possibilitar a leitura da lista de indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards.

O conjuto de dados utilizado é baseado no arquivo [movielist.csv](movielist.csv). Quando a API é iniciada, os dados deste arquivo são automaticamente importados e populados no banco de dados.

> Para obter o produtor com maior intervalo entre dois prêmios consecutivos, e o que
> obteve dois prêmios mais rápido. Utilize o endpoint: `GET http://localhost:3000/indications/awards-intervals`

Além disso, foram adicionados recursos de CRUD para os seguintes entidades:

- Produtores _/producers_
- Studios _/studios_
- Filmes _/movies_
- Indicações _/indications_

## Pré-requisitos

- Nodejs v20
- Yarn

## Instalação

```bash
$ yarn install
```

## Executando a aplicação

```bash
$ yarn start
```

## Testes

```bash
$ yarn test
```
