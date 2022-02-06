var express = require('express');
var router = express.Router();
var moment = require('moment');

var {
  check,
  validationResult
} = require('express-validator');

//Connect DB
var mongodb = require('mongodb');
var db = require('monk')('localhost:27017/BlogDB');

/* GET home page. */
router.get('/', function(req, res, next) {
  var blogs = db.get('posts');
  var categories = db.get('categories');
  blogs.find({}, {}, function(err, blog) {
    categories.find({}, {}, function(err, category) {
      res.render('index', {
        posts: blog,
        categories: category,
        moment:moment
      });
    });
  });
});

router.get('/show/:id', function(req, res, next) {
  var blogs = db.get('posts');
  var categories = db.get('categories');
  blogs.find(req.params.id, {}, function(err, blog) {
    categories.find({}, {}, function(err, category) {
      res.render('show', {
        posts: blog,
        categories: category,
        moment:moment
      });
    });
  });
});
router.get('/posts/show/', function(req, res, next) {
  var blogs = db.get('posts');
  var categories = db.get('categories');
  var name=req.query.category;//ไปดึงค่าจาก query string category
  var author=req.query.author;
  var title=req.query.title;
  if(name){
    blogs.find({category:name}, {}, function(err, blog) {
      categories.find({}, {}, function(err, category) {
        res.render('show_search', {
          posts: blog,
          categories: category,
          moment:moment,
          search:name
        });
      });
    });
  }
  if(author){
    blogs.find({author:author}, {}, function(err, blog) {
      categories.find({}, {}, function(err, category) {
        res.render('show_search', {
          posts: blog,
          categories: category,
          moment:moment,
          search:author
        });
      });
    });
  }
  if(title){
    blogs.find({title:title}, {}, function(err, blog) {
      categories.find({}, {}, function(err, category) {
        res.render('show_search', {
          posts: blog,
          categories: category,
          moment:moment,
          search:title
        });
      });
    });
  }
});

router.get('/category/add', function(req, res, next) {
  res.render('addcategory');
});

router.get('/post/add', function(req, res, next) {
  var categories = db.get('categories');
  categories.find({}, {}, function(err, category) {
    res.render('addpost', {
      categories: category
    });
  });
});

router.post('/post/add', [
  check('title', 'กรุณาป้อนชื่อบทความ').not().isEmpty(),
  check('content', 'กรุณาป้อนเนื้อหา').not().isEmpty(),
  check('img', 'กรุณาใส่ภาพปก').not().isEmpty(),
  check('author', 'กรุณาป้อนชื่อผู้เขียน').not().isEmpty()
], function(req, res, next) {
  var result = validationResult(req);
  var errors = result.errors;
  var categories = db.get('categories');
  var posts = db.get('posts');

  if (!result.isEmpty()) {
    categories.find({}, {}, function(err, category) {
      res.render('addpost', {
        categories: category,
        errors: errors
      });
    });
  } else {
    // Insert Post
    posts.insert({
      title: req.body.title,
      category: req.body.category,
      content: req.body.content,
      img: req.body.img,
      author: req.body.author,
      date: new Date()
    }, function(err, success) {
      if (err) {
        res.send(err);
      } else {
        res.location('/');
        res.redirect('/');
      }
    })

  }
});

router.post('/category/add', [
  check('name', 'ชื่อประเภทต้องไม่เป็นค่าว่าง').not().isEmpty()
], function(req, res, next) {
  var result = validationResult(req);
  var errors = result.errors;
  if (!result.isEmpty()) {
    res.render('addcategory', {
      errors: errors
    });
  } else {
    //บันทึกข้อมูลประเภท
    var category = db.get('categories');
    category.insert({
      name: req.body.name
    }, function(err, success) {
      if (err) {
        res.send(err);
      } else {
        res.location('/');
        res.redirect('/');
      }
    })
  }
});

module.exports = router;
