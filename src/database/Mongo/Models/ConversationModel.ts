import mongoose, { Schema, Document } from "mongoose";
import { MongooseID } from "../../../types";

export interface IConversation extends Document {
	participants:MongooseID[],
	messages:String[],
	title:String,
	lastUpdate:Date,
	seen: Map<MongooseID, MongooseID>,
}

const conversationSchema: Schema<IConversation> = new Schema<IConversation>({
	participants:
	[{
		type: String,
		required: true
	}],
	messages:
	[{
		type: String,
		required: true
	}],
	title:
	{
		type: String,
		required: true
	},
	lastUpdate:
	{
		type: Date,
		required: true
	},
	seen:
	{
		type: Map,
		of: Schema.ObjectId,
		required: true,
	}
});

const ConversationModel = mongoose.model<IConversation>("Conversation", conversationSchema);

export default ConversationModel;