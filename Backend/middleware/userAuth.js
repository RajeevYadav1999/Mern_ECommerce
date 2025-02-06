import handleAsyncError from "./handleAsyncError.js";
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import HandleError from "../utils/handleError.js";

export const verifyUserAuth = handleAsyncError(async(req, res, next)=>{
const {token}=req.cookies;
    console.log(token);
    if(!token){
        return next(new HandleError("Authentication is missing! Please login to access resources",401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY
    );
    console.log(decodedData);
    req.user=await User.findById(decodedData.id)
    next();
})

export const roleBasedAccess=(...roles)=>{
    return(req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(new HandleError(`Role - ${req.user.role} is not allowed to access the resource`, 403))
        }
        next();
    }
}
