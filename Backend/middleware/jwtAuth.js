const JWT = require('jsonwebtoken');
const key = '6FCBB4EA9383A8D69F4C753FC4A19';

exports.infoByCokkie = (req,res,next) => {
   
    const token = ( req.cookies && req.cookies.token ) || null;

    console.log(token)

   if(!token){
    
    return res.status(400).json({
        success:false,
        message:'Not Authorised'
    })
   }

   

   try {

    const payload = JWT.verify(token,key);

    req.userInfoByToken = { id: payload.id , email: payload.email};
    
   } catch (error) {
    return res.status(400).json({
        success:false,
        message:error.message ,
        message:"Kindly Log In"
    })
   }
    next();
}