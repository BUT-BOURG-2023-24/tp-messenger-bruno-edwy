const mongoose = require("mongoose");
import User, { IUser } from "../database/Mongo/Models/UserModel";
import { Request, Response } from "express";
import MongoUserDatabase from "../database/Mongo/controllers/userDataBaseController";
const picture = require("../pictures");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

	
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
        const secretKey = 'deft'; // Remplacez par votre clé secrète JWT

        // const message = 'User created successfully.';
        const user = await MongoUserDatabase.getUserByNameDatabase(req.body.username)
        
        if (user !== null){
            // console.log(await MongoUserDatabase.getUserByNameDatabase(req.body.username));
            // let user = await MongoUserDatabase.getUserByNameDatabase(req.body.username)
            // console.log(user);
            const userId = user?.id;
            const token = jwt.sign({userId}, secretKey, { expiresIn: '1h' }); // 1h d'expiration, ajustez selon vos besoins
            console.log(token);
            if(await bcrypt.compare(req.body.password, user.password)){
                res.status(200).json({isNewUser: false, user: user, token: token});
            }else{
                res.status(401).json({error: "username ou password incorrects"})
            } 
        } else{
            const obj = new User({
      
                username: req.body.username,
                password: await bcrypt.hash(req.body.password, 5),
                profilePicId: picture.pickRandom()
              
            });
            await MongoUserDatabase.createUserDatabase(obj);
            let user = await MongoUserDatabase.getUserByNameDatabase(req.body.username)
            console.log(user);
            const userId = user?.id;
            const token = jwt.sign({userId}, secretKey, { expiresIn: '1h' }); // 1h d'expiration, ajustez selon vos besoins
            console.log(token);
            // res.status(200).json({ message });
            res.status(200).json({ isNewUser: true, user: user, token: token });
        } 
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
      
};

	
async function getUserByName(req: Request, res: Response) {
	
    try {
      
      const user: IUser | null  = await MongoUserDatabase.getUserByNameDatabase(req.body.name);
      res.status(200).json(user);
      
    } catch (error) {
      res.status(500).json({ message: error }); 
    }
      
};

async function getUserById(req: Request, res: Response){

    try {
      
        const user: IUser | null  = await MongoUserDatabase.getUserByIdDatabase(req.body.id); 
        res.status(200).json(user);
        
      } catch (error) {
        res.status(500).json({ message: error });
      }
}

async function getUsersByIds(req: Request, res: Response){
    try {
      
        const user: IUser[] | null  = await MongoUserDatabase.getUsersByIdsDatabase(req.body.ids); 
        res.status(200).json(user);
        
      } catch (error) {
        res.status(500).json({ message: error });
      }
}

function online(){
    
}

async function createUser(username: string, password: string){
    try {
        
        const obj = new User({
      
            username: username,
            password: await bcrypt.hash(password, 5),
            profilePicId: picture.pickRandom()
          
        });
        await MongoUserDatabase.createUserDatabase(obj);
        
    } catch (error) {
        return error;;
    }
}

module.exports = {login, getUserByName, getUserById, getUsersByIds, online, createUser};
