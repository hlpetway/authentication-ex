'use strict';
var Note = require('../models/Note');

module.exports = function(app, passport) {
  var baseUrl = app.get('apiBase') + 'notes';

  app.get(baseUrl, function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    Note.find({}, function(err, notes) {
      if(err) {
        res.send(500, {error: err});
        return false;
      }
      res.send(notes);
    });
  });

  app.post(baseUrl, function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    Note.findOne({'_id': req.params.id}, function(err, note) {
      if(err) {
        res.send(500, {error: err});
        return false;
      }
      res.send(note);
    });
  });

  app.get(baseUrl + '/:id', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var note = new Note({noteBody: req.body.noteBody});
    note.save(function(err, resNote) {
      if(err) {
        res.send(500, {error: err});
        return false;
      }
      res.send(resNote);
    });
  });

  app.put(baseUrl + '/:id', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;
    delete req.body._id;

    Note.findOneAndUpdate({'_id' : id}, req.body, function(err, note) {
      if (err) {
        res.send(500, {error: err});
      } else {
        res.send(note);
      }
    });
  });

  app.delete(baseUrl + '/:id', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    Note.remove({'_id' : req.params.id}, function(err) {
      if(err) {
        res.send(500, {error: err});
        return false;
      }
      res.send({'message' : 'success!'});
    });
  });
};
