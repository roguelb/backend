// import controllers review, products
const clientUser = require('../../components/client/client');


// router
const router = require('express').Router()

router.post('/clientuser', clientUser.createNewUser)
module.exports = router