import { MongooseID } from "../../../types";
import User, {IUser}  from "../Models/UserModel";

async function createUserDatabase (user :IUser) {
    try {
        await User.insertMany(user);
    } catch (error) {
        return error;
    }
}

async function getUserByNameDatabase(name:string) {
    try {
        const user = await User.findOne({"username": name});
        return user;
    } catch (error) {
        return null;
    }
}

async function getUserByIdDatabase(id: MongooseID){
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        return null;
    }
}

async function getUsersByIdsDatabase(ids: MongooseID[]){
    try {
        const users = User.find({ _id: { $in: ids } });
        return users;
    } catch (error) {
        return null;
    }
} 

export default {createUserDatabase, getUserByNameDatabase, getUserByIdDatabase, getUsersByIdsDatabase};