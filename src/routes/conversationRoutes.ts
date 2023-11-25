const express = require('express');
const router = express.Router();

const conversationController = require('../controller/conversationController');

router.get('/', conversationController.getAllConversationsForUser)
router.post('/', conversationController.createConversation)
router.delete('/:id', conversationController.deleteConversation)

export default router;