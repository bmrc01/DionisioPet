const router = require('express').Router();

const petRouter = require('./pets');

router.use('/', petRouter);

const vacinaRouter = require('./vacina');

router.use('/', vacinaRouter);

module.exports = router;