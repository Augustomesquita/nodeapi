import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

//ROUTES
import mainRoute from "./route/mainRoute";
import userRoute from "./route/userRoute";

//BD
import mongoose = require("mongoose");


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
        // connect to mongoose
        const MONGODB_CONNECTION: string = "mongodb+srv://mongodb:mongodb@nodeapi-y3gu0.mongodb.net/";
        mongoose.Promise = global.Promise;
        mongoose.connect(MONGODB_CONNECTION, { dbName: "nodeapidb", useNewUrlParser: true });

        // enable cors on application
        this.app.use(cors(this.corsOptions))

        // url to access api documentation
        this.app.use('/apidoc', express.static('apidoc'));

        // support application/json type post data
        this.app.use(bodyParser.json());

        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // configure routes
        this.routes();
    }

    private routes() {
        this.app.use('/api/v1/', mainRoute);
        this.app.use('/api/v1/users', userRoute);
    }

}

export default new App().app;