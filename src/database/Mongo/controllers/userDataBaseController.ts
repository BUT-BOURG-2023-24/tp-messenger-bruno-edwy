import User, {IUser}  from "../Models/UserModel";

async function createUserDatabase (user :IUser) {
    await User.insertMany(user);
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