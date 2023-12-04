import config from "../config";
const mongoose = require('mongoose');
import * as conversationDataBaseController from './Mongo/controllers/conversationDatabaseController'

class Database 
{
	fromTest: boolean;

	constructor(fromTest: boolean) 
	{
		this.fromTest = fromTest;
	}
	
	async connect()
	{
		await mongoose.connect(config.DB_ADDRESS_TEST)
        .then(() => { console.log('Connected to DB!') })
        .catch((error: any) => {
            console.log("error while connecting to DB", error)
        });
	}

}

export default Database ;
export type { Database };
