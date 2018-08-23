const express = require('express');
const config = require('config');
const router = express.Router();

const fetchAsync = require('../utils/fetchAsync');

const RANDOM_IMAGE = config.get('unsplashUrl');

router.get('/', (req, res) => {
    let imgSrc = '';
    fetchAsync(RANDOM_IMAGE).then(data => {
        imgSrc = data.urls.regular;
        res.render('index', { title: 'Express App', pageTitle: 'Index Page', imgSrc: imgSrc });
    });
});

module.exports = router;
