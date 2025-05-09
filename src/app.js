import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser" // to acess users browser cookies and perform crud on them with my server

const app = express();
const dataLimit = "20kb"
app.use(cors({
    origin:process.env.CORS_ORIGIN, //allowing your url like request sould be from vercel or where it is deployed
    credentials: true
}))

// express configurations
// app.use(middlewareFunction); to set middleware

app.use(express.json({limit:dataLimit}))
app.use(express.urlencoded({extended:true, limit:dataLimit})) //to get data from url we have to configure url encoder
app.use(express.static("public")) // to store some files or folder for public like pdf favicon images etc
app.use(cookieParser()) //used to access and set cookies for user browser

export default app;