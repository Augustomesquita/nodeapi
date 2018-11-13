import { Schema } from "mongoose";

export const UserSchema: Schema = new Schema({
    createdAt: { type: Number, default: new Date().getTime() },
    email: { type: String, required: "Entre com o e-mail." },
    firstName: { type: String, required: "Entre com o primeiro nome" },
    lastName: String
});