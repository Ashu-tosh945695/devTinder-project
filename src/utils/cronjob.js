// const cron = require("node-cron")
// const {subDays,startDay,endDay, endOfDay} = require("date-fns")

// cron.schedule("* * * * * *", async() =>{
//    try{
//     const yesterDay = subDays(new Date(),1)
//     const yesterdayStart = startDay(yesterday)
//     const yesterdayEnd = endOfDay(yesterday)

//     const pendingRequests = await ConnectionRequestModel.find({
//         status: "interested",
//         createdAt:{
//             $gte: yesterdayStart,
//             $lt: yesterdayEnd,
//         }
//     }).populate("fromUserId toUserId")

//     const listOfEmails = [... new Set(pendingRequests.map(res=> res.toUserId.emailId)),

//     ]

//     for(const email of listOfEmails){
//         try{
//             const res = await sendEmail.run(
//                 "New Friend request pending for"
//                + toEmailId, "there are so may friend request pending"            )
//       console.log (res)
//         }catch(err){

//         }

//     }

//    }catch(err){

//    }
// })





