const express = require("express")
const app = express();




app.use(
  "/user",[
  (req, res, next) => {
    console.log("Route handler one");
    next();
    // res.send("Response 1")
  },
  (req, res, next) => {
    console.log("Route handler 2");
    // res.send("resnponse 2")
    next();
  },
  (req, res, next) => {
    console.log("Route handler 3");
    // res.send("resnponse 3")
    next();
  },
  (req, res, next) => {
    console.log("Route handler 3");
    res.send("resnponse 4")

  },
  ]
);


app.listen(3000, ()=>{
    console.log("server is started")
})