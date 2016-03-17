// var mongoose = require('mongoose');
module.exports = (mongoose, models) => {
  var Schema = mongoose.Schema;
  var directorSchema = new mongoose.Schema({
    name: String,
    date_of_birth: Date,
    movies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
      }
    ]
  });
  var Director = mongoose.model('Director', directorSchema);
  models.Director = Director
}
