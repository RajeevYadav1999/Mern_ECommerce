import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[25,"Invalid name, Please enter a name with fewer than 25 characters"],
        minLength:[3,"Name should contain more than 3 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail, "Please enter valid email"],
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password should contain more than 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
},{timestamps:true})

//? Password hashing
userSchema.pre('save', async function(next){
    this.password=await bcryptjs.hash(this.password, 10)
    //! 1st - updating profile(name, email, image)--hashed password will be hashed again ❌
    // 2nd - Update password ✅ 
    if(!this.isModified('password')){
        return next();
    }
})

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

export default mongoose.model("User",userSchema);