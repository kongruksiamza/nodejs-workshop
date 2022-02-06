var express = require('express');
var router = express.Router();
var {
  check,
  validationResult
} = require('express-validator');

var mongodb = require('mongodb');
var db = require('monk')('localhost:27017/E-CommerceDB');

/* GET home page. */
router.get('/add', function(req, res, next) {
  var categories = db.get('categories');
  categories.find({}, {}, function(err, category) {
    res.render('addcategory', {
      categories: category
    });
  })
});

router.post('/add', [
  check('name', 'กรุณาป้อนชื่อหมวดหมู่สินค้า').not().isEmpty()
], function(req, res, next) {
  var result = validationResult(req);
  var errors = result.errors;
  if (!result.isEmpty()) {
    res.render('addcategory', {
      errors: errors
    });
  } else {
    // Insert DB
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
