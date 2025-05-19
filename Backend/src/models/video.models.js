import mongoose, {Aggregate, Schema} from "mongoose";
import mongooseAggregatePaginate from  "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    title:{
        type:String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    description:{
        type:String,
        required: true,
        trim: true,
        
    },
    videoUrl:{
        type:String,
        required: true,
        
    },
    duration:{
        type:String,
        required: true,
        
    },
    thumbnailUrl:{
        type:String,
        required: true,
        
    },
    views:{
        type:Number,
        default: 0,
        
    },
    isPulished:{
        type:Boolean,
        default: false,
        
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    
},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)