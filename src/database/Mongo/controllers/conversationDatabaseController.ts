import { checkPreferences } from 'joi';
import { MongooseID } from '../../../types';
import Conversation, {IConversation}  from '../Models/ConversationModel'
import Message, {IMessage}  from '../Models/MessageModel'
import { UpdateQuery } from 'mongoose'

async function getConversationWithParticipants(participants: MongooseID[]){
    try {
        const conversation: IConversation  | null = await Conversation.findOne({"participants": {"$size" : participants.length, "$all": participants}});

        if (conversation === null) {
            return []; // Return an empty array if conversation is not found
        }

        return [conversation]; // Wrap the single conversation in an array
    } catch (error) {
        return []; // Handle errors by returning an empty array or handle accordingly
    }
}

async function getAllConversationsForUser(participant: MongooseID) {
    try {
        const conversations: IConversation[] = await Conversation.find({"participants": participant});
        return conversations;
    } catch (error) {
        return error;
    }
}

async function getConversationById(idConversation: MongooseID){
    try {
        const conversation: IConversation | null = await Conversation.findById(idConversation);

        return conversation;
    } catch (error) {
        return error;
    }
}

async function createConversation(conversation: IConversation ) {
    try {
        const savedConversation: IConversation = await conversation.save();
        return savedConversation;
    } catch (error) {
        return error;
    }
}

async function addMessageToConversation(idConversation: MongooseID ,message: IMessage){
    try {
        const update: UpdateQuery<IConversation> = { $push: { messages: message } };
        const conversation: IConversation | null = await Conversation.findByIdAndUpdate(idConversation, update, { new: true });

        return conversation;
    } catch (error) {
        return error;
    }
}

async function setConversationSeenForUserAndMessage(idConversation: MongooseID ,seens: Map<MongooseID, MongooseID>){
    try {
        const update: Partial<IConversation> = {seen: seens};
        const conversation: IConversation | null = await Conversation.findByIdAndUpdate(idConversation, update);
        
        if (conversation === null) {
            return 'Id not found.';
        } 

        return conversation;
    } catch (error) {
        return  error;
    }
}

async function deleteConversation(conversation : IConversation){
    try {
        const deletedConversation: IConversation | null = await Conversation.findByIdAndDelete(conversation);

       /* if (conversation === null) {
            return 'Id not found.';
        }  */

        return conversation;
    } catch (error) {
        return  error;
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