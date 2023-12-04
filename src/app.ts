import * as http from "http";
import express from "express";
import { Server } from "socket.io";
import { Database } from "./database/database";
import { SocketController } from "./socket/socketController";
import conversationRoutes from "./routes/conversationRoutes"

import authMiddleware from './middleware/authMiddleware';
import joiValidator from "./middleware/joiValidator";

const app = express();

function makeApp(database: Database) 
{
	app.locals.database = database;

	
	app.locals.database.connect();

	const server = http.createServer(app);

	app.use(express.json());
	app.use('/conversations', authMiddleware)
	app.use('/conversations', conversationRoutes);

	const userRoutes = require('./routes/userRoutes');

	// app.use('/users', authMiddleware); // Appliquer le middleware à toutes les routes sous /users
	app.use('/users', userRoutes); // Utiliser le fichier de routes

	app.use(joiValidator);
	
	const io = new Server(server, { cors: { origin: "*" } });
	let socketController = new SocketController(io, database);

	app.locals.socketController = socketController;

	return { app, server };
}

export { makeApp };
