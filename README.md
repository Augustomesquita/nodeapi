# Fullstack Javascript
O Fullstack Javascript é um pequeno projeto que utiliza javascript em todas as aplicações (back-end e front-end). 

O projeto é dividida em 3 aplicações: 
1) Rest API (usando NodeJS)
2) Socket IO (usando NodeJS)
3) Angular 6 (com o servidor de sua preferência, porém, só foi testado com NodeJS).


## Rest API
Node (Express + TypeScript) + MongoDB (Atlas) + ApiDoc.

### Comandos
**npm run dev**  -> Roda em modo desenvolvedor com arquivos formato Typscript, sem gerar pasta 'dist'.\
**npm run prod** -> Gera pasta 'dist' e executa a API a partir dos arquivos JS gerados.

### Acessando documentação da API
Para ver a documentação será preciso rodar o projeto ao menos uma vez no modo produção "npm run prod" para que os arquivos sejam gerados. Após isso basta acessar: "http://localhost:3000/apidoc/".
** Importante: Por algum motivo no Windows esse doc não está sendo gerado devido a um erro (provavelmente pelo fato dos comandos estarem em linux). Em breve farei uma melhoria nisso, mas por hora, a documentação só pode ser gerada em linux.

### Sobre
É uma aplicação Rest API que disponibiliza rotas para realização de um CRUD básico de uma entidade usuário (http://localhost:3000/api/v1/users).


## Socket IO
Node (Express + TypeScript) + MongoDB (Atlas) + Socket IO Server.

### Comandos
**npm run dev**  -> Roda em modo desenvolvedor com arquivos formato Typscript, sem gerar pasta 'dist'.\
**npm run prod** -> Gera pasta 'dist' e executa a API a partir dos arquivos JS gerados.

### Sobre
É uma aplicação Socket IO que estabelece uma conexão full-duplex entre cliente e servidor, permitindo que haja troca de dados entre o mesmo em tempo real (protocolo muito parecido com o websocket). Recebe conexão em http://localhost:4000.


## Angular 6
Angular 6  + Socket IO Client.

### Sobre
Aplicação angular web básica que estabelece uma conexão do cliente com um servidor socket io e apresenta seu status. Também é capaz de realizar leitura de dados da API caso a mesma esteja de pé. Basicamente é uma camada simples de front-end para realizar testes básicos da API e do Socket IO.
