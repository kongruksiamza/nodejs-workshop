var express = require('express');
var router = express.Router();
var Classes=require('../models/classes');
var Instructor=require('../models/instructors');

router.post('/register',function(req,res,next){
     var class_id=req.body.class_id;
     var class_name=req.body.class_name;
     var description=req.body.description;
     var instructor=req.body.instructor;
     var img_url=req.body.img_url;
     var newClass=new Classes({
        class_id:class_id,
        title:class_name,
        description:description,
        instructor:instructor,
        img_url:img_url
     })
     info=[];
     info["instructor_user"]=req.user.username;
     info["class_id"]=class_id;
     info["class_title"]=class_name;

     Classes.saveNewClass(newClass,function(err,student){
            if(err) throw err;
     });

     Instructor.register(info,function(err,instructor){
            if(err) throw err;
     });
     res.location('/instructors/classes');
     res.redirect('/instructors/classes');
});
router.get('/:id/lesson',function(req,res,next){
       Classes.getClassID([req.params.id],function(err,className){
              res.render('classes/viewlesson',{className:className})
       });
});

router.get('/:id/lesson/:lesson_id',function(req,res,next){
       Classes.getClassID([req.params.id],function(err,className){
              var lesson; //1
              for (var i = 0; i < className.lesson.length; i++) {
                    if(className.lesson[i].lesson_number == req.params.lesson_id){
                        lesson=className.lesson[i];
                    }
              }
              res.render('classes/lesson',{className:className,lesson:lesson})
       });
});

module.exports = router;
