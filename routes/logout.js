const express = require('express');
const router = express.Router();
const logout = require('../controller/logOut')
router.get('/', logout.handleLogOut);
module.exports = router;