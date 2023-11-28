import { MongooseID } from '../../../types';
import Conversation, {IMessage}  from '../Models/MessageModel'

async function createMessage(newMessage: IMessage){
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