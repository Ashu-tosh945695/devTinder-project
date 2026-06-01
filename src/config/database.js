const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async ()=>{
   mongoose.connect(process.env.DB_CONNECTION_SECRET);
}

module.exports = connectDB;

