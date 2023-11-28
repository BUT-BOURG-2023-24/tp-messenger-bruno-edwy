const express = require('express');
const router = express.Router();

const conversationController = require('../controller/conversationRouteController');

router.get('/', conversationController.getAllConversationsForUser)
router.post('/', conversationController.createConversation)
router.delete('/:id', conversationController.deleteConversation)
router.post('/:id', conversationController.addMessageToConversation)

export default router;