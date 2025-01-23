import { publisher } from "../models/index.js";
import NotFound from "../utils/errors/notFound.js";

function searchFilter(query) {
  const { name } = query;
  const params = {};

  if (name) params.name = { $regex: name, $options: "i" };

  return params;
}

class PublisherController {
  static async getAll (req, res, next) {
    const params = searchFilter(req.query);

    try {
      req.list = publisher.find(params);
      next();
    } catch (err) { next(err); }
  }

  static async getById (req, res, next) {
    const { id } = req.params;

    try {
      const item = await publisher.findById(id);

      if (item) {
        res.status(200).json(item);
      } else {
        next(new NotFound("Id da Editora não encontrado"));
      }
    } catch (err) { next(err); }
  }

  static async create (req, res, next) {
    try {
      const newItem = await publisher.create(req.body);
      res.status(201).json({ 
        message: "Editora criada com sucesso!", 
        publisher: newItem
      });
    } catch (err) { next(err); }
  }

  static async update (req, res, next) {
    const { id } = req.params;

    try {
      const item = await publisher.findByIdAndUpdate(id, req.body);

      if (item) {
        res.status(201).json({ message: "Editora atualizada com sucesso!" });
      } else {
        next(new NotFound("Id da Editora não encontrado"));
      }
    } catch (err) { next(err); }
  }

  static async delete (req, res, next) {
    const { id } = req.params;

    try {
      const item = await publisher.findByIdAndDelete(id);

      if (item) {
        res.status(201).json({ message: "Editora excluída com sucesso!" });
      } else {
        next(new NotFound("Id da Editora não encontrado"));
      }
    } catch (err) { next(err); }
  }
}

export default PublisherController;