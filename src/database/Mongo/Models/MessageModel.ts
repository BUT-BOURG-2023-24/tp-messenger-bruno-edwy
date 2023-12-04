import mongoose, { Schema, Document } from "mongoose";
import { MongooseID } from "../../../types";

export interface IMessage extends Document {
	conversationId:MongooseID,
	from:MongooseID,
	content:String,
	postedAt:Date,
	replyTo:String,
	edited:boolean,
	deleted:boolean,
	reactions:Map<String, String>,
}

const MessageSchema: Schema<IMessage> = new Schema<IMessage>({
	conversationId:
	{
		type: Schema.ObjectId,
		ref: "Conversation",
		required: true,
	},
	from:
	{
		type: String,
		required: true,
	},
	content:
	{
		type: String,
		required: true
	},
	postedAt:
	{
		type: Date,
		required: true
	},
	replyTo:
	{
		type: String,
		default: null
	},
	edited:
	{
		type: Boolean,
		default: false
	},
	deleted:
	{
		type: Boolean,
		default: false
	},
	reactions:
	{
		type: Map,
		of: String,
		enum: ["HAPPY", "SAD", "THUMBSUP", "THUMPSDOWN", "LOVE"]
	}
});

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
