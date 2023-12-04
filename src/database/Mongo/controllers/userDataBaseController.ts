import { MongooseID } from "../../../types";
import User, {IUser}  from "../Models/UserModel";
const bcrypt = require('bcrypt');

async function createUserDatabase (user :IUser) {
    try {
        // console.log(user.password)
        // let hash: string = await bcrypt.hash(user.password, 5);
        // user.password = hash;
        await User.insertMany(user);
    } catch (error) {
        throw error;
    }
    
    // await if(User.findOne({})){
    //     User.insertMany(user);
    // }
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

async function getUsersByIdsDatabase(ids: MongooseID[]) {
    try {
        const users = await User.find({ _id: { $in: ids } });

        return users;
    } catch (error) {
        return error;
    }
} 

module.exports = {
    createUserDatabase, 
    getUserByNameDatabase,
    getUserByIdDatabase, 
    getUsersByIdsDatabase
};