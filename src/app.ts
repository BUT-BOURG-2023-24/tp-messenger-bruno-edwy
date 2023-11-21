import * as http from "http";
import express from "express";
import { Server } from "socket.io";
import { Database } from "./database/database";
import { SocketController } from "./socket/socketController";
import ConversationModel from "./database/Mongo/Models/ConversationModel";
import conversationRoutes from "./routes/conversationRoutes"

const app = express();

function makeApp(database: Database) 
{
	app.locals.database = database;

	const server = http.createServer(app);
	app.use(express.json());
	app.use('/conversations', conversationRoutes);

	const io = new Server(server, { cors: { origin: "*" } });
	let socketController = new SocketController(io, database);

	app.locals.socketController = socketController;

	return { app, server };
}

export { makeApp };
