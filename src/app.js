const express = require("express")
const app = express();


app.use("/hello", (req, res) => {
  res.send("hello guys");
});
app.use("/",(req,res)=>{
     res.send("hello word use")
})

app.listen(3000, ()=>{
    console.log("server is started")
})