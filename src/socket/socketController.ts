import type { Database } from "../database/database";
import { Server } from "socket.io";
const ConversationDatabase = require('../database/Mongo/controllers/conversationDatabaseController');
import { IConversation } from "../database/Mongo/Models/ConversationModel"; 

export class SocketController
{
	/*
		Pour savoir si un utilisateur est connecté depuis la route /online,
		Nous devons stocker une correspondance socketId <=> userId.
	*/

	constructor(private io:Server, private Database:Database)
	{
		this.connect();
		this.listenRoomChanged();
	}

	connect()
	{
		this.io.on("connection", (socket) => {
			// Récupérer les infos voulu depuis les extra headers.
			// socket.handshake.headers contient ce que vous voulez. 

			/*
				Dès qu'un socket utilisateur arrive, on veut l'ajouter à la room
				pour chaque conversation dans laquelle il se trouve. 

				ETAPE 1: 
					Trouver toutes les conversations ou participe l'utilisateur. 

				ETAPE 2:
					Rejoindre chaque room ayant pour nom l'ID de la conversation. 

				HINT:
					socket.join(roomName: string) permet de rejoindre une room.
					Le paramètre roomName doit absolument être de type string,
					si vous mettez un type number, cela ne fonctionnera pas.
			*/

            const userId = socket.handshake.headers.userid;

            const userConversations = ConversationDatabase.getAllConversationsForUser(userId);
			console.log(userConversations);
            userConversations.forEach((conversation: IConversation) => {
                const roomName = conversation.id.toString();
                socket.join(roomName);
            });

            // Envoyer l'événement onConnected à tout le monde sauf le socket en question
            const onConnectedEvent = {
                userId: userId,
            };
            socket.broadcast.emit("@onConnected", onConnectedEvent);

            // Gérer la déconnexion
            socket.on("disconnect", () => {
                // Envoyer l'événement onDisconnected à tout le monde sauf le socket en question
                const onDisconnectedEvent = {
                    userId: userId,
                };
                socket.broadcast.emit("@onDisconnected", onDisconnectedEvent);
            });

		});
	}

	// Cette fonction vous sert juste de debug.
	// Elle permet de log l'informations pour chaque changement d'une room. 
	listenRoomChanged()
	{
		this.io.of("/").adapter.on("create-room", (room) => {
			console.log(`room ${room} was created`);
		});

		this.io.of("/").adapter.on("join-room", (room, id) => {
			console.log(`socket ${id} has joined room ${room}`);
		});

		this.io.of("/").adapter.on("leave-room", (room, id) => {
			console.log(`socket ${id} has leave room ${room}`);
		});

		this.io.of("/").adapter.on("delete-room", (room) => {
			console.log(`room ${room} was deleted`);
		});

		 // test
		 this.io.of("/").adapter.on("connect", (socket) => {
			console.log(`socket ${socket.id} connected`);
		});
	
		this.io.of("/").adapter.on("disconnect", (socket) => {
			console.log(`socket ${socket.id} disconnected`);
		});
	}
}

