const user = require('./../model/user');
const userSchema = require('./../model/user');
require('dotenv').config();
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');


class AuthController {

    async register(body){
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            if(!emailRegex.test(body.email)){
                return {
                    status:false,
                    message :"Email is not Valid"
                }
            }

        const minPasswordLength =  4 ;

            if(body.password < minPasswordLength){
                return {
                    status:false,
                    message :"Password should be at least " + minPasswordLength +" characters long"
                }
            }

        try{
            const emailExist = await userSchema.findOne({email:body.email});
            if(emailExist){
                return {
                    status:false,
                    message :"Email already exists"
                }
            }
            const newUser = new user({
                username:body.username,
                email : body.email,
                password : CryptoJS.AES.encrypt(body.password,process.env.SECRET).toString(),
                designation : body.designation,
                phone:body.phone,
                Gender:body.Gender,
                City:body.City,
                State:body.State
            })
            await newUser.save();
        return {
                status: 'success',
                msg: 'User created'
            }
        } catch(err){
            return {
                status: 'error',
                msg: 'User creation failed'
            }
        }
    }

    async login(responce){
         const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            if(!emailRegex.test(responce.email)){
                return {
                    status:false,
                    message :"Email is not Valid"
                }
            }

            const minPasswordLength =  4 ;

            if(responce.password < minPasswordLength){
                return {
                    status:false,
                    message :"Password should be at least " + minPasswordLength +" characters long"
                }
            }

        try{
            let user = await userSchema.findOne({
                email: responce.email
            });

            if(!user){
                throw new Error('User not Found');
            }

            const decryptpassword = CryptoJS.AES.decrypt(user.password,process.env.SECRET);
            const depassword =  decryptpassword.toString(CryptoJS.enc.Utf8);

            if(depassword !==  responce.password){
                return {
                    status:false,
                    message :"Wrong Password"
                }
            }

            const userToken = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:"24h"});

            const {password,otp,createdAt,updatedAt,__v,...others} =  user._doc;

            return {
                status: "1",
                msg: "Login Sucessfully",
                ...others,
                userToken
            };

        } catch(error){
            console.log(error);
            return {
                status: "0",
                msg: 'username or password invalid'
            }
        }
    }

	
}

       

module.exports=new AuthController();