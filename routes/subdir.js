const express = require('express')
const router = express.Router();
const fire = require('../events/fire');
const path = require('path')


// Route Handlers

router.get('^/$|app(.html)?', (req, res) => {
    fire.emit('connection', req)
    console.log('/')
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'app.html'));
})
router.get('^/$|test(.html)?', (req, res) => {
    fire.emit('connection', req)
    console.log('/')
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
})
module.exports = router