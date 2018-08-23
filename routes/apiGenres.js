const express = require('express');
const router = express.Router();
const config = require('config');

const validateGenre = require('../utils/validateGenre');
const fetchAsync = require('../utils/fetchAsync');

const TMDB_KEY = config.get('tmdbKey');

router.get('/', (req, res) => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_KEY}`;
    fetchAsync(url).then(data => {
        res.send(data.genres);
    });
});

router.get('/:id', (req, res) => {
    const genre = genres.find(item => item.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with teh given ID was not found.');

    res.send(genre);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const genre = genres.find(item => item.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with teh given ID was not found.');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(item => item.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with teh given ID was not found.');

    const idx = genres.indexOf(genre);
    genres.splice(idx, 1);

    res.send(genre);
});

module.exports = router;
