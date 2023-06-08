import mongoose, { Schema, Document } from 'mongoose';

interface Vacina extends Document {
  name: string;
  vaccineDate: string;
}

const vacinaSchema = new Schema<Vacina>(
  {
    name: { type: String, required: true },
    vaccineDate: { type: String, required: true },
  },
  { timestamps: true },
);

const VacinaModel = mongoose.model<Vacina>('Vacina', vacinaSchema);

export { VacinaModel as Vacina, vacinaSchema };
