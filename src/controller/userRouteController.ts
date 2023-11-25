const mongoose = require("mongoose");
import User, { IUser } from "../database/Mongo/Models/UserModel";
import { Request, Response } from "express";
import MongoUserDatabase from "../database/Mongo/controllers/userDataBaseController";

	
async function login(req: Request, res: Response) {
	
    // const obj = new User({
      
    //   username: req.body.username,
    //   password: req.body.password,
    //   profilePicId: req.body.profilePicId
      
    // });
      
   
      
    // try {
      
    //   // const savedObj: IUser = await obj.save();
      
   
    //   // return res.status(200).json(savedObj);
    //   return res.status(200).json({message: "coucou"});
      
    // } catch (error) {
      
    //   return res.status(500).json({ message: error });
        
    // }

    try {
        // Your logic to create a user goes here

        // Assuming user creation was successful
        const obj = new User({
      
          username: req.body.username,
          password: req.body.password,
          profilePicId: req.body.profilePicId
        
        });
        const message = 'User created successfully.';
        if (await MongoUserDatabase.getUserByNameDatabase(req.body.username) !== null){
            // console.log(await MongoUserDatabase.getUserByNameDatabase(req.body.username));
            let user = MongoUserDatabase.getUserByNameDatabase(req.body.username)
            res.status(200).json({message: "utilisateur existe déjà", user: user});
        } else{
            MongoUserDatabase.createUserDatabase(obj);
            let user = MongoUserDatabase.getUserByNameDatabase(req.body.username)
            // res.status(200).json({ message });
            res.status(200).json({ user: user });
        } 
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
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

module.exports = {login, getUserByName, getUserById, getUsersByIds};
