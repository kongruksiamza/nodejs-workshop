var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/ElearningDB';

mongoose.connect(mongoDB, {
  useNewUrlParser: true
})
//Connect
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

var studentSchema = mongoose.Schema({
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
var Student = module.exports = mongoose.model('students', studentSchema)

module.exports.getStudentsByUserName = function(username, callback) {
  var query = {
    username: username
  }
  Student.findOne(query, callback);
}

module.exports.register = function(info, callback) {
      student_user=info["student_user"];
      class_id=info["class_id"];
      class_title=info["class_title"];
      var query = {
          username: student_user
      }
      Student.findOneAndUpdate(
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
