var express = require('express');
var router = express.Router();
//Connect DB
var mongodb=require('mongodb');
var db=require('monk')('localhost:27017/ProjectDB');

/* GET home page. */
router.get('/', function(req, res, next) {
      var projects=db.get('Projects');
      projects.find({},{},function(err,project){
            console.log(project);
            res.render('index',{projects:project});
      })
});
router.get('/details/:id', function(req, res, next) {
      var projects=db.get('Projects');
      projects.find(req.params.id,{},function(err,project){
            res.render('details',{projects:project});
      })
});

module.exports = router;
