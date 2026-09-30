
require('dotenv').config()

const db=require('../config/db')


const bycrypt=require('bcrypt')

const validEmail=require('../utils/verify_email')


module.exports= async(req,res)=>{
     //console.log("hello")
     //console.log(req.body)

    

     const connection=await db.getConnection()
try{
    const {Username,Email,Password,Role,SchoolName}=req.body;

    if(!validEmail(req.body.Email))
         //console.log("Invalid email!")
         return res.status(401).json({message:"Invalid email!"})
        
    

    const passHashed=await bycrypt.hash(Password,10)
    //console.log(db)
    
    

     const transaction=connection.beginTransaction()
      const [schoolRows]=await db.execute(`INSERT INTO schools (school_name) values(?)`,[SchoolName])
       
      const schoolId=schoolRows.insertId


      const query="INSERT INTO users (username,password,role,email,school_id) values(?,?,?,?,?)";
      await db.execute(query,
        [
        Username,
        passHashed,
        Role,
        Email,
        schoolId
         
     ]);
     await connection.commit()

     return res.status(201).json({
        message:"Account successfully created, login",
     
        //id:result.insertedId})
          // console.log("account created")

    

    })
}catch(err){
    res.status(500).json({message:"server error!"})
    console.log("Error: "+err.message)

    await connection.rollback()
}finally{
    connection.release()
}
    
}



