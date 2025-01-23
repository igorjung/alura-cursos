import express from "express";

import books from "./bookRoutes.js";
import authors from "./authorRoutes.js";
import publishers from "./publisherRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => 
    res.status(200).send("Hello World!")
  );
  app.use(express.json(), books, authors, publishers);
};

export default routes;