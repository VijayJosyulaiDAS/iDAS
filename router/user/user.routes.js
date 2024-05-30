const express = require('express')
const router = express.Router();

const user = require('../../controller/user/user.controller')

router.get('/get_user', user.getUser)
router.post('/create_user', user.createuser)
router.put('/data', user.createuser)
router.delete('/delete_user/:user_id', user.deleteUser)


module.exports = router;