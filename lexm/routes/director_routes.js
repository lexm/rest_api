'use strict';

module.exports = (router, models) => {
  var Director = models.Director;

  router.route('/')
  .get((req, res) => {
    Director.find({}, (err, directors) => {
      res.json({data: directors});
    });
  })
  .post((req, res) => {
    var newDirector = new Director(req.body);
    newDirector.save((err, director) => {
      res.json(director);
    });
  });
  router.route('directors/:id')
  .get((req, res) => {
    Director.findById(req.params.id, (err, director) => {
      res.json(director);
    });
  })
  .put((req, res) => {
    Director.findByIdAndUpdate(req.params.id, req.body, (err, director) => {
      if (err) return res.send(err);
      res.json(director);
    });
  })
  .delete((req, res) => {
    Director.findById(req.params.id, (err, director) => {
      director.remove((err, director) => {
        res.json({message: 'director removed'});
      });
    });
  });

  router.route('/size')
  .get((req, res) => {
    Director.find({}, (err, directors) => {
      res.write(directors.length.toString());
      res.end();
    });
  });
  
  router.route('/:id')
  .get((req, res) => {
    Director.findById(req.params.id, (err, director) => {
      res.json(director);
    });
  })
  .put((req, res) => {
    Director.findByIdAndUpdate(req.params.id, req.body, (err, director) => {
      if (err) return res.send(err);
      res.json(director);
    });
  })
  .delete((req, res) => {
    Director.findById(req.params.id, (err, director) => {
      director.remove(() => {
        res.json({message: 'director removed'});
      });
    });
  })

}


// Director.find({}, (err, directors) => {
//   res.write(directors.length.toString());
//   console.log(directors);
//   res.end();
// });
