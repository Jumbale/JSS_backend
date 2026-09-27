 const jwt=require("jsonwebtoken")
 require('dotenv').config()

module.exports=(req,res,next)=>{
    const authHeader=req.get("authorization");
    if(authHeader && authHeader.startsWith("Bearer")){
            
    const token=authHeader.split(" ")[1]

    if(token==null) return res.status(401).send("Authentication failed!")

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,loginDetails)=>{
    if(err) return res.status(403).send("Authentication failed!")

    req.student=loginDetails
    console.log( req.student)
    next()
   })

    }else{
       return res.status(401).json({message:"Authorization failed"})
    }
   
}