const address = require('../../components/address/AddressController');


// router
const router = require('express').Router()

router.get('/alladdress/:username', address.getAllAddressses);
router.get('/addressId/:cid', address.getAddressByClientId);
router.get('/address/:id', address.getAddressByID);
router.post('/address/create', address.createAddress);
module.exports = router