import { Request, Response } from 'express';
import { Vacina as VacinaModel, vacinaSchema } from '../models/Vacina'; // Assuming the Vacina model is defined in a separate file
import { VacinaInterface } from '../interfaces/vacinas-interface';

const vacinaController = {
  create: async (req: Request, res: Response) => {
    try {
      const vacina: VacinaInterface = {
        name: req.body.name,
        vaccineDate: req.body.vaccineDate,
      };

      const response = await VacinaModel.create(vacina);

      res.status(201).json({ response, msg: 'Vacina cadastrada com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const vacinas = await VacinaModel.find();

      res.json(vacinas);
    } catch (error) {
      console.log(error);
    }
  },

  get: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const vacina = await VacinaModel.findById(id);

      if (!vacina) {
        res.status(404).json({ msg: 'Vacina não encontrada.' });
        return;
      }

      res.json(vacina);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const vacina = await VacinaModel.findById(id);

      if (!vacina) {
        res.status(404).json({ msg: 'Vacina não encontrada.' });
        return;
      }

      const deleteVacina = await VacinaModel.findByIdAndDelete(id);

      res
        .status(200)
        .json({ deleteVacina, msg: 'Vacina excluída com sucesso.' });
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req: Request, res: Response) => {
    const id = req.params.id;

    const vacina: VacinaInterface = {
      name: req.body.name,
      vaccineDate: req.body.vaccineDate,
    };

    const updateVacina = await VacinaModel.findByIdAndUpdate(id, vacina);

    if (!updateVacina) {
      res.status(404).json({ msg: 'Vacina não encontrada.' });
      return;
    }

    res
      .status(200)
      .json({ vacina: updateVacina, msg: 'Vacina atualizada com sucesso.' });
  },
};

export default vacinaController;
