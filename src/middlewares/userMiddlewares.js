import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { connectionDB } from "../database/db.js";
import { signinSchema, signupSchema } from "../schemas/userSchemas.js";

export async function signupValidation(req, res, next){
    const { name, email, password, confirmPassword } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10)
    const newUser = {
        name,
        email,
        password,
        confirmPassword
    };
    
    try {
    
        const { error } = signupSchema.validate(newUser, { abortEarly: false });
    
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }

    try {

        const existingUser = await connectionDB.query("SELECT * FROM users WHERE users.email = $1", [email]);

        if (existingUser.rows[0] !== undefined){
            return res.status(409).send("usuário já cadastrado")
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }

    req.password = hashPassword;
    next();
}

export async function signinValidation(req, res, next){
    const {email, password} = req.body;
    let existingUser;
    const userData = {
        email,
        password
    }

    try {
        const { error } = signinSchema.validate(userData, {abortEarly: false})
        if (error){
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send(errors)
        }
    } catch (error) {
        console.log(error);
        return res.status(500);
    }

    try {
        existingUser = await connectionDB.query("SELECT * FROM users WHERE users.email = $1", [email]);
        if (existingUser.rows[0] === undefined){
            return res.status(409).send("usuário não cadastrado");
        }

        const comparePasswords = bcrypt.compareSync(password, existingUser.rows[0].password);
        if (!comparePasswords){
            return res.sendStatus(401);
        }
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

    req.user = existingUser.rows[0];
    next();
}