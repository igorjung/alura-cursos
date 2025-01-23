import mongoose from "mongoose";
import { authorSchema } from "./Author.js";
import { publisherSchema } from "./Publisher.js";

const bookSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: { 
    type: [String, "Valor inserído é invalido"], 
    required: [true, "O campo título é obrigatório"]
  },
  description: { type: String },
  publisher: {
    type: publisherSchema,
    ref: 'publishers'
  },
  price:  { type: Number },
  pages:  { 
    type: Number, 
    min: [10, "O número de páginas deve estar entre 10 e 5000."], 
    max: [5000, "O número de páginas deve estar entre 10 e 5000."] 
  },
  author:  {
    type: authorSchema,
    ref: 'authors', 
    required: [true, "O campo autor é obrigatório"]
  },
}, { versionKey: false });

const book = mongoose.model("books", bookSchema);

export default book;