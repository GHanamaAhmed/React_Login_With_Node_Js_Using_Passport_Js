const authMiddleware=(req,res,next)=>{
    if (req.isAuthenticated) {
       return next()
    }
    res.status(401).json({err:"you did't authenticated!"})
}
module.exports={authMiddleware}