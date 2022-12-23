import { json } from "express";
import { nanoid } from "nanoid";
import { connectionDB } from "../database/db.js";

export async function postShorten(req, res) {
    const { url } = req.body;
    const { userId } = req.session

    try {
        const shortUrl = nanoid();
        await connectionDB.query('INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)', [userId, url, shortUrl]);
        res.status(200).send(shortUrl);
    } catch (error) {
        console.log(error);
        res.status(500)
    }
}

export async function getUrlById(req, res, next) {
    const { id, shortUrl, url } = req.url;

    try {
        res.status(200).json({ id, shortUrl, url })
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}

export async function openUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const selection = await connectionDB.query('SELECT * FROM urls WHERE "shortUrl" = $1', [shortUrl]);

        if (!selection.rows[0]) {
            return res.sendStatus(404)
        }

        const url = selection.rows[0].url
        const visitCount = selection.rows[0].visitCount + 1;
        await connectionDB.query('UPDATE urls SET "visitCount" = $1 WHERE "shortUrl" = $2', [visitCount, shortUrl]);
        res.redirect(url);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function removeUrl(req, res) {
    const url = req.url;
    const { id } = req.params;
    const { userId } = req.session;

    try {
        if (userId !== url.userId) {
            return res.sendStatus(401);
        }
        await connectionDB.query('DELETE FROM urls WHERE urls."id" = $1', [id]);
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

