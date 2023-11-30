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

// module.exports = { createUserDatabase };
export default {createUserDatabase, getUserByNameDatabase};