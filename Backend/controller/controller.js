const User = require('../model/model.js');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');



exports.signup = async (req,res,next)=>{

const {name ,email , password, cpassword} = req.body;
console.log(req.body);

        console.log(name,email,password)
   
       if(!name || !email || !password){
        res.status(400).json({
            status:false,
            message:"Please Provide all neccessay data"
        })
       }
    
    const validEmail = emailValidator.validate(email);

     if(!validEmail){
        res.status(400).json({
            status:false,
            message:"Invalid Email Format"
        })
     }

    if(password !== cpassword){
        res.status(400).json({
            status:false,
            message:"Password Doesnt Match"
        })
    }

    try {

           const result = await User.create({
            name,
            email, 
            password
        })
    
     
        res.status(201).json({
            success: true ,
            message:"USER CREATED SUCCESSFULY",
        })

  

        
    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
            
          }) 
        
    }

}

// SIGN IN 



exports.signIN = async (req, res) => {
    const { email, password } = req.body;

    console.log(email,password)
  
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields are mandatory",
      });
    }
  

    try {
      const user = await User.findOne({ email }).select('+password');
  
      console.log(user)

      if (!user) {
        return res.status(400).json({
          status: false,
          message: 'Invalid credentials',
        });
      }
  
      const passwordMatch = bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(400).json({
          status: false,
          message: 'Invalid credentials',
        });
      }
  
      // Rest of your code (e.g., token creation and response)
  
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };


exports.getUser = async (req, res) => {

    res.setHeader('Access-Control-Allow-Methods', 'GET')

    // This brings ID from token which will be checked and decrypted in middleware 
    const idByReq = req.userInfoByToken.id;

    // Connection after checking conditions
    try {

        // This command check for ID in DataBase and returns data corresponding to that ID 
        const InfoByDb = await User.findById(idByReq);
       
        return res.status(400).json({
            success:true,
            message:"User Is recieved",
            data: InfoByDb 
        })

        
    } catch (error) {

       return res.status(400).json({
            success: false,
            message: error.message,
          }) 
          
    }
}

// Log OUt 

exports.logOut = (req,res) =>{
    try {

       res.cookie("token",'Null');
       return res.status(200).json({
            success:true,
            message:"LogOut Succes"
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
            
          })    
    }
}