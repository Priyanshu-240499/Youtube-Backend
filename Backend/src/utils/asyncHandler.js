// Making a wrapper in async handler so that we can directly talk to our db
const asyncHandler = (reqHandler)=>{
    return (req,res,next)=>{
      Promise.resolve(reqHandler(req, res, next)).catch((err)=> next(err))
    }
}





// Above code with try catch

/* const asyncHandler = (fun)=>{
   async (req,res,next)=>{
  try {
    await fun(req,res,next)
  } catch (error) {
    console.log("Error in asyncHandler:");
    res.status(error.code || 500).json({
        success: false,
        message: error.message,
    })
    
  }


   }
}
*/
export {asyncHandler} 