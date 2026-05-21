const express = require("express")
const app = express();
const connectDB = require("./config/database")
const User = require("./models/user")
const validateSignUpData = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middlewares/auth")


app.use(express.json())
app.use(cookieParser())

app.post("/signup", async(req,res)=>{
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
  
  const {firstName, lastName,emailId,password} = req.body
  


  // encryted password-----------

  const passwordHash = await bcrypt.hash(password, 10)
  console.log(passwordHash)

  const user = new User({
    firstName,lastName,emailId,password:passwordHash,
  });
  await user.save()
  res.send("Data save successfully")
})

app.post("/login", async(req,res)=>{
  try{
    const {emailId, password} = req.body;

    const user = await User.findOne({emailId:emailId})
    if(!user){
      throw new Error("email is not present in db")
    }

    const isPasswordValid = await user.validatePassword(password);

    if(isPasswordValid){

      // create a jwt token
      const token =  await user.getJWT()
      console.log(token)

      // Add the token to cookie and send the response back to the user

      res.cookie("token", token,{expires: new Date(Date.now()+8*3600000),})
       res.send("login successfully")
    }
    else{
      throw new Error("password is not valid")
    }
  } catch(err){
    res.status(400).send("ERROR"+err.message)
  }
})

app.get("/profile", userAuth,async (req,res)=>{
  try {
   const user = req.user
    res.send(user);
  } catch (err) {
    res.status(404).send("Something went Wrong" + err.message);
  }
})

app.post("/sendConnectionRequest",userAuth, async (req,res)=>{
  const user  = req.user;
  console.log(user.firstName+"sent the connection request")

  res.send(user.firstName + "sent the connection request");
})


app.get("/user", async (req,res) =>{
  const userEmail = req.body.emailId;
  try{
     const user = await User.findOne({ emailId: userEmail });
     if(user.length ===0){
        res.status(404).send("Something wen Wrong User not found");
     }
     else{
       res.send(user);
     }
  }
  catch{
    res.status(404).send("Something wen Wrong")
  }
})

app.get("/feed", async(req,res)=>{
  try{
  const users =  await User.find({})
  res.send(users);
  }
   catch{
    res.status(404).send("Something wen Wrong")
  }
})


app.delete("/user", async(req,res)=>{
   const userId = req.body.userId;
   try{
    const user =  await User.findByIdAndDelete(userId)
   res.send("user deleted successfully")
   }
   catch{
      res.status(404).send("Something wen Wrong");
   }
   
})


app.patch("/user/:userId",async (req,res)=>{
  const userId = req.params.userId;
  const data = req.body

  try {
      const ALLOWED_UPDATES = [
        "userId",
        "photoUrl",
        "about",
        "gender",
        "age",
        "skills",
      ];
      const isUpdateAllowed = Object.keys(data).every((k) =>
        ALLOWED_UPDATES.includes(k),
      );
      if (!isUpdateAllowed) {
          throw new Error("Update not allowed")
      }
      if(data?.skills.length>10){
        throw new Error("skiils can not be more than 10")
      }
    const user = await User.findOneAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("Updated succesffully");
  } catch(err) {
    res.status(404).send("UPDATE FAILED: Something wenT Wrong"+ err.message);
  }
 
})


connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("server is started");
    });
  })
  .catch(() => {
    console.log("database cannot be connected");
  });









// const {AuthUser,DeleteUser} = require("./middlewares/auth")


// app.use("/admin",AuthUser);
// app.use("/admin",DeleteUser);

// app.get("/admin/getAllData", (req, res,next) => {
//     console.log("Route handler 3");
//     res.send("data sent successfully");

//   }
// );

// app.get("/admin/AllDataDelete", (req, res, next) => {
//   console.log("Route handler 3");
//   res.send("data deleted successfully");
// });

