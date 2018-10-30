import { Router, Request, Response } from 'express';


class Index {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get('/', (req: Request, res: Response) => {
            res.status(200).send({
                title: "Node Express API + Typescript",
                version: "0.0.1"
            });  
        });
    }

}
export default new Index().router;