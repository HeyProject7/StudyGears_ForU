const express = require('express');
const router = express.Router();
const path = require("path");

router.get('/', (req, res) => {
    console.log("admin")
    res.sendFile(path.join(__dirname, '..', 'views', 'rootViews', 'adminPanel.html'));
    // next();
});
module.exports = router;