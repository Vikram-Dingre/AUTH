import User from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiRes from "../utils/ApiResponse.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

const signUp = asyncErrorHandler(async (req,res)=>{
    const {email,name} = req.body;
    const isAlreadyExists = await User.findOne({email,name});
    if(isAlreadyExists){
        throw new ApiError(400,"Account Already Exists.")
    }
    const user = User(req.body);
    await user.save();
    // await user.save();
    return res.status(201).json(new ApiRes(201,user,"SignUp Successfull."))

})

const logIn = asyncErrorHandler(async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findByEmail(email)
    if(!user){
        throw new ApiError(400,"Account Doesn't Exists.")
    }
    const match = await user.isPasswordMatch(password) 
    if(!match){
        throw new ApiError(400,"Incorrect Password.")
    }

    const token = await user.generateAccessToken();

    res.cookie("accessToken",token);
   return res.status(200).json(new ApiRes(200,{user,token},"Logged In Successfully."))
})

const logout = asyncErrorHandler(async (req,res)=>{
    res.cookie("accessToken","");
    const user = await User.findOne({_id:req.user._id});
    if(!user){
        throw new ApiError(401,"User Not Found!")
    }
    return res.status(200).json(new ApiRes(200,user,"Logout Successfully!"));
})

const getProfile = asyncErrorHandler(async (req,res)=>{
    const user = await User.findById(req.user._id);
    if(!user){
        throw new ApiError(401,"User Not Found!")
    }
    return res.status(200).json(new ApiRes(200,user,"Profile Fetched Successfully!"))
})

export {signUp,logIn,logout,getProfile}