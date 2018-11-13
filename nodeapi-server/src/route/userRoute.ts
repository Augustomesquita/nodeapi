import { Router, Request, Response } from 'express';
import { UserController } from '../controller/userController';


class UserRoute {

    // Assign router to the express.Router() instance
    public router: Router = Router();
    public userController: UserController = new UserController();

    constructor() {
        this.config();
    }

    private config(): void {

        /**
         * 
         * @api {get} /api/v1/users Busca todos os usuários do banco.
         * @@apiName nodeapi
         * @apiGroup users
         * @apiVersion  0.0.1
         * @@apiPermission all
         * @apiSampleRequest /api/v1/users
         * 
         * @apiSuccessExample {json} Success-Response: 
         * {
         *  {
         *      "_id": "5be45d613535f66ec3729815",
         *      "email": "augustomesquitasrs@gmail.com",
         *      "firstName": "Augusto",
         *      "lastName": "Mesquita",
         *      "createdAt": "2018-11-08T15:59:29.021Z",
         *      "__v": 0
         *  },
         *  *  {
         *      "_id": "5be45d613535f66ec3729816",
         *      "email": "josedias@gmail.com",
         *      "firstName": "José",
         *      "lastName": "Dias",
         *      "createdAt": "2018-11-08T15:69:29.021Z",
         *      "__v": 0
         *  }
         * }
         * 
         */
        this.router.get('/', this.userController.getAll);

        /**
         * 
         * @api {post} /api/v1/users Cria um usuário
         * @apiName nodeapi
         * @apiGroup users
         * @apiVersion  0.0.1
         * @@apiPermission all
         * @apiSampleRequest /api/v1/users/
         * 
         * 
         * @apiParam  {string} email Email do usuário
         * @apiParam  {string} firstName Primeiro nome do usuário
         * @apiParam  {string} lastName Último nome do usuário
         * 
         * @apiParamExample  {json} Request-Example: 
         * {
         *      "email": "augustomesquitasrs@gmail.com",
         *      "firstName": "Augusto",
         *      "lastName": "Mesquita",
         * }
         * 
         * @apiSuccessExample {json} Success-Response: 
         * {
         *      "_id": "5be45d613535f66ec3729815",
         *      "email": "augustomesquitasrs@gmail.com",
         *      "firstName": "Augusto",
         *      "lastName": "Mesquita",
         *      "createdAt": "2018-11-08T15:59:29.021Z",
         *      "__v": 0
         * }
         * 
         * 
         */
        this.router.post('/', this.userController.create);

        /**
         * 
         * @api {delete} /api/v1/users/:id Deleta um usuário pelo id.
         * @apiName nodeapi
         * @apiGroup users
         * @apiVersion  0.0.1
         * @@apiPermission all
         * @apiSampleRequest /api/v1/users/:id
         * 
         * @apiParam  {string} id Id do usuário
         * 
         * @apiParamExample  {json} Request-Example: 
         * {
         *      "id" : "5be45d613535f66ec3729815"
         * }
         * 
         * @apiSuccessExample {json} Success-Response: 
         * {
         *      "message" : "Successfully deleted user!"
         * }
         * 
         * 
         */
        this.router.delete('/:id', this.userController.deleteById);


        /**
         * 
         * @api {get} /api/v1/users/:id Busca um usuário pelo id.
         * @@apiName nodeapi
         * @apiGroup users
         * @apiVersion  0.0.1
         * @@apiPermission all
         * @apiSampleRequest /api/v1/users/:id
         * 
         * @apiParam  {string} id Id do usuário
         * 
         * @apiParamExample  {json} Request-Example: 
         * {
         *      "id" : "5be45d613535f66ec3729815"
         * }
         * 
         * @apiSuccessExample {json} Success-Response: 
         * {
         *      "_id": "5be45d613535f66ec3729815",
         *      "email": "augustomesquitasrs@gmail.com",
         *      "firstName": "Augusto",
         *      "lastName": "Mesquita",
         *      "createdAt": "2018-11-08T15:59:29.021Z",
         *      "__v": 0
         * }
         * 
         */
        this.router.get('/:id', this.userController.getById);
    }
}

// Export the express.Router() instance to be used by server.ts
export default new UserRoute().router;