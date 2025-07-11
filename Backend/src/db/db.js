import mongoose from "mongoose"
import {DB_Name} from "../constants.js"
const db_connect = async ()=>{

    try {
      const connectionInstance =  await mongoose.connect(`${process.env.DB_URL}/${DB_Name}`);
      
      console.log(`\n db connection successfull !!!`);
      await console.log(connectionInstance.connection.host);
      
      
      
        
    } catch (error) {
        console.log("Error in connect: ", error);
        process.exit(1)
    }
}

export default db_connect