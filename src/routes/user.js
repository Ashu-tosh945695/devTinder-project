const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest")

userRouter.get("/user/requests/received",userAuth, async(req,res) =>{
    
try {
  const loggedInUser = req.user;

  const connectionRequests = await ConnectionRequest.find({
    toUserId: loggedInUser._id,
    status: "interested",
  }).populate("fromUserId",["firstName", "lastName","age","gender","about", "skills"])

  res.json({
    message: "Data fetches successfully",
    data: connectionRequests
  })
} catch (err) {
  res.status(404).send("ERROR: " + err.message);
}
 
}) 

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName age skills gender")
      .populate("toUserId", "firstName lastName age skills gender");

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({
      data,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});


// userRouter.get("/feed", userAuth, async(req,res)=>{
//   const loggedInUser = req.user;
//   const connectionRequest = await ConnectionRequest.find({
//     $or:[{fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}]
//   }).select("fromUserId toUserId")

//   res.send(connectionRequest)




// })



module.exports = userRouter;