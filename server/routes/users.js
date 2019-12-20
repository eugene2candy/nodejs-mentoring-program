const express = require('express');

const router = express.Router();
const user = require('../controller/user');

router.post('/', user.create);

router.get('/:id', user.find);

router.get('', user.findAll);

router.put('/:id', user.updateById);

router.delete('/:id', user.deleteById);

module.exports = router;
