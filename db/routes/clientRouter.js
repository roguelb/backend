// import controllers review, products
const client = require('../../components/client/ClientController');


// router
const router = require('express').Router()

router.post('/client', client.createnewclient)
router.get('/client/:cid', client.getClientByID)
router.get('/clientuser/:username', client.getClientUserByUsername)
module.exports = router