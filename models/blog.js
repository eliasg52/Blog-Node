const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // esto automaticamente genera propiedades de log de tiempo: creado a las:, updateado a las:...etc

const BlogModel = mongoose.model('Blog', blogSchema); //ahora dentro de la variable blogmodel podemos utilizar todos los metodos para interactuar con la DB
module.exports = BlogModel;
