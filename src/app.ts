import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import main from "./controller/Main";
import userController from "./controller/UserController";

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

        // url to access api documentation
        this.app.use('/apidoc', express.static('apidoc'));

        // support application/json type post data
        this.app.use(bodyParser.json());

        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use('/api/v1/', main);
        this.app.use('/api/v1/user', userController);
    }

}

export default new App().app;