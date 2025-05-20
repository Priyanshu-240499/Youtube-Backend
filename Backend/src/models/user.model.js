import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required: true,
        unique: true, 
        trim: true,
        lowercase: true,
        index: true,
        
    },
    password:{
        type:String,
        required: [true,"Password is required"],
        trim: true,
     
        
    },
    email:{
        type:String,
        required: true,
        unique: true, 
        trim: true,
        lowercase: true,
              
    },
    fullName:{
        type:String,
        required: true, 
        trim: true,
        index: true,
        
    },
    avatar:{
        type:String,
        required: true, 
       
    },
    coverImage:{
        type:String,
        required: true, 
       
    },
    watchHistory:{
        type:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            }
        ]
        
    },
    refreshToken:{
        type:String,
        required: true, 
       
    },


},{timestamps:true})


userSchema.pre("save", async function (next)
{
    if (!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
   return await bcrypt.compare(password, this.password) 
}

userSchema.methods.generateAccessToken = async function (){

   return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            fullName:this.fullName,
            password:this.password
        },
        process.env.Acess_Token,
        {
            expiresIn:process.env.Access_Token_Expiry
        }
        
        
    )

    
    


}
userSchema.methods.generateRefreshToken = async function (){

    return jwt.sign(
        {
            _id:this._id,
           
        },
        process.env.Refresh_Token_Secret,
        {
            expiresIn:process.env.Refresh_Token_Expiry
        }
        
        
    )
    
}

export const User = mongoose.model("User", userSchema)