import express from "express";
import product from './routes/productRoutes.js'
import user from './routes/userRoutes.js'
import errorHandleMiddleware from './middleware/error.js'
const app = express();

//Middleware
app.use(express.json())

//Routes
app.use('/api/v1',product) //middleware for creating route
app.use('/api/v1',user) 

app.use(errorHandleMiddleware)
export default app;