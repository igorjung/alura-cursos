import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: { 
    type: String, 
    required: [true, "O campo nome é obrigatório"]
  },
  nationality: { 
    type: String,
    enum: {
      values: [
        'África do Sul', 
        'Estados Unidos', 
        'Brasil', 
        'Reino Unido'
      ],
      message: "A nacionalidade {VALUE} não é um valor permitido."
    }
  },
}, { versionKey: false });

const author = mongoose.model("authors", authorSchema);

export { author, authorSchema };