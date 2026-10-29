
const db=require('../config/db')

module.exports=async(req,res)=>{
    const {userEmail}=req.body

    console.log(userEmail)

    let userId;

      try{

        const [userDataRows]=await db.execute(`SELECT * from users WHERE email=?`,[userEmail])
        if(!userDataRows|| userDataRows.length===0) return ""

        userDataRows.forEach((users)=>{
            userId=users.id
            Email=users.email
            userRole=users.role

        })

         const [refreshTokensRows]=await db.execute(`UPDATE refresh_tokens SET revoked=1 WHERE user_id=?`,[userId])
         if(!refreshTokensRows|| refreshTokensRows.length===0) return ""

          return res.status(201).json({success:true,message:"you are logged out!"})

    }catch(err){
        console.log(err)
        return ""
    }
}