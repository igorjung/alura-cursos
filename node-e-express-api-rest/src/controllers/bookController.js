import { author, publisher, book } from "../models/index.js";
import NotFound from "../utils/errors/notFound.js";

function searchFilter(query) {
  const { 
    title,
    description,
    minPages, 
    maxPages, 
    minPrice, 
    maxPrice,
    authorName,
    publisherName
  } = query;
  const params = {};

  if (title) params.title = { $regex: title, $options: "i" };

  if (description) params.description = { $regex: description, $options: "i" };

  if (minPages || maxPages) {
    params.pages = {};

    if (minPages) params.pages.$gte = minPages;
    if (maxPages) params.pages.$lte = maxPages;
  } 

  if (minPrice || maxPrice) {
    params.price = {};

    if (minPrice) params.price.$gte = minPrice;
    if (maxPrice) params.price.$lte = maxPrice;
  } 

  if (authorName) params["author.name"] = authorName;

  if (publisherName) params["publisher.name"] = publisherName;

  return params;
}

class BookController {
  static async getAll (req, res, next) {
    const params = searchFilter(req.query);

    try {
      req.list = book.find(params);
      next();
    } catch (err) { next(err); }
  }

  static async getById (req, res, next) {
    const { id } = req.params;

    try {
      const item = await book.findById(id);

      if (item) {
        res.status(200).json(item);
      } else {
        next(new NotFound("Id do Livro não encontrado"));
      }
    } catch (err) { next(err); }
  }

  static async create (req, res, next) {
    const data = req.body;

    try {
      if (data.author) {
        const foundAuthor = await author.findById(data.author);
        data.author = { ...foundAuthor._doc };
      }

      if (data.publisher) {
        const foundPublisher = await publisher.findById(data.publisher);
        data.publisher = { ...foundPublisher._doc };
      }

      const newItem = await book.create(data);
      res.status(201).json({ 
        message: "Livro criado com sucesso!", 
        book: newItem
      });
    } catch (err) { next(err); }
  }

  static async update (req, res, next) {
    const data = req.body;
    const { id } = req.params;

    try {
      if (data.author) {
        const foundAuthor = await author.findById(data.author);
        data.author = { ...foundAuthor._doc };
      }

      if (data.publisher) {
        const foundPublisher = await publisher.findById(data.publisher);
        data.publisher = { ...foundPublisher._doc };
      }

      const item = await book.findByIdAndUpdate(id, data);

      if (item) {
        res.status(201).json({ message: "Livro atualizado com sucesso!" });
      } else {
        next(new NotFound("Id do Livro não encontrado"));
      }
    } catch (err) { next(err); }
  }

  static async delete (req, res, next) {
    const { id } = req.params;

    try {
      const item = await book.findByIdAndDelete(id);

      if (item) {
        res.status(201).json({ message: "Livro excluído com sucesso!" });
      } else {
        next(new NotFound("Id do Livro não encontrado"));
      }
    } catch (err) { next(err); }
  }
};

export default BookController;