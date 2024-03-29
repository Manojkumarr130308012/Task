const jwt =  require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
          }
        
        jwt.verify(token,process.env.JWT_SECRET,async (err,user)=>{
            if(err){
                return res.status(403).json({status:false,message:"invalid token"})
            }
            req.user =  user;
            next();
        })
    }else{
        return res.status(401).json({status:false,message:"You are not authenticated"})
    }
};


module.exports ={
    verifyToken
}