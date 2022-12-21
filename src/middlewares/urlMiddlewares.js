import { postUrlSchema } from "../schemas/urlSchemas.js";

export async function validateUrlSchema(req, res, next){

    const {error} = postUrlSchema.validate(req.body, {abortEarly: false});
    if (error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors)
    }
    next();
}