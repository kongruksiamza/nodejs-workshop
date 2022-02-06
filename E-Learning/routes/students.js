var express = require('express');
var router = express.Router();
var Student=require('../models/students');
var Classes=require('../models/classes');

router.get('/classes', function(req, res, next) {
  Student.getStudentsByUserName(req.user.username,function(err,student){
        res.render('students/classes',{student:student});
  });
});

router.post('/classes/register',function(req,res,next){
     var student_username=req.body.student_username;
     var class_id=req.body.class_id;
     var class_title=req.body.class_title;

     info=[];
     info["student_user"]=student_username;
     info["class_id"]=class_id;
     info["class_title"]=class_title;

     Student.register(info,function(err,student){
            if(err) throw err;
     });
     res.location('/students/classes');
     res.redirect('/students/classes');
});

module.exports = router;
