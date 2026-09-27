
require('dotenv').config()

const db=require('../config/db')


const bycrypt=require('bcrypt')

const validEmail=require('../utils/verify_email')


module.exports= async(req,res)=>{
     //console.log("hello")
     //console.log(req.body)
try{
    const {Username,Email,Password,Role}=req.body;

    if(!validEmail(req.body.Email))
         //console.log("Invalid email!")
         return res.status(401).json({message:"Invalid email!"})
        
    

    const passHashed=await bycrypt.hash(req.body.Password,10)
    //console.log(db)

    const query="INSERT INTO users (username,email,password,role) values(?,?,?,?)";
    const [result]=await db.execute(query,
        [
        req.body.Username,
        req.body.Email,
        passHashed,
        req.body.Role,
         
    ]);

    return res.status(201).json({
        message:"Account successfully created, login",
     
        id:result.insertedId})
           console.log("account created")


}catch(err){
    res.status(500).json({message:"email or username already exists!"})
    console.log("Error: "+err.message)
}
    
}



