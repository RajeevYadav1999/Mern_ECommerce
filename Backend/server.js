import app from "./app.js";
import dotenv from "dotenv";
import { connectMongoDatabase } from "./config/db.js";

dotenv.config({path:'backend/config/config.env'})
connectMongoDatabase();
const port = process.env.PORT || 3000 

// Handle uncaught exception error
process.on('uncaughtException', (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting down due to uncaught exception errors`);
    process.exit(1)  
})

const server = app.listen(port, ()=>{
    console.log(`server is running on Port ${port}`);  
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log((`Server is shutting down, due to unhandled promise rejection`));
    server.close(()=>{
        process.exit(1)
    })  
})

