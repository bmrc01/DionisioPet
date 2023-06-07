const router = require('express').Router();

const petController = require('../controllers/petController');

router.route("/pets").post((req, res) => petController.create(req, res));

router.route("/pets").get((req, res) => petController.getAll(req, res));

router.route("/pets/:id").get((req, res) => petController.get(req, res));

router.route("/pets/:id").delete((req, res) => petController.delete(req, res));

router.route("/pets/:id").put((req, res) => petController.update(req, res));

module.exports = router;