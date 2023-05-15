// import controllers review, products
const userController = require('../../components/user/UserController');


// router
const router = require('express').Router()

router.get('/user', userController.getAllUsers)
router.get('/user/username/:username', userController.getSingleUserByUsername)
router.post('/user/login', userController.login)
router.put('/user/edit', userController.editUser)
router.post('/user/createuser', userController.createNewUser)
module.exports = router