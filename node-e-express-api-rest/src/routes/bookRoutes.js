import express from "express";
import BookController from "../controllers/bookController.js";
import handlePaginate from "../middlewares/handlePagination.js";

const routes = express.Router();

routes.get("/livros", BookController.getAll, handlePaginate);
routes.get("/livros/:id", BookController.getById);
routes.post("/livros", BookController.create);
routes.put("/livros/:id", BookController.update);
routes.delete("/livros/:id", BookController.delete);

export default routes;