import { nanoid } from "nanoid";
import { connectionDB } from "../database/db.js";

export async function postShorten(req, res){
    const {url} = req.body;
    const {userId} = req.session

    try {
        const shortUrl = nanoid();
        await connectionDB.query('INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)', [userId, url, shortUrl]);
        res.status(200).send(shortUrl);
    } catch (error) {
        console.log(error);
        res.status(500)
    }
}

export async function getUrlById(req, res){
    const {id} = req.params;

    try {
        const url = await connectionDB.query('SELECT id, "shortUrl", url FROM urls WHERE urls.id = $1', [id])
        console.log(url.rows[0])

        if (!url.rows[0].shortUrl){
            return res.status(404)
        }
        
        res.status(200).send(url.rows[0])
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}