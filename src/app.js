const express = require("express")
const app = express();
const connectDB = require("./config/database")
const jwt = require("jsonwebtoken"); 
const cookieParser = require("cookie-parser")
const cors = require("cors")


app.use(cors({
  origin: "http://localhost:5173",  //white listing the origin domain name
  credentials: true,
}
))
app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth")
const profileRouter = require('./routes/profile')
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter);

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

