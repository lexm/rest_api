module.exports = (mongoose, models) => {
  var Schema = mongoose.Schema;
  var movieSchema = new mongoose.Schema({
    name: String,
    release_date: Date,
    director: {
      type: Schema.Types.ObjectId,
      ref: 'Director'
    }
  });
  var Movie = mongoose.model('Movie', movieSchema);
  models.Movie = Movie;
}
