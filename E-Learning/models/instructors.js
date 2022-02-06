var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/ElearningDB';

mongoose.connect(mongoDB, {
  useNewUrlParser: true
})
//Connect
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

var instructorSchema = mongoose.Schema({
  username: {
    type: String
  },
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  email: {
    type: String
  },
  classes: [{
    class_id: {
      type: String
    },
    class_title: {
      type: String
    }
  }]
});
var Instructor = module.exports = mongoose.model('instructors', instructorSchema)

module.exports.getInstructorsByUserName = function(username, callback) {
  var query = {
    username: username
  }
  Instructor.findOne(query, callback);
}

module.exports.register = function(info, callback) {
      instructor_user=info["instructor_user"];
      class_id=info["class_id"];
      class_title=info["class_title"];
      var query = {
          username: instructor_user
      }
      Instructor.findOneAndUpdate(
        query,{
          $push:{
            "classes":{
              class_id:class_id,
              class_title : class_title
            }
          }
        },{
          safe:true,
          upsert:true
        },callback)
}
