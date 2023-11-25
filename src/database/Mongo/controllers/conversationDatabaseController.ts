import { MongooseID } from '../../../types';
import Conversation, {IConversation}  from '../Models/ConversationModel'

async function getConversationWithParticipants(participants: MongooseID[]){
    try {
        const conversation: IConversation  | null = await Conversation.findOne({"participants": {"$size" : participants.length, "$all": participants}});

        if (conversation === null) {
            return 'Id not found.';
        } 

        return conversation;
    } catch (error) {
        return error;
    }
}

async function getAllConversationsForUser(particicpant: MongooseID) {
    
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
   
}

async function addMessageToConversation(idConversation: MongooseID ,messages: string[]){
    try {
        const update: Partial<IConversation> = {messages: messages};
        const conversation: IConversation | null = await Conversation.findByIdAndUpdate(idConversation, update);
        
        if (conversation === null) {
            return 'Id not found.';
        } 

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