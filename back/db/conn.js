const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log("Conectado");
  } catch (err) {
      console.log(`Erro: ${err}`);
  }
}

module.exports = main;