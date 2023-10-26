  const PORT = process.env.PORT || 6969 ;

  const app = require('./app.js');

  app.listen(PORT,()=>{

     app.on('error', (err)=>{
         console.log('ERROR:',err)
    })
    console.log('Server IS UP');
    
  })
