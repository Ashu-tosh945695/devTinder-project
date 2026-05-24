const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to the user collection
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  },
);

// compound indexes
connectionRequestSchema.index({fromUserId :1, toUserId :1})

  // connectionRequestSchema.pre("save", function (next) {
  //   const ConnectionRequest = this;
  //   //  check if the fromuserId same as touserId

  //   if (ConnectionRequest.fromUserId.equals(ConnectionRequest.toUserId)) {
  //     throw new Error("can not sent connection request to your self");
  //   }
  //   next();
  // }),


//  connectionRequestSchema.pre("save", function (next) {
//    if (this.fromUserId.equals(this.toUserId)) {
//      return next(new Error("Cannot send connection request to yourself"));
//    }
//    next();
//  });

ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema)

module.exports= ConnectionRequestModel; 