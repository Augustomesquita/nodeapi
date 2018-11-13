# Server-side
Node API Server (Express + TypeScript) + Socket IO Server.

## Comandos
**npm run dev**  -> Roda em modo desenvolvedor com arquivos formato Typscript, sem gerar pasta 'dist'.\
**npm run prod** -> Gera pasta 'dist' e executa a API a partir dos arquivos JS gerados.

## Acessando documentação da API
Para ver a documentação será preciso rodar o projeto ao menos uma vez no modo produção "npm run prod" para que os arquivos sejam gerados. Após isso basta acessar: "http://localhost:3000/apidoc/".
** Importante: Por algum motivo no Windows esse doc não está sendo gerado devido a um erro (provavelmente pelo fato dos comandos estarem em linux). Em breve farei uma melhoria nisso, mas por hora, a documentação só pode ser gerada em linux.

## Sobre
A aplicação nodeapi server cria e disponibiliza dois servidores internamente (API Rest na porta 3000 e SocketIO na porta 4000), além disso, roda uma rotina de alarme que é disparada todos os dias às 00:00.


# Client-side
Angular 6  + Socket IO Client

## Sobre
Aplicação angular web básica que apenas estabelece uma conexão do cliente com um servidor socket io e apresenta seu status.
