import { Mongoose } from 'mongoose';
import Conversation, {IConversation}  from '../database/Mongo/Models/ConversationModel'
import * as ConversationControler from '../database/Mongo/controllers/conversationDatabaseController'
import { Request, Response } from 'express';
import { MongooseID } from '../types';

// revoir les fonctions à exporter (faire shéma de la requete http) 

async function getConversationWithParticipants (req: Request, res: Response) {
    try {
        //participants: MongooseID[];
        const particicpants: MongooseID[] = req.body; 
        const conversations: IConversation[]  = await ConversationControler.getConversationWithParticipants(particicpants);
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).send({ message: error});
    }
}

async function getAllConversationsForUser(req: Request, res: Response) {
    try {
        const conversations: IConversation[] = await Conversation.find({" particicpants": req.body});
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
        participants: req.body.particicpants,
        messages: req.body.messages,
        title: req.body.title,
        lastUpdate: req.body.lastUpdate,
        seen: req.body.seen
    });

    try {
        const savedConversation: IConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json({message: error})
    }
}

async function addMessageToConversation(req: Request, res: Response){
    try {
        const update: Partial<IConversation> = {messages: req.body.messages};
        const conversation: IConversation | null = await Conversation.findByIdAndUpdate(req.params.id, update);
        
        if (conversation === null) {
            return res.status(404).json({ message: 'Id not found.' });
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
        const conversation: IConversation | null = await Conversation.findByIdAndDelete(req.params.id);

        if (conversation === null) {
            return res.status(404).json({ message: 'Id not found.' });
        }  

        res.status(200).json(conversation);
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