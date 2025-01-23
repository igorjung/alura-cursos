import { author } from "../models/index.js";
import NotFound from "../utils/errors/notFound.js";

function searchFilter(query) {
  const { name, nationality } = query;
  const params = {};

  if (name) params.name = { $regex: name, $options: "i" };
  if (nationality) params.nationality = { $regex: nationality, $options: "i" };

  return params;
}

class AuthorController {
  static async getAll (req, res, next) {
    const params = searchFilter(req.query);

    try {
      req.list = author.find(params);
      next();
    } catch (err) { next(err); }
  }

  static async getById (req, res, next) {
    const { id } = req.params;

    try {
      const item = await author.findById(id);
      if (item) res.status(200).json(item);
      else next(new NotFound("Id do Autor(a) não encontrado"));
    } catch (err) { next(err); }
  }

  static async create (req, res, next) {
    try {
      const newItem = await author.create(req.body);
      res.status(201).json({ 
        message: "Autor(a) criado com sucesso!", 
        author: newItem
      });
    } catch (err) { next(err); }
  }

  static async update (req, res, next) {
    const { id } = req.params;

    try {
      const item = await author.findByIdAndUpdate(id, req.body);

      if (item) res.status(201).json({ message: "Autor(a) atualizado(a) com sucesso!" });
      else next(new NotFound("Id do Autor(a) não encontrado"));
    } catch (err) { next(err); }
  }

  static async delete (req, res, next) {
    const { id } = req.params;

    try {
      const item = await author.findByIdAndDelete(id);

      if (item) res.status(201).json({ message: "Autor(a) excluído(a) com sucesso!" });
      else next(new NotFound("Id do Autor(a) não encontrado"));
    } catch (err) { next(err); }
  }
};

export default AuthorController;