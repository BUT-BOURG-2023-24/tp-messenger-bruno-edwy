import { Mongoose } from 'mongoose';
import Conversation, {IConversation}  from '../database/Mongo/Models/ConversationModel'
import Message, {IMessage} from '../database/Mongo/Models/MessageModel'
const ConversationDatabase = require('../database/Mongo/controllers/conversationDatabaseController');
const MessageDatabase = require('../database/Mongo/controllers/messageDatabaseController');
const UserDatabase = require('../database/Mongo/controllers/userDataBaseController');
import { Request, Response } from 'express';
import { MongooseID } from '../types';
import { IUser } from '../database/Mongo/Models/UserModel';

async function getAllConversationsForUser(req: Request, res: Response) {
    try {
        const user: MongooseID = req.app.locals.userId;
        const conversations: IConversation[] = await ConversationDatabase.getAllConversationsForUser(user);
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).send({ message: error});
    }
}

async function createConversation(req: Request, res: Response) {
    try {          
        const tabMessages: IMessage[] = [];
        let tabParticipants: MongooseID[] = req.body.concernedUsersIds;
        tabParticipants.push(req.app.locals.userId);

        let titre: String = "";

        const listeParticipants: IUser[] | null = await UserDatabase.getUsersByIdsDatabase(tabParticipants);
        if (listeParticipants !== null){
            await Promise.all(listeParticipants.map(async (listeParticipant) => {
                titre += listeParticipant.username + ', ';
                console.log(titre);
            }));
        }

        const newConversation = new Conversation({
            participants: tabParticipants,
            messages: tabMessages,
            title: titre,
            lastUpdate: new Date().toISOString(),
            seen: new Map()
        });
    
        const savedConversation: IConversation = await ConversationDatabase.createConversation(newConversation)
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error)
    }
}

async function addMessageToConversation(req: Request, res: Response){
    try {
        const newMessage: IMessage | null = await MessageDatabase.createMessage(req.params.id, req.body.content, req.app.locals.userId);
        const conversation: IConversation | null = await ConversationDatabase.addMessageToConversation(req.params.id, newMessage);

        if (conversation === null) {
            return res.status(404).json({ message: 'Conversation Id not found.' });
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
    getAllConversationsForUser,
    createConversation,
    addMessageToConversation,
    deleteConversation,
};