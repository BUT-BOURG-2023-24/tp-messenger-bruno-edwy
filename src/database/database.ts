import config from "../config";
const mongoose = require('mongoose');

class Database 
{
	fromTest: boolean;

	constructor(fromTest: boolean) 
	{
		this.fromTest = fromTest;
	}
	
	async connect()
	{
		mongoose.connect(config.DB_ADDRESS)
        .then(() => { console.log('Connected to DB!') })
        .catch((error: any) => {
            console.log("error while connecting to DB", error)
        });
	}
}

export default Database;
export type { Database };
