import { connectionDB } from "../database/db.js";

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    let session;
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
        return res.sendStatus(401);
    }
    try {
        session = await connectionDB.query('SELECT sessions.*, users.id AS "userId" FROM sessions JOIN users ON users.id = sessions."userId" WHERE sessions.token = $1', [token])
        if (!session){
            return res.status(401).send("token não encontrado na base de dados")
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }

    req.session = session.rows[0]
    next();
}