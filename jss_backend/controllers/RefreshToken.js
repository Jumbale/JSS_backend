
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const db=require("../config/db")



require('dotenv').config()


module.exports=async(req,res)=>{
    console.log(req.body)
    const {userEmail,refreshToken}=req.body

    

    let userId;
    let storedHashedRefreshToken;
    let Email;
    let userRole;

    try{

        const [userDataRows]=await db.execute(`SELECT * from users WHERE email=?`,[userEmail])
        if(!userDataRows|| userDataRows.length===0) return ""

        userDataRows.forEach((users)=>{
            userId=users.id
            Email=users.email
            userRole=users.role

        })

         const [reshTokensRows]=await db.execute(`SELECT token_hash from refresh_tokens  WHERE user_id=? AND revoked=0`,[userId])
         if(!reshTokensRows|| reshTokensRows.length===0) return res.status(403).json({message:"Invalid or token expired"})

         reshTokensRows.forEach((hashedRefreshToken)=>{
            storedHashedRefreshToken=hashedRefreshToken.token_hash
        })

    }catch(err){
        console.log(err)
        return ""
    }
    

        if(refreshToken==null) return res.status(401).json("token required")

        try{
           const isVerified=await bcrypt.compare(refreshToken,storedHashedRefreshToken)

           if(!isVerified) return res.status(403).json({message:"invalid token or token expired"})

            const newAccessToken=jwt.sign({email:Email,role:userRole},process.env.DESKTOP_ACCESS_TOKEN,{expiresIn:"2m"})

            res.status(200).json({newAccessToken:newAccessToken})



        }catch(err){
            console.log(err)

            res.status(403).json({message:"Token expired!"})
            
        }
        
        
    }
