import { Router, Request, Response } from 'express';


class PersonController {

    // Assign router to the express.Router() instance
    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get('/', (req: Request, res: Response) => {
            res.send('Hello, World!');
        });

        this.router.get('/:id', (req: Request, res: Response) => {
            let { id }  = req.params;
            res.send(`Hello, ${id}`);
        });
    }
}

// Export the express.Router() instance to be used by server.ts
export default new PersonController().router;