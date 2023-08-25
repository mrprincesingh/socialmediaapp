import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    email: {
        type: "string",
        required: [true, "Please enter Your Email"],
        unique: true,
        validate: validator.isEmail,
      },
      password: {
        type: "string",
        required: [true, "Please enter Your Password"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false,
      },
    bio: {
      type: String,
      maxlength: 200,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  });
  userSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next()
   const hashedPassword =  await bcrypt.hash(this.password , 10)
   this.password = hashedPassword
   next()
  })
  userSchema.methods.getJWTToken = function (){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{
      expiresIn:"15d",
    })
  }
  userSchema.methods.comparePassword = async function (password){
    console.log(this.password)
    return await bcrypt.compare(password , this.password)
  }
  
  
 export const User = mongoose.model('User', userSchema);
