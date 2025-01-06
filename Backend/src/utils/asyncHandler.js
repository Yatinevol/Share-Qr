const asyncHandler = async(handleController)=>{
    return (req,res,next)=>{
        Promise.resolve(handleController(req,res,next))
        .catch((err)=> next(err))
    }
}
export default asyncHandler;