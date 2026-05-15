const express = require("express")
const app = express();




app.get("/test",(req,res)=>{
    res.send({name: "ashu"})
});

app.post("/test",(req,res)=>{
    res.send("data save successfully")
})
app.delete("/test",(req,res)=>{
    res.send("data deleted successfully")
})
app.patch("/test", (req,res)=>{
    res.send("data updated successfully")
})
app.put("/test", (req, res) => {
  res.send("data put successfully");
});

app.use("/test", (req, res) => {
  res.send("hello guys hellllll");
});

app.listen(3000, ()=>{
    console.log("server is started")
})