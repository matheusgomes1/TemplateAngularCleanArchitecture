# Aplicação Template com Angular Material

Este projeto consiste em uma aplicação de exemplo, utilizando bons padrões de desenvolvimento e o que existe de mais novo com relação ao Angular 18. Algumas características são:

* Standalone Components (The Angular team recommends using standalone components for all new development.)
* Signals
* Reactive Forms
* Angular Material


## Fake Backend com json-server

Como o propósito do projeto é apenas um template, utiliza-se o json-server para simular o backend para que possamos utilizar as chamadas http.

### Configurando o serviço json-server

```shell
# Instale globalmente o json-server
npm install -g json-server
```

Na raíz do projeto existe o arquivo db.json que contém o "banco de dados", para subir o servidor basta executar:

```shell
npx json-server db.json
```
