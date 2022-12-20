import bcrypt from "bcrypt";
import { connectionDB } from "../database/db.js";
import { signupSchema } from "../schemas/userSchemas.js";

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
        res.status(500)
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
