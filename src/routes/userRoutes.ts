const express = require('express');
const router = express.Router();
import joiValidator from '../middleware/joiValidator';

const userRouteController = require('../controller/userRouteController');

// router.post('/users/signup', userController.createUser);
// router.post('/users/login', userController.login);
// router.get('/users/:id', userController.getUserById);

router.post('/login', async (req: Request, res: Response) => {
  await userRouteController.login(req, res);
});

router.get('/online', async () => {
  await userRouteController.online();
});

router.get('/test', joiValidator, async (req: Request, res: Response) => {
  await userRouteController.getUsersByIds(req, res);
});

module.exports = router;