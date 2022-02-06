var express = require('express');
var router = express.Router();

//Connect DB
var mongodb = require('mongodb');
var db = require('monk')('localhost:27017/ProjectDB');

//upload
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + ".jpg");
  }
});

var upload = multer({
  storage: storage
});

router.get('/projects', function(req, res, next) {
  var projects = db.get('Projects');
  projects.find({}, {}, function(err, project) {
    res.render('adminprojects', {
      projects: project
    });
  })
});
router.post('/projects/delete/', function(req, res, next) {
  var projects = db.get('Projects');
  projects.remove({
    _id: req.body.id
  });
  res.redirect("/admin/projects");
});
router.get('/projects/add', function(req, res, next) {
  res.render('addproject');
});

router.get('/projects/edit/:id', function(req, res, next) {
  var projects = db.get('Projects');
  projects.find(req.params.id, {}, function(err, project) {
    res.render('editproject', {
      projects: project
    });
  })
});
router.post('/projects/edit', upload.single("image"), function(req, res, next) {
  var projects = db.get('Projects');
  //มีการแก้ไขและอัพโหลดภาพ
  if (req.file) {
    var projectimage = req.file.filename;
    projects.update({
      _id: req.body.id
    }, {
      $set: {
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        image: projectimage
      }
    }, function(err, success) {
      if (err) {
        res.send(err)
      } else {
        res.location('/admin/projects');
        res.redirect('/admin/projects');
      }
    })
  } else {
    projects.update({
      _id: req.body.id
    }, {
      $set: {
        name: req.body.name,
        description: req.body.description,
        date: req.body.date
      }
    }, function(err, success) {
      if (err) {
        res.send(err)
      } else {
        res.location('/admin/projects');
        res.redirect('/admin/projects');
      }
    })
  }
});

router.post('/projects/add', upload.single("image"), function(req, res, next) {
  var projects = db.get('Projects');
  if (req.file) {
    var projectimage = req.file.filename;
  } else {
    var projectimage = "No Image";
  }
  projects.insert({
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    image: projectimage
  }, function(err, success) {
    if (err) {
      res.send(err);
    } else {
      res.location('/admin/projects');
      res.redirect('/admin/projects');
    }
  });
});

module.exports = router;
