import { User } from './models/User';

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Authentication missing or invalid',
        loggedOut: true,
      });
    }
    const token = authHeader.replace('Bearer ', '');
    const user = await User.findOne({ accessToken: token });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({
        message: 'Authentication missing or invalid',
        loggedOut: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    });
  }
};
