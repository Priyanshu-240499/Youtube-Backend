import {asyncHandler} from '../utils/asyncHandler.js';


const registerUSer = asyncHandler(async (req,res)=>{
    // STEPS FOR REGISTERING A USER
    // 1. get data from user
    // 2. validate data 
    // 3. check if user already exists : username & email
    // 4. Avatar and coverimage is present or not as these are files
    // 5. Upload the avatar and cover image to cloudinary check for avatar as it is required
    // 6. create a new user object - create entry in database
    // 7. remove password and referesh token from the response
    // 8. Check if user is created or not
    // 9. send response to the user

    


})

export {registerUSer};
                                                                                                                