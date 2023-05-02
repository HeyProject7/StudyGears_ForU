const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
// const FileMain = require('./router.js')
const store = require('store');

// Routes TO Videos
router.route('/:id')
    .get((req, res) => {
        var link = req.params.id;
        var links = store.get('vdoLinks').links[link];
        console.log("Final Link ", links)
        res.render(path.join(__dirname, '..', 'views', 'subViews', 'StudyGears_videoPlayer.pug'), { links: links });
    })

module.exports = router;