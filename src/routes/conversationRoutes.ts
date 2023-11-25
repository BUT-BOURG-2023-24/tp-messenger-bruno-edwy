const express = require('express');
const router = express.Router();

const conversationController = require('../controller/conversationRouteController');

router.get('/test', conversationController.getAllConversationsForUser)
router.post('/', conversationController.createConversation)
router.delete('/:id', conversationController.deleteConversation)

export default router;