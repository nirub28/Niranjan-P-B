const mongoose = require('mongoose');
const env= require('../config/enivironment');

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.db}`);

const db=mongoose.connection;

db.on('err' ,console.error.bind('Error connecting to MongoDB'));

db.once('open',  function(){
   //console.log('database in prod', process.env.CODEIAL_db);
   console.log("Succefully connected to database:: MongoDB");
});

module.exports = db;