const express = require("express")
const app = express();
const {AuthUser,DeleteUser} = require("./middlewares/auth")

app.use("/admin",AuthUser);
app.use("/admin",DeleteUser);

app.get("/admin/getAllData", (req, res,next) => {
    console.log("Route handler 3");
    res.send("data sent successfully");

  }
);

app.get("/admin/AllDataDelete", (req, res, next) => {
  console.log("Route handler 3");
  res.send("data deleted successfully");
});


app.listen(3000, ()=>{
    console.log("server is started")
})