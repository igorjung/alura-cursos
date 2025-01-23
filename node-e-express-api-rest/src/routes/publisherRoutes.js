import express from "express";
import PublisherController from "../controllers/publisherController.js";
import handlePaginate from "../middlewares/handlePagination.js";

const routes = express.Router();

routes.get("/editoras", PublisherController.getAll, handlePaginate);
routes.get("/editoras/:id", PublisherController.getById);
routes.post("/editoras", PublisherController.create);
routes.put("/editoras/:id", PublisherController.update);
routes.delete("/editoras/:id", PublisherController.delete);

export default routes;