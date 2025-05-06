import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser" // to acess users browser cookies and perform crud on them with my server

const app = express();
const dataLimit = "20kb"
app.use(cors({
    origin:process.env.CORS_ORIGIN, //allowing from where our backend should be available
    credentials: true
}))

// express configurations
// app.use(middlewareFunction); to set middleware

app.use(express.json({limit:dataLimit}))
app.use(express.urlencoded({extended:true, limit:dataLimit})) //to get data from url we have to configure url encoder
app.use(express.static("public")) // to store some files or folder for public like pdf favicon images etc
app.use(cookieParser())

export default app;