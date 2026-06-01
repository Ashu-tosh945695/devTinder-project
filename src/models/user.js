const mongoose = require("mongoose")
const validator= require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 8,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email address" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("invalid password" + value);
        }
      },
    },
    age: {
      type: String,
      min: 18,
    },
    gender: {
      type: String,
      enum:{
          values: ["Male", "Female", "Others"],
          message: `{VALUE} is not a valid gender`,
      },
      // validate(value) {
      //   if (!["male", "female", "other"].includes(value)) {
      //     throw new Error("Gender is not valid"+value);
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://img.magnific.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80",
        validate(value){
          if(!validator.isURL(value)){
            throw new Error("Invalid Url"+value)
          }
        }
    },
    about: {
      type: String,
      default: "This is a default about of the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
)

//  compound indexes---

// userSchema.index({firstName:1, lastName: 1})

  userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
     return token;
    }

    userSchema.methods.validatePassword = async function(passwordInputByUser){
      const user = this;
      const passwordHash = user.password
       const isPasswordValid =  await bcrypt.compare(passwordInputByUser, passwordHash)
       return isPasswordValid
    }


module.exports = mongoose.model("User", userSchema)