const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');

const db=mongoose.connection;

db.on('err' ,console.error.bind('Error connecting to MongoDB'));

db.once('open',  function(){
   console.log("Succefully connected to database:: MongoDB");
});

module.exports = db;