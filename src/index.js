
/*
import mongoose from "mongoose"
import {DB_Name} from "./constants.js"
import express from "express"
import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
})

const app = express()
const port= process.env.PORT || 8000
;(async ()=>{

    try{
        await mongoose.connect(`${process.env.DB_URL}/${DB_Name}`)
        console.log("working");
        
        app.on("err",(err)=>{
            console.log("ERR in try: ", err);
            
        })

        app.listen(port,()=>{
            console.log("Port is: ", port );
            
        })

    }
    catch(err){
      console.log("ERROR in DB CONNECT: ", err);
    }
    
})()

*/
    


import dotenv from 'dotenv';
import db_connect from "./db/db.js";
import app from "./app.js"
dotenv.config({
    path:"./.env"
});
const port = process.env.PORT || 8000

db_connect()
.then(()=>{
    app.listen( port,()=>{
        console.log("Port is running on: ", port);
        
    })
})
.catch((error)=>{
    console.log("Error in connection:", error);
    
})