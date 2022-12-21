import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouters from "./routers/userRouters.js";
import urlRouters from "./routers/urlRouters.js"
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouters);
app.use(urlRouters);

const port = process.env.PORT;
app.listen(port, () => console.log(`listening on port ${port}`))