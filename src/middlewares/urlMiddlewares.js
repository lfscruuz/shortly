import { connectionDB } from "../database/db.js";
import { postUrlSchema } from "../schemas/urlSchemas.js";

export async function validateUrlSchema(req, res, next){

    const {error} = postUrlSchema.validate(req.body, {abortEarly: false});
    if (error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors)
    }
    next();
}

export async function checkIfUrlIdExists(req, res, next){
    const {id} = req.params;

    try {
        const url = await connectionDB.query('SELECT * FROM urls WHERE urls.id = $1', [id])

        req.url = url.rows[0]
        if (url.rows[0] === undefined){
            return res.sendStatus(404)
        }
        
    } catch (error) {
        console.log(error);
        res.status(500);
    }
    next();
}