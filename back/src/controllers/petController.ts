import { Request, Response } from 'express';
import { PetModel } from '../models/Pet'; // Assuming the Pet model is defined in a separate file
import { PetInterface } from '../interfaces/pet-interface';

const petController = {
  create: async (req: Request, res: Response) => {
    try {
      const pet: PetInterface = {
        name: req.body.name,
        race: req.body.race,
        vaccinated: req.body.vaccinated,
        lastVaccineDate: req.body.lastVaccineDate,
        image: req.body.image,
        description: req.body.description,
        tag: req.body.tag,
        vaccines: req.body.vaccines,
      };

      const response = await PetModel.create(pet);

      res.status(201).json({ response, msg: 'Pet cadastrado com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const pets = await PetModel.find({}, 'name race vaccinated image tag');

      res.json(pets);
    } catch (error) {
      console.log(error);
    }
  },

  get: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const pet = await PetModel.findById(id);

      if (!pet) {
        res.status(404).json({ msg: 'Pet não encontrado.' });
        return;
      }

      res.json(pet);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const pet = await PetModel.findById(id);

      if (!pet) {
        res.status(404).json({ msg: 'Pet não encontrado.' });
        return;
      }

      const deletePet = await PetModel.findByIdAndDelete(id);

      res.status(200).json({ deletePet, msg: 'Pet excluído com sucesso.' });
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req: Request, res: Response) => {
    const id = req.params.id;

    const pet: PetInterface = {
      name: req.body.name,
      race: req.body.race,
      vaccinated: req.body.vaccinated,
      lastVaccineDate: req.body.lastVaccineDate,
      image: req.body.image,
      description: req.body.description,
      tag: req.body.tag,
      vaccines: req.body.vaccines,
    };

    const updatePet = await PetModel.findByIdAndUpdate(id, pet);

    if (!updatePet) {
      res.status(404).json({ msg: 'Pet não encontrado.' });
      return;
    }

    res
      .status(200)
      .json({ pet: updatePet, msg: 'Pet atualizado com sucesso.' });
  },
};

export default petController;
