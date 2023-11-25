import * as http from "http";
import express from "express";
import { Server } from "socket.io";
import { Database } from "./database/database";
import { SocketController } from "./socket/socketController";
import conversationRoutes from "./routes/conversationRoutes"

const app = express();

function makeApp(database: Database) 
{
	app.locals.database = database;

	
	app.locals.database.connect();

	const server = http.createServer(app);
	app.use(express.json());
	app.use('/conversations', conversationRoutes);

	const userRoutes = require('./routes/userRoutes');
	app.use('/users', userRoutes);

	const io = new Server(server, { cors: { origin: "*" } });
	let socketController = new SocketController(io, database);

	app.locals.socketController = socketController;

	return { app, server };
}

export { makeApp };
