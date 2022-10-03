# Atividades-api
Api para submissão de atividades.

## Atenção 
*Peço desculpas porque não consegui fazer o container se comunicar com o rabbitmq. Se o professor quiser rodar a aplicação com a mensageria funcionando, precisará rodar localmente*

## Requisitos
- NodeJS (caso queira rodar localmente)
- Yarn (caso queira rodar localmente)
- Docker


## Instalação
A aplicação necessita do docker instalado para funcionar corretamente.
Para baixar o container, basta entrar na pasta raiz do projeto e executar o comando abaixo:
```./script.sh```

O script irá baixar as imagens necessárias e executar o container da aplicação e do rabbitmq.
O rabbitmq está com usuário e senha padrão, sendo usuário: `guest` e senha: `guest`.

## Execução local(caso não queira utilizar o docker)
Para rodar a aplicação localmente, basta entrar na pasta raiz do projeto e executar o comando abaixo:
```yarn```

Após a instalação das dependências, basta executar o comando abaixo:
```yarn dev```

Caso não tenha o yarn instalado na máquina e queira usar o npm, basta apagar o arquivo `yarn.lock` e executar os comandos abaixo:
```npm install```
```npm run dev```

A aplicação será executada em ```http://localhost:3000```

## Testes
Para executar os testes, basta entrar na pasta raiz do projeto e executar o comando abaixo:
```yarn test```

## Documentação
A documentação da api está disponível no link: [swagger](http://localhost:3000/api-docs/)
**Obs: É necessário que a aplicação esteja rodando.**

## Tecnologias utilizadas
- Nodejs
- Typescript
- Express
- Docker
- Rabbitmq
- Swagger
- Jest