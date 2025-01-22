import Product from '../models/productModel.js'
import HandleError from "../utils/handleError.js";
import handleAsyncError from '../middleware/handleAsyncError.js';
import APIFunctionality from '../utils/apiFunctionality.js';


//1️⃣ Creating Products
export const createProducts=handleAsyncError (async(req,res,next)=>{
  const product = await Product.create(req.body)
  res.status(201).json({
    success:true,
    product
  })
})

// 2️⃣ getting all products
export const getAllProducts =handleAsyncError (async(req, res, next)=>{
  const apiFunctionality= new APIFunctionality(Product.find(),req.query).search();
  const products= await apiFunctionality.query
    res.status(200).json({
        success: true,
        products
    })
})

// 3️⃣ update product
export const updateProduct =handleAsyncError (async(req,res,next)=>{
  const product= await Product.findByIdAndUpdate(req.params.id, req.body, {
    new:true,
    runValidators:true
  })
  if(!product){
    return next(new HandleError("Product not Found", 404))
  }
  res.status(200).json({
    success:true,
    product
  })
})

// 4️⃣ Delete Product
export const deleteProduct =handleAsyncError (async(req, res, next)=>{
  const product= await Product.findByIdAndDelete(req.params.id);
  if(!product){
    return next(new HandleError("Product not Found", 404))
  }
  res.status(200).json({
    success:true,
    message:"Product Deleted Sucessfully"
  })
})

//5️⃣ Accessing Single Product
export const getSingleProduct=handleAsyncError (async(req,res, next)=>{
  const product= await Product.findById(req.params.id);
  if(!product){
    return next(new HandleError("Product not Found", 404))
  }
  res.status(200).json({
    success:true,
    product
  })
})
