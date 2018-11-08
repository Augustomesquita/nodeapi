import { Document } from "mongoose";
import { IUser } from "../interface/user";

export interface IUserModel extends IUser, Document {
    // custom methods for your model would be defined here
    // like spring data's way.
}