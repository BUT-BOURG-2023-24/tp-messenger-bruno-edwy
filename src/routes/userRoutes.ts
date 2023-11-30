const express = require('express');
const router = express.Router();

const userController = require('../controller/userRouteController');

// router.post('/users/signup', userController.createUser);
// router.post('/users/login', userController.login);
// router.get('/users/:id', userController.getUserById);

router.post('/users/signup', function(){
    userController.createUser
  });


module.exports = router;