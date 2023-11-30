import { Mongoose } from 'mongoose';
import { MongooseID } from '../../../types';
import Message, {IMessage}  from '../Models/MessageModel'

async function createMessage(idConversation: MongooseID, content : String){

    const newMessage: IMessage  = new Message({
        conversationId : idConversation,
        from: idConversation, //à modifier
        content: content,
        postedAt: new Date().toISOString(),
        edited: false,
        deleted: false,
    });

    try {
        const savedMessage: IMessage = await newMessage.save();
        return savedMessage
    } catch (error) {
        return error
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
    getMessageById
};