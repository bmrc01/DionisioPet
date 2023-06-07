const mongoose = require('mongoose');

const { Schema } = mongoose;

const { vacinaSchema } = require('./Vacina');

const petSchema = new Schema({
  name: { type: String, required: true },
  race: { type: String, required: true },
  vaccinated: { type: Boolean, required: true },
  lastVaccineDate: { type: String, required: false },
  image: { type: String, required: true },
  description: { type: String, required: false },
  tag: { type: String, required: true },
  vaccines: { type: [vacinaSchema] },
}, { timestamps: true });

const Pet = mongoose.model("Pet", petSchema);

module.exports = {
  Pet,
  petSchema,
};
