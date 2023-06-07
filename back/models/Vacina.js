const mongoose = require('mongoose');

const { Schema } = mongoose;

const vacinaSchema = new Schema({
  name: { type: String, required: true },
  vaccineDate: { type: String, required: true },
}, { timestamps: true });

const Vacina = mongoose.model("Vacina", vacinaSchema);

module.exports = {
  Vacina,
  vacinaSchema,
};
