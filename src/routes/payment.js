
const express = require("express");
const {userAuth} = require("../middlewares/auth")
const paymentRouter = express.Router()
const razorpayInstance = require("../utils/razorpay")
const Payment = require("../models/payment")
// const membershipType  = require("../utils/constants")
const membershipType = require("../utils/constants");


paymentRouter.post("/payment/create", userAuth,async (req,res)=>{

    try {
  const { membershipType } = req.body;
  const amount = membershipType === "gold" ? 1000 : 500;
      const { firstName, lastName, emailId } = req.user;

      const order = await razorpayInstance.orders.create({
        // amount: membershipAmount(membershipType) * 100,
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
          firstName,
          lastName,
          emailId,
          membershipType: membershipType,
        },
      });
      //  save it to database

      const payment = new Payment({
        userId: req.user._id,
        orderId: order.id,
        status: order.status,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        notes: order.notes,
      });

      const savePayment = await payment.save();

      //return back my details to frontend

      res.json({ ...savePayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
})




module.exports = paymentRouter










