const mongoose = require("mongoose");
import User, { IUser } from "../database/Mongo/Models/UserModel";
import { Request, Response } from "express"; 

	
async function createUser(req: Request, res: Response) {
	
    const obj = new User({
      
      username: req.body.username,
      password: req.body.password,
      profilePicId: req.body.profilePicId
      
    });
      
   
      
    try {
      
      const savedObj: IUser = await obj.save();
      
   
      
      res.status(200).json(savedObj);
      
    } catch (error) {
      
      res.status(500).json({ message: error });
      
    }
      
};

	
async function getUserByName(req: Request, res: Response) {
	
    try {
      
      const user: IUser | null  = await User.findOne({username: req.body.username});
      
      // You can use findById, findOne({ name: 'name' }), etc. as needed
      
   
      
      res.status(200).json(user);
      
    } catch (error) {
      
      res.status(500).json({ message: error });
      
    }
      
};

function getUserById(req: Request, res: Response){

    User.findById(req.params.id, (err :any, user :any) => {
        if(err){
            res.send(err);
        }
        res.json(user);
    });

}

function getUsersByIds(req: Request, res: Response){

    User.find({
        '_id': { $in: [
            req.body.ids
        ]}
    }, function(err: any, users :any[]){
        console.log(users);
    });

}

module.exports = {createUser, getUserByName, getUserById, getUsersByIds};
