import { connectionDB } from "../database/db.js";
import { v4 as uuidV4 } from "uuid";

export async function signup(req, res){
    const { name, email } = req.body;
    const hashPassword = req.password;

    try {
        await connectionDB.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, hashPassword])
        res.sendStatus(201)
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

export async function signin(req, res){
    const {email, password} = req.body;
    const token = uuidV4();
    const { id } = req.user
    try {
        await connectionDB.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [id, token]);
        res.status(200).send(token);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}