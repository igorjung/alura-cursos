import express from "express";

import connectDb from "./config/dbConnect.js";
import routes from "./routes/index.js";
import handleErrors from "./middlewares/handleErrors.js";
import handle404 from "./middlewares/handle404.js";

const connection = await connectDb();
connection.on("error", (err) => {
	console.error("Erro de conexão: ", err);
});
connection.once("open", () => {
	console.log("Conexão com o banco feita com sucesso!");
});

const app = express();
routes(app);

app.use(handle404);
app.use(handleErrors);

export default app;