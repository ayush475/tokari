const app =require('./app')


const  dotenv =require('dotenv')
const { model } = require('mongoose')

//setting up config 
dotenv.config({path :'backend/config/config.env'})
app.listen(process.env.PORT, () =>{
    console.log(`Server is listening on port ${process.env.PORT}`);

    
})
