// import controllers review, products
const mailer = require('../../components/mailer/MailerController');


// router
const router = require('express').Router()

router.post('/mailer', mailer.sendMail)
module.exports = router