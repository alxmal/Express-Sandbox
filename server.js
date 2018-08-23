const debug = require('debug')('app');
const config = require('config');
const helmet = require('helmet');
const genres = require('./routes/apiGenres');
const homepage = require('./routes/homepage');
const express = require('express');
const app = express();

const fetchAsync = require('./utils/fetchAsync');

const PORT = config.get('port');
const NAME = config.get('name');

const TMDB_KEY = config.get('tmdbKey');

debug('Loading %o', NAME);
debug(`NODE_ENV is ${process.env.NODE_ENV}`);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres', genres);
app.use('/', homepage);

app.get('/genres', (req, res) => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_KEY}`;
    fetchAsync(url).then(data => {
        res.render('genres', { pageTitle: 'Genres Page', genres: data.genres });
    });
});

app.listen(PORT, () => debug(`Listening on port ${PORT}!`));
