import {Router} from 'express';
import { registerUSer } from '../controller/user.controller.js';
import {upload} from "../middlewares/multermiddleware.js"
const router = Router();

router.route("/register").post(
    
        upload.fields([
            { name: 'avatar', maxCount: 1 },
            { name: 'coverImage', maxCount: 1 }
        ]), 
        registerUSer



    
)

export default router;