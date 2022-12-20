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

