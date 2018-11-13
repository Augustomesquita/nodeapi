import { UserSchema } from './../schema/user';
import * as mongoose from 'mongoose';
import { Request, Response } from 'express';

const User = mongoose.model('User', UserSchema);

export class UserController {

    public getAll(req: Request, res: Response) {
        User.find({}, (err, users) => {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    }

    public getById(req: Request, res: Response) {
        let { id } = req.params;
        if (id) {
            User.findById(id, (err, user) => {
                if (err) {
                    res.send(err);
                }
                res.json(user);
            })
        }
    }

    public deleteById(req: Request, res: Response) {
        let { id } = req.params;
        if (id) {
            User.findByIdAndDelete(id, (err, user) => {
                if (err) {
                    res.send(err);
                } else {
                    if (user) {
                        res.json({ message: 'Usuário deletado com sucesso!' });
                    } else {
                        res.json({ message: 'Usuário não foi encontrado para ser deletado.' });
                    }
                }
            })
        }
    }

    public create(req: Request, res: Response) {
        let newContact = new User(req.body);

        newContact.save((err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

}