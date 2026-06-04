const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

userRouter.get("/user/requests/received",userAuth, async(req,res) =>{
    
try {
  const loggedInUser = req.user;

  const connectionRequests = await ConnectionRequest.find({
    toUserId: loggedInUser._id,
    status: "interested",
  }).populate("fromUserId",["firstName", "lastName","age","gender","about", "skills"])
 console.log(connectionRequests)
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

    // console.log("Logged In User ID:", loggedInUser._id);
    // console.log("Connection Requests:", connectionRequests);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    console.log("Final Data:", data);

    res.json({ data });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
// userRouter.get("/user/connections", userAuth, async (req, res) => {
//   try {
//     const loggedInUser = req.user;

//     const connectionRequests = await ConnectionRequest.find({
//       $or: [
//         { fromUserId: loggedInUser._id, status: "accepted" },
//         { toUserId: loggedInUser._id, status: "accepted" },
//       ],
//     })
//       .populate("fromUserId", "firstName lastName age skills gender")
//       .populate("toUserId", "firstName lastName age skills gender");

//     const data = connectionRequests.map((row) => {
//       if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
//         return row.toUserId;
//       }
//       return row.fromUserId;
//     });

//     res.json({
//       data,
//     });
//   } catch (err) {
//     res.status(400).send("ERROR: " + err.message);
//   }
// });


userRouter.get("/feed", userAuth, async(req,res)=>{

  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) ||1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit
    const skip = (page-1) * limit;
    

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    })
      .select("fromUserId toUserId")
      .populate("fromUserId", "firstName")
      .populate("toUserId", "firstName");

    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId);
      hideUsersFromFeed.add(req.toUserId);
    });
    console.log(hideUsersFromFeed);

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select("firstName lastName age skills gender").skip(skip).limit(limit)

    res.send(users);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }



})



module.exports = userRouter;