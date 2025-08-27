import { User } from "./models/User.js"

export const authenticateUser = async (req, res, next) => {
  console.log("auth user")
  try {
    const user = await User.findOne({
      accessToken: req.header("Authorization"),
    })
    if (user) {
      req.user = user
      next();
    } else {
      res.status(401).json({
        message: "Authentication missing or invalid",
        loggedOut: true,
      })
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error", error: err.message
    })
  }
}

