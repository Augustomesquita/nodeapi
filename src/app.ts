import * as express from "express";
import * as bodyParser from "body-parser";

import main from "./controller/main";
import personController from "./controller/personController";


class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());

        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use('/', main);
        this.app.use('/person', personController);
    }

}

export default new App().app;