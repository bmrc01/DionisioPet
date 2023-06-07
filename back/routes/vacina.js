const router = require('express').Router();

const vacinaController = require('../controllers/vacinaController');

router.route("/vacinas").post((req, res) => vacinaController.create(req, res));

router.route("/vacinas").get((req, res) => vacinaController.getAll(req, res));

router.route("/vacinas/:id").get((req, res) => vacinaController.get(req, res));

router.route("/vacinas/:id").delete((req, res) => vacinaController.delete(req, res));

router.route("/vacinas/:id").put((req, res) => vacinaController.update(req, res));

module.exports = router;