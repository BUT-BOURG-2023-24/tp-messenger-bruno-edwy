import { Mongoose } from 'mongoose';
import Conversation, {IConversation}  from '../database/Mongo/Models/ConversationModel'
import Message, {IMessage} from '../database/Mongo/Models/MessageModel'
const ConversationDatabase = require('../database/Mongo/controllers/conversationDatabaseController');
const MessageDatabase = require('../database/Mongo/controllers/messageDatabaseController');
import { Request, Response } from 'express';
import { MongooseID } from '../types';

// revoir les fonctions à exporter (faire shéma de la requete http) 

async function getConversationWithParticipants (req: Request, res: Response) {
    try {
        const particicpants: MongooseID[] = req.body; 
        const conversations: IConversation[]  = await ConversationDatabase.getConversationWithParticipants(particicpants);
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).send({ message: error});
    }
}

async function getAllConversationsForUser(req: Request, res: Response) {
    try {
        const user: MongooseID = req.body.user;
        const conversations: IConversation[] = await ConversationDatabase.getAllConversationsForUser(user);
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).send({ message: error});
    }
}

async function getConversationById(req: Request, res: Response){
    try {
        const conversation: IConversation | null = await Conversation.findById(req.params.id);

        if (conversation === null) {
            return res.status(404).json({ message: 'Id not found.' });
        } 

        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).send({ message: error});
    }
}

async function createConversation(req: Request, res: Response) {
     const newConversation = new Conversation({
        participants: req.body.concernedUsersIds,
        messages: null,
        title: "nouvelle Conversation",
        lastUpdate: new Date().toISOString(),
        seen: new Map()
    });
    try {
        const savedConversation: IConversation = await ConversationDatabase.createConversation(newConversation)
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error)
    }
}

async function addMessageToConversation(req: Request, res: Response){
    try {
        const newMessage: IMessage | null = await MessageDatabase.createMessage(req.params.id, req.body.content);
        const conversation: IConversation | null = await ConversationDatabase.addMessageToConversation(req.params.id, newMessage);

        if (conversation === null) {
            return res.status(404).json({ message: 'Conversation Id not found.' });
        } 

        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

async function setConversationSeenForUserAndMessage(req: Request, res: Response){
    try {
        const update: Partial<IConversation> = {seen: req.body.seen};
        const conversation: IConversation | null = await Conversation.findByIdAndUpdate(req.params.id, update);
        
        if (conversation === null) {
            return res.status(404).json({ message: 'Id not found.' });
        } 

        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

async function deleteConversation(req: Request, res: Response){
    try {
        const newConversation: IConversation | null = await ConversationDatabase.getConversationById(req.params.id);

        if (newConversation === null) {
            return res.status(404).json({ message: 'Id not found.' });
        }  

        const deletedConversation: IConversation | null = await ConversationDatabase.deleteConversation(newConversation);

        res.status(200).json(deletedConversation);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports = {
    getConversationWithParticipants,
    getAllConversationsForUser,
    getConversationById,
    createConversation,
    addMessageToConversation,
    setConversationSeenForUserAndMessage,
    deleteConversation,
};

// création conversation (users de la conv body), récupération conversations (id user de la requete), suppression d'une conversation (id URL)
//, vue conversation, nouveau message dans une conversation
/* createConversation(req: Request, res: Response), getconversations(req: Request, res: response), deleteConversation(req: Request, res: Response) 
viewConversations, addMessage()*/