import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION!);
    console.log('Conectado');
  } catch (err) {
    console.log(`Erro: ${err}`);
  }
}

export default main;
