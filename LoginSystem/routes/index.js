var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',enSureAuthenticated, function(req, res, next) {
    res.render('index', { title: 'Nodejs Tutorial' });
});
function enSureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
          return next();
    }else{
          res.redirect('/users/login');
  }
}
module.exports = router;
