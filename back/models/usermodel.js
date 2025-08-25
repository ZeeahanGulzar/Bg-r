import mongoose from "mongoose";

let userSchema = new mongoose.Schema({

    clerkId : { type:String, required:true, unique:true },
    email : { type:String, required:true, unique:true },
    photo : { type:String, required:true },
    firstName : { type:String },
    lastName : { type:String },
    credit : { type:Number, default:5 }

})

let userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;