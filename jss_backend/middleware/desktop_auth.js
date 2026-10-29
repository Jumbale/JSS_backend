 const jwt=require("jsonwebtoken")
 const bcrypt=require('bcrypt')
 require('dotenv').config()

module.exports=(req,res,next)=>{
  console.log(req.headers)

    //access the authorization from the request headers
    const authHeader=req.get("authorization"); //or you can use req.headers["authorization"]
    if(authHeader && authHeader.startsWith("Bearer")){
            
    const token=authHeader.split(" ")[1]

    if(token==null) return res.status(401).json({message:"Access denied.No token provided!"})

  try{
    const verifiedToken=jwt.verify(token,process.env.DESKTOP_ACCESS_TOKEN)
    req.user=verifiedToken
    next()
  }catch(err){
    console.log(err)

    return res.status(403).json({message:"Access token expired"})

  }
   

    }else{
       return res.status(400).json({message:"Access denied.No token provided"})
    }
   
}