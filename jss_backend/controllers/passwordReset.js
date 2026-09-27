const bcrypt=require('bcrypt')

const db=require('../config/db')

const passwordHashed=require('../utils/passwordHashed')
const verifyTSC=require('../utils/verify_tsc')

module.exports=(async(req,res)=>{
    const{tscNumber,currentPassword,newPassword,passwordRepeat}=req.body;

    if(req.body.newPassword!==req.body.passwordRepeat) return res.status(401).json({message:"Passwords don't match!"})

     const securedPswd= await passwordHashed(req.body.newPassword)

     const verifiedTSC=verifyTSC(tscNumber)

     if(!verifiedTSC) return res.status(401).json({message:"Invalid TSC number!"})

     const query=`INSERT INTO passwords (permanent_password,tsc_number)values(?,?)`

     const [results]=await db.execute(query,[securedPswd,req.body.tscNumber])

     if(!results) return res.status(200).json({message:"Failed!"})

        const [results2]=await db.execute('UPDATE users SET must_change_password=?',[0])

        if(!results2) res.status(401).json({message:"Failed!"})

        return res.status(200).json({message:"Password has been reset!"})
})