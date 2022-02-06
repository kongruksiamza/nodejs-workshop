var express = require('express');
var router = express.Router();
var Instructor=require('../models/instructors');
var Classes=require('../models/classes');

router.get('/classes', function(req, res, next) {
  Instructor.getInstructorsByUserName(req.user.username,function(err,instructor){
        res.render('instructors/classes',{instructor:instructor});
  });
});

router.get('/classes/:id/lesson/new', function(req, res, next) {
        res.render('instructors/newlesson',{class_id:req.params.id})
});

router.post('/classes/:id/lesson/new', function(req, res, next) {
            info=[];
            info["class_id"]=req.params.id;
            info["lesson_number"] = req.body.lesson_number;
            info["lesson_title"]=req.body.lesson_title;
            info["lesson_body"]=req.body.lesson_body;
            console.log(info["class_id"]);
            Classes.addLesson(info,function(err,lesson){
                  if(err) throw err;
            });
            res.location('/instructors/classes');
            res.redirect('/instructors/classes');
});

module.exports = router;
