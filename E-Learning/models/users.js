var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/ElearningDB';
var bcrypt = require('bcryptjs');
mongoose.connect(mongoDB, {
  useNewUrlParser: true
})
//Connect
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

var userSchema = mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  type: {
    type: String
  }
});
var User = module.exports = mongoose.model('users', userSchema);


module.exports.saveStudent = function(newUser, newStudent, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
          newUser.password=hash;
          newUser.save(callback);
          newStudent.save(callback);
    });
  });
}
module.exports.saveInstructor = function(newUser, newInstructor, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
          newUser.password=hash;
          newUser.save(callback);
          newInstructor.save(callback);
    });
  });
}
module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}
module.exports.getUserByUserName = function(username, callback) {
  var query = {
    username: username
  };
  User.findOne(query, callback);
}

module.exports.comparePassword = function(password, hash, callback) {
  bcrypt.compare(password, hash, function(err, isMatch) {
        callback(null, isMatch);
  });
}
