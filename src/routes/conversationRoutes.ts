const express = require('express');
const router = express.Router();

const conversationController = require('../controller/conversationController');

router.post('/', conversationController.createConversation);
//router.post('conversation/login', conversationController.login);
router.get('/a', conversationController.getConversationWithParticipants);

export default router;