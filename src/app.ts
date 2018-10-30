import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import main from "./controller/main";
import personController from "./controller/personController";

class App {

    public app: express.Application;

    // CORS Settings
    private corsOptions = {
        origin: 'http://localhost:4200',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
    };


    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        // enable cors on application
        this.app.use(cors(this.corsOptions))

        // support application/json type post data
        this.app.use(bodyParser.json());

        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use('/', main);
        this.app.use('/person', personController);
    }

}

export default new App().app;