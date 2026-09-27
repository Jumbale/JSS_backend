
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

require('dotenv').config()


const db=require('../config/db')
const Authorization=require('../middleware/AuthController')





module.exports=async(req,res)=>{
   
    try{
        const query="SELECT * FROM students";
        console.log("checking...")
        const[rows]=await db.execute(query)
        console.log(rows)

        const student=rows.find(student=>student.admission_number===req.body.admNumber)
        console.log(student)
        if(!student) return res.status(400).send(" Invalid username or password")

       
        if(await bcrypt.compare(req.body.Password,student.password)){
            const userDetails={id:student.id,first_name:student.first_name}
            
            const token=jwt.sign(userDetails,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"30m"})
            return res.status(200).json({token:token})
        }else{
            return res.status(401).send("Invalid password")
        }
            
        
    }catch(err){
        return res.status(500).send()
    }
    

}