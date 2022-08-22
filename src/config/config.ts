import mongoose from "mongoose";

const connectionString = "mongodb://localhost/crud";


  function dbConnection() {
    try {
       const db =   mongoose.connect(connectionString,()=>{
        useNewUrlParser: true;
        useUnifiedTopology: true;
        useCreateIndex: true; 
        useFindAndModify: false;})
        console.log(db);
        console.log('DB Online')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }


}

module.exports =  dbConnection
