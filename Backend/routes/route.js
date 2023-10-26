const express = require("express");
 
const router = express.Router();

const { signup , signIN,getUser,logOut} = require('../controller/controller.js');
const { infoByCokkie } = require('../middleware/jwtAuth.js');

router.post('/signup',signup);
router.post('/signin',signIN);
router.get('/userinfo',infoByCokkie,getUser);
router.get('/logOut',infoByCokkie,logOut)

module.exports = router;