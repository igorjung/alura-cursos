import express from "express";
import AuthorController from "../controllers/authorController.js";
import handlePaginate from "../middlewares/handlePagination.js";

const routes = express.Router();

routes.get("/autores", AuthorController.getAll, handlePaginate);
routes.get("/autores/:id", AuthorController.getById);
routes.post("/autores", AuthorController.create);
routes.put("/autores/:id", AuthorController.update);
routes.delete("/autores/:id", AuthorController.delete);

export default routes;