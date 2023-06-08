import mongoose, { Schema, Document } from 'mongoose';
import { vacinaSchema, Vacina } from './Vacina';

interface Pet extends Document {
  name: string;
  race: string;
  vaccinated: boolean;
  lastVaccineDate?: string;
  image: string;
  description?: string;
  tag: string;
  vaccines: typeof Vacina[];
}

const petSchema = new Schema<Pet>({
  name: { type: String, required: true },
  race: { type: String, required: true },
  vaccinated: { type: Boolean, required: true },
  lastVaccineDate: { type: String, required: false },
  image: { type: String, required: true },
  description: { type: String, required: false },
  tag: { type: String, required: true },
  vaccines: { type: [vacinaSchema] },
}, { timestamps: true });

const PetModel = mongoose.model<Pet>("Pet", petSchema);

export { PetModel, petSchema };

