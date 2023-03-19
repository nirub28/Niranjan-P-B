const mongoose = require('mongoose');
const env= require('./environment');


mongoose.connect(`mongodb://127.0.0.1:27017/${env.dbs}`);

const db=mongoose.connection;

db.on('err' ,console.error.bind('Error connecting to MongoDB'));

db.once('open',  function(){
   console.log('database in use', `${env.dbs}`);
   console.log("Succefully connected to database:: MongoDB");
});

module.exports = db;
 