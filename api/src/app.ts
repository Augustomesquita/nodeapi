import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

//ROUTES
import mainRoute from "./route/mainRoute";
import userRoute from "./route/userRoute";

//BD
import mongoose = require("mongoose");
import { createServer, Server } from "http";


export class App {

    private app: express.Application;
    private apiRestServer: Server;

    private static readonly PORT_API: String = "3000";

    // CORS Settings.
    private corsOptions = {
        origin: 'http://localhost:4200',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
    };


    constructor() {
        // inicializa banco de dados.
        this.startMongoose();

        // configura e inicializa api rest.
        this.setupAppForAPI();
        this.startApiRest();

        // inicializa serviçoes em background.
        this.startBackgroundServices();
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
     * Configura a aplicação para futura criação do servidor de API Rest
     * baseado no mesmo.
     */
    private setupAppForAPI(): void {
        // clear app
        this.app = null;

        // instancia app
        this.app = express();

        // enable cors on application
        this.app.use(cors(this.corsOptions))

        // url to access api documentation
        this.app.use('/apidoc', express.static('apidoc'));

        // adiciona suporte para 'post' do tipo application/json para post
        this.app.use(bodyParser.json());

        // adiciona suporte para 'post' do tipo application/x-www-form-urlencoded 
        this.app.use(bodyParser.urlencoded({ extended: false }));
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
     * Inicializa servidor API Rest e suas rotas.
     */
    private startApiRest() {
        // configura rotas da api
        this.apiRoutes();

        // inicializa servidor
        this.apiRestServer = createServer(this.app);
        this.apiRestServer.listen(App.PORT_API, function () {
            console.log(`Servidor API REST rodando na porta ${App.PORT_API}.`);
        });
    }

    /**
     * Configura rotas da API.
     */
    private apiRoutes() {
        this.app.use('/api/v1/', mainRoute);
        this.app.use('/api/v1/users', userRoute);
    }

    private startBackgroundServices() {
        setTimeout(() => this.setAlarmClock(true), 0);
    }


    private setAlarmClock(firstExecution: boolean) {

        let now = new Date();
        let timeUntilNextCall: number;

        const hourOfAlarm = 0;
        const minuteOfAlarm = 0;

        if (!firstExecution) {
            timeUntilNextCall = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hourOfAlarm, minuteOfAlarm, 0, 0).getTime() - now.getTime();
            if (timeUntilNextCall <= 0) {
                console.log("!!!DESPERTADOR ATIVADO AQUI!!!");
                let tommorrow: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hourOfAlarm, minuteOfAlarm, 0, 0);
                tommorrow.setDate(tommorrow.getDate() + 1) // Adiciona um dia.
                timeUntilNextCall = tommorrow.getTime() - now.getTime(); // Seta horário da próxima chamada da função.
            }
        } else {
            timeUntilNextCall = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hourOfAlarm, minuteOfAlarm, 0, 0).getTime() - now.getTime();
            if (timeUntilNextCall <= 0) {
                console.log("***ALARME NÃO SERÁ DISPARADO POIS JÁ PASSOU DA HORA E O SERVIDOR ACABOU DE SUBIR***");
                let tommorrow: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hourOfAlarm, minuteOfAlarm, 0, 0);
                tommorrow.setDate(tommorrow.getDate() + 1); // Adiciona um dia
                timeUntilNextCall = tommorrow.getTime() - now.getTime();
            }
        }

        setTimeout(() => this.setAlarmClock(false), timeUntilNextCall);
    }

    public getApp(): express.Application {
        return this.app;
    }

}