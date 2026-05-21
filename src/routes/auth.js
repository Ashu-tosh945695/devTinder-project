const express = require("express");
const authRouter = express.Router();
const validateSignUpData = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  // const userObj = {
  //   firstName: "Ashutosh",
  //   lastName: "Singh",
  //   email: "ashu@1234",
  //   paswword: "1234",
  //   age: 24,
  //   gender: "M"
  // }

  // user validation -----------------
  validateSignUpData(req);

  const { firstName, lastName, emailId, password } = req.body;

  // encryted password-----------

  const passwordHash = await bcrypt.hash(password, 10);
  console.log(passwordHash);

  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });
  await user.save();
  res.send("Data save successfully");
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("email is not present in db");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // create a jwt token
      const token = await user.getJWT();
      console.log(token);

      // Add the token to cookie and send the response back to the user

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("login successfully");
    } else {
      throw new Error("password is not valid");
    }
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

module.exports = authRouter











