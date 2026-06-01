
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
   
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
    paymentId:{
        type: String,
    },
    
    orderId:{
        type: String,
        required: true,
    },

    status:{
        type: String,
        required: true,
    },

    amount:{
        type: String,
        required: true,

    },
    
    currency:{
        type: String,
        required: true,

    },
    
    receipt:{
        type: String,
        required: true,

    },
    notes:{
        // type: String,
          type: mongoose.Schema.Types.Mixed,
        required: true,

    },
    
    

     

},{
    timestamps:true
})


module.exports = mongoose.model("Payment", paymentSchema)   