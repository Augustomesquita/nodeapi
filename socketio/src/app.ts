import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as socketIo from 'socket.io';

//BD
import mongoose = require("mongoose");
import { createServer, Server } from "http";


export class App {

    private app: express.Application;
    private websocketServer: Server;
    private io: socketIo.Server;
    private static readonly PORT_WS: String = "4000";

    // CORS Settings.
    private corsOptions = {
        origin: 'http://localhost:4200',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
    };


    constructor() {
        // inicializa banco de dados.
        this.startMongoose();

        // configura e inicializa socket io.
        this.setupAppForSocketIO();
        this.startSocketIO();
    }

    /**
     * Inicializa mongoose (conexão com o banco) e deixa
     * preparado instância do mesmo para ser usado por toda
     * a aplicação.
     */
    private startMongoose() {
        const MONGODB_CONNECTION: string = "mongodb+srv://mongodb:mongodb@nodeapi-y3gu0.mongodb.net/";
        mongoose.Promise = global.Promise;
        mongoose.connect(MONGODB_CONNECTION, { dbName: "nodeapidb", useNewUrlParser: true });
    }

    /**
     * Configura a aplicação para futura criação do servidor Socket IO
     * baseado no mesmo.
     */
    private setupAppForSocketIO(): void {
        // clear app
        this.app = null;

        // instancia app
        this.app = express();

        // enable cors on application
        this.app.use(cors(this.corsOptions))

        // support application/json type post data
        this.app.use(bodyParser.json());

        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    /**
     * Incializa servidor Socket IO e suas rotas sockets.
     */
    private startSocketIO() {
        this.websocketServer = createServer(this.app);
        this.io = socketIo(this.websocketServer);

        this.websocketServer.listen(App.PORT_WS, () => {
            console.log(`Servidor websocket rodando na porta ${App.PORT_WS}`);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Cliente conectado na porta %s.', App.PORT_WS);

            socket.on('disconnect', () => {
                console.log('Cliente desconectado.');
            });

            socket.on('message', (message) => {
                console.log("Message Received: " + message);
                socket.broadcast.emit('message', JSON.parse(message));
            })
        });
    }

    public getApp(): express.Application {
        return this.app;
    }

}