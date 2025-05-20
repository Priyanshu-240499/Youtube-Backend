import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/Apierror.js';
import {User} from '../models/user.model.js';

const registerUSer = asyncHandler(async (req,res)=>{

    // STEPS FOR REGISTERING A USER
    // 1. get data from user --> test using postman and for files use multer in user.routes.js
    // 2. validate data if not empty 
    // 3. check if user already exists : username & email 
    // 4. Avatar and coverimage is present or not as these are files
    // 5. Upload the avatar and cover image to cloudinary check for avatar as it is required
    // 6. create a new user object - create entry in database
    // 7. remove password and referesh token from the response
    // 8. Check if user is created or not
    // 9. send response to the user

    // Step 1
     const {fullName,email,userName,password} = req.body
   
    // Step 2 
    // we can also use some function like this in if ([fullName,email,username,password].some((item) => item.trim() === "")) 
    if (!(fullName && email && userName && password) ) {    
        return res.status(400).json({
            success: false,
            message: "Please provide all the fields"
        })
    }
    {
        throw new ApiError(400, "Please provide all the fields")

    }

    // Step 3 

   const existedUser= User.findOne({
        $or:[{userName},{email}]
    })

    if (existedUser){
        throw new ApiError (409, "User already exist")
    }

    // Step 4 as we are using multer to handle this it provides some more data (re.files) to handle files
    console.log(req.files);
    




})

export {registerUSer};
                                                                                                                