import express from 'express';

import { authenticateUser } from "../authMiddleware"
import { Subscription } from '../models/Subscription_temp';

const router = express.Router();

//To get all subscriptions
router.get("/", async (req, res) => {
  
  try{
    const subscriptions = await Subscription.find({})

    if(!subscriptions || subscriptions.length === 0){
      return res.status(404).json({
        success: false,
        response: null,
        message: "No subscription was found",
      })
    }

    res.status(200).json({
      success: true,
      response: subscriptions,
    })
  } catch (error){
    res.status(500).json({
      success: false,
      response: error,
      message: "Failed to fetch subscription"
    })
  }
});

//To get one subscription based on id (endpoint is /subscriptions/:id)
router.get("/:id", async (req, res) => {
  const { id } = req.params
  
  try {
    const subscription = await Subscription.findById(id)

    if (!subscription) {
      return res.status(404).json({
        success: false,
        response: null,
        message: "Subscription not found"
      })
    }

    res.status(200).json({
      success: true,
      response: subscription
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Subscription couldn't be found"
    })
  }
})

//To create/save a subscription to the db (endpoint is /subscriptions)
router.post("/", authenticateUser, async (req, res) => {
  const { name, cost, freeTrial, expirationDate, status, createdAt } = req.body  

  if(!req.user) {
    return res.status(403).json({ error: "You must be logged in to add a subscription" })
  } 

  try {
    const newSubscription = await new Subscription({ 
      name, 
      cost, 
      freeTrial, 
      expirationDate, 
      status, 
      createdAt,
      user: req.user._id,
     }).save()

    res.status(201).json({
      success: true,
      response: newSubscription,
      message: "Subscription created successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error, 
      message: "Couldn't create subscription"
    })
  }
})

//To edit a subscription (endpoint is /subscriptions/:id)
router.patch("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params
  const { name, cost, freeTrial, expirationDate, status } = req.body

  try {
    const editSubscription = await Subscription.findByIdAndUpdate(id, { name: name, cost: cost, freeTrial: freeTrial, expirationDate: expirationDate, status: status },
      { new: true, runValidators: true })
    if (!editSubscription) {
      return res.status(404).json({ error: "Subscription not found" })
    }
    res.status(201).json(editSubscription)
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Failed to fetch subscription"
    })
  }
})

export default router; 