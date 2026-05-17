const express = require("express")
const app = express();
const connectDB = require("./config/database")
const User = require("./models/user")



app.use(express.json())

app.post("/signup", async(req,res)=>{
  // const userObj = {
  //   firstName: "Ashutosh",
  //   lastName: "Singh",
  //   email: "ashu@1234",
  //   paswword: "1234",
  //   age: 24,
  //   gender: "M"
  // }
  const user = new User(req.body);
  await user.save()
  res.send("Data save successfully")
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


