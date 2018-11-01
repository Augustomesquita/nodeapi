import { Router, Request, Response } from 'express';


class UserController {

    // Assign router to the express.Router() instance
    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {

        this.router.get('/', (req: Request, res: Response) => {
            res.send('Hello, World!');
        });


        /**
         * 
         * @api {get} /api/v1/user/:id getById
         * @@apiName nodeapi
         * @apiGroup user
         * @apiVersion  0.0.1
         * @@apiPermission all
         * 
         * @apiParam  {string} id Id do usuário
         * 
         * @apiParamExample  {type} Request-Example: 
         * {
         *      id = 10
         * }
         * 
         * @apiSuccessExample {type} Success-Response: 
         * {
         *      "Hello, 10"
         * }
         * 
         */
        this.router.get('/:id', (req: Request, res: Response) => {
            let { id }  = req.params;
            res.send(`Hello, ${id}`);
        });
    }
}

// Export the express.Router() instance to be used by server.ts
export default new UserController().router;