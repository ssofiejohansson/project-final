import bcrypt from "bcrypt"
import express, { response } from 'express';

import { Subscription } from '../models/Subscription_temp';

const router = express.Router();

router.get("/", async (req, res) => {
  //res.send('Subscription route works!');

  const { _id } = req.params

  try{
    const subscription = await Subscription.find(_id)

    if(!_id){
      return res.status(404).json({
        success: false,
        response: null,
        message: "No matching subscription was found",
      })
    }

    res.status(200).json({
      success: true,
      response: _id,
    })
  } catch (error){
    res.status(500).json({
      success: false,
      response: error,
      message: "Failed to fetch subscription"
    })
  }
});

router.post("/", (req,res) => {

})

export default router; 