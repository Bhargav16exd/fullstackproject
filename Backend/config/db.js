const mongoose = require("mongoose");


const connect_DB = async ()=> {
   
   
    mongoose.connect('mongodb://127.0.0.1:27017/fullstack')
   .then((conn)=>{
     console.log(`Connected to DB : ${conn.connection.host}`)
    })
    .catch((err)=>{
       console.log(err.message);
       proccess.exit(1);
    })
 


}

module.exports = connect_DB