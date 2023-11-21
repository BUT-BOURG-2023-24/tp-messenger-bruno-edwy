import Message, {IMessage}  from '../database/Mongo/Models/MessageModel'
import { Request, Response } from 'express';


async function createMessage(req: Request, res: Response){
    const newMessage = new Message({
        conversationId:  req.body.idConversation,
        from: req.body.idUser,
        content: req.body.content,
        postedAt: req.body.postedAt,
        replyTo: req.body.replyTo,
        edited: req.body.edited,
        deleted: req.body.deleted,
        reactions: req.body.reactions
    });

    try {
        const savedMessage: IMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json({message: error})
    }
}

async function editMessage(){

}

async function deleteMessage(){

}

async function reactToMessage(){

}

async function getMessageById(){

}

module.exports = {
    createMessage,
    editMessage,
    deleteMessage,
    reactToMessage,
    getMessageById,
}
