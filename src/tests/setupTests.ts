require("ts-node/register");
import http from "http";
import supertest from "supertest";
import { Express } from "express";
import mongoose from "mongoose";
import Database from "../database/database";
import { makeApp } from "../app";
import { IUser } from "../database/Mongo/Models/UserModel";
const userRouteController = require("../controller/userRouteController")

interface SetupResult {
	server: http.Server,
	app: Express,
	userToken: string;
	user: IUser;
}

async function setup(): Promise<SetupResult> 
{
	let database = new Database(true);

	await database.connect();

	/*
		On veut supprimer toutes les collections de la base de données de test
		avant de commencer les tests.

		Pour récupérer toutes les collections, on peut utiliser:
		await mongoose.connection.db.collections();

		Pour supprimer une collection, on peut faire :
		await collection.deleteMany({});
	*/

	const collections = await mongoose.connection.db.collections();
	for (const collection of collections) {
		await collection.deleteMany({});
	}

	/*
		Nous voulons créer au moins 2 utilisateurs pour pouvoir 
		créer une conversation a 2 participants. 

		On peut faire appel aux fonctions de la BDD pour créer 2 utilisateurs.
	*/

	let { app, server } = makeApp(database);
	
	const user1 = await userRouteController.createUser("test1", "testpwd1");
  	const user2 = await userRouteController.createUser("test2", "testpwd2");

	let res = await supertest(app)
		.post("/users/login")
		.send({ username: "test1", password: "testpwd1" });

		const userToken = res.body.token;
		const user: IUser = user1;
	  

	/*
		Pour se faciliter la tâche, nous allons également connecter directement
		un utilisateur pour les tests. 

		Nous voulons conserver le retour de la requête login, qui contient 
		l'utilisateur mais aussi le token.

		Il faudra retourner ces valeurs là, avec l'app & le server. 
	*/

	// let userToken: string = token;
	// let user: IUser = user;

	return {
		app,
		server,
		userToken,
		user
	};
}

async function teardown()
{
	await mongoose.disconnect();
}

export { setup, teardown };
