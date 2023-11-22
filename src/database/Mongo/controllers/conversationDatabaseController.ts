import { MongooseID } from '../../../types';
import Conversation, {IConversation}  from '../Models/ConversationModel'

async function getConversationWithParticipants (participants: MongooseID[]) {
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
    try {
        const conversations: IConversation[] = await Conversation.find({" particicpants": particicpant});
        return conversations;
    } catch (error) {
        return error;
    }
}

async function getConversationById(idConversation: MongooseID){
    try {
        const conversation: IConversation | null = await Conversation.findById(idConversation);

        if (conversation === null) {
            return 'Id not found.';
        } 

        return conversation;
    } catch (error) {
        return error;
    }
}

async function createConversation(conversation: IConversation) {
    try {
        const savedConversation: IConversation = await conversation.save();
        return savedConversation;
    } catch (error) {
        return error;
    }
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

async function deleteConversation(idConversation: MongooseID){
    try {
        const conversation: IConversation | null = await Conversation.findByIdAndDelete(idConversation);

        if (conversation === null) {
            return 'Id not found.';
        }  

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