const mongoose = require("mongoose");

const connectDB = async ()=>{
   mongoose.connect(
     "mongodb+srv://ashu57093_db_user:dhWkAFDibvpQrrKl@cluster0.lcyqa2x.mongodb.net/devTinder"
   );
}

module.exports = connectDB;

