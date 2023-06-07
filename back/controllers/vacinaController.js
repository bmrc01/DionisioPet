const { Vacina: VacinaModel } = require('../models/Vacina');

const vacinaController = {

  create: async(req, res) => {
    try {
      const vacina = {
        name: req.body.name,
        vaccineDate: req.body.vaccineDate
      };

      const response = await VacinaModel.create(vacina);

      res.status(201).json({ response, msg: "Vacina cadastrada com sucesso!" });
    } catch (error) {
        console.log(error);
    }
  },

  getAll: async (req, res) => {
    try {
        const vacinas = await VacinaModel.find();

        res.json(vacinas);
    } catch (error) {
        console.log(error);
    }
  },

  get: async (req, res) => {
    try {
      const id = req.params.id
      const vacina = await VacinaModel.findById(id);

      if(!vacina) {
        res.status(404).json({ msg: "Vacina não encontrada." });
        return;
      }

      res.json(vacina);

    } catch (error) {
        console.log(error);
    }
  },

  delete: async(req, res) => {
    try {
      const id = req.params.id;
      const vacina = await VacinaModel.findById(id);

      if(!vacina) {
        res.status(404).json({ msg: "Vacina não encontrada." });
        return;
      }

      const deleteVacina = await VacinaModel.findByIdAndDelete(id);

      res.status(200).json({ deletePet, msg: "Vacina excluída com sucesso." })

    } catch (error) {
        console.log(error);
    }
  },

  update: async (req, res) => {
    const id = req.params.id;

    const vacina = {
      name: req.body.name,
      vaccineDate: req.body.vaccineDate
    };

    const updateVacina = await VacinaModel.findByIdAndUpdate(id, vacina);

    if(!vacina) {
      res.status(404).json({ msg: "Vacina não encontrada." });
      return;
    }

    res.status(200).json({ pet, msg: "Vacina atualizada com sucesso." });
  },

}

module.exports = vacinaController;