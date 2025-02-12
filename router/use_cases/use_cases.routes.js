const express = require('express')
const router = express.Router();

const useCases = require('../../controller/useCases/useCases.controller')

router.get('/get_useCases', useCases.getUseCases)
router.put('/update_useCases', useCases.updateUseCases)
router.post('/create_useCases', useCases.createUseCases)


module.exports = router;