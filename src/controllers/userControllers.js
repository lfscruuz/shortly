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

export async function showMe(req, res){
    const {userId} = req.session;

    try {
        const user = await connectionDB.query(`SELECT users.id, users.name, 
        (select sum("visitCount") as "visitCount" from urls where urls."userId"  = $1), (select json_agg(json_build_object('id', urls.id, 'userId', "userId", 'url', "url", 'visitCount', "visitCount")) from urls WHERE urls."userId" = $1) as "shortenedUrls"
        FROM users where users.id = $1
    `, [userId]);

        res.send(user.rows[0])
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
    
}

export async function ranking(req, res){
    try {
        const users = await connectionDB.query('select users.id, users.name, (select count(urls.id) from urls join users on urls."userId" = users.id where urls."userId" = 2 group by urls."userId") as "linksCount", (select sum(urls."visitCount") from urls join users on urls."userId" = users.id where urls."userId" = users.id) as "visitCount" from users order by "visitCount" desc');
        res.send(users.rows);
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

    
}