'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var models = require(__dirname + '/models');
var Director = models.Director;
var Movie = models.Movie;

var loginRouter = express.Router();
var directorRouter = express.Router();
var movieRouter = express.Router();

app.use(bodyParser.json());

require(__dirname + '/routes/login_routes')(loginRouter, models);
require(__dirname + '/routes/director_routes')(directorRouter, models);
require(__dirname + '/routes/movie_routes')(movieRouter, models);

app.use('login', loginRouter);
app.use('/directors', directorRouter);
app.use('/movies', movieRouter);


// app.get('/movies', (req, res) => {
//   Movie.find({}, (err, movies) => {
//     res.json({data: movies});
//   });
// });
//
// app.get('/movies/size', (req, res) => {
//   Movie.find({}, (err, movies) => {
//     res.write(movies.length.toString());
//     res.end();
//   });
// });
//
// app.get('/movies/:id', (req, res) => {
//   Movie.findById(req.params.id, (err, movie) => {
//     res.json(movie);
//   });
// });
//
//
// app.post('/movies', (req, res) => {
//   var newMovie = new Movie(req.body);
//   newMovie.save((err, movie) => {
//     res.json(movie);
//   });
// });
//
// app.put('/movies/:id', (req, res) => {
//   Movie.findByIdAndUpdate(req.params.id, req.body, (err, movie) => {
//     if (err) return res.send(err);
//     res.json(movie);
//   });
// });
//
// app.delete('/movies/:id', (req, res) => {
//   Movie.findById(req.params.id, (err, movie) => {
//     movie.remove(() => {
//       res.json({message: 'movie removed'});
//     });
//   });
// });
//
// app.get('/directors', (req, res) => {
//   Director.find({}, (err, directors) => {
//     res.json({data: directors});
//   });
// });
//
// app.get('/directors/size', (req, res) => {
//   Director.find({}, (err, directors) => {
//     res.write(directors.length.toString());
//     res.end();
//   });
// });
//
// app.get('/directors/:id', (req, res) => {
//   Director.findById(req.params.id, (err, director) => {
//     res.json(director);
//   });
// });
//
// app.post('/directors', (req, res) => {
//   var newDirector = new Director(req.body);
//   newDirector.save((err, director) => {
//     res.json(director);
//   });
// });
//
// app.put('/directors/:id', (req, res) => {
//   Director.findByIdAndUpdate(req.params.id, req.body, (err, director) => {
//     if (err) return res.send(err);
//     res.json(director);
//   });
// });
//
// app.delete('/directors/:id', (req, res) => {
//   Director.findById(req.params.id, (err, director) => {
//     director.remove(() => {
//       res.json({message: 'director removed'});
//     });
//   });
// });

// var DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
// mongoose.connect(DB_PORT);

app.listen(3000, () => {
  console.log('server started');
});
