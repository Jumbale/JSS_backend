
require('dotenv').config()

const db=require('../config/db')

const validTel=require('../utils/verify_phonenumber')
const validEmail=require('../utils/verify_email')
const validTSC=require('../utils/verify_tsc')
const verifyField=require('../utils/empty_fields')
const securePassword=require('../utils/passwordHashed')


module.exports= async(req,res)=>{
    console.log(req.body)

    const connection=await db.getConnection();
     //console.log("hello")

    const {Username,Role,Password,firstName,lastName,tscNumber,Email,Gender,phoneNumber,Department,Subject}=req.body;

    if(verifyField(req.body.Username)|| verifyField(req.body.Role)
       || verifyField(req.body.Password) || verifyField(req.body.firstName)
       || verifyField(req.body.lastName) || verifyField(req.body.tscNumber)
       || verifyField(req.body.Email)||verifyField(req.body.Gender)
       || verifyField(req.body.phoneNumber)||verifyField(req.body.Department)
       ||verifyField(req.body.Subject)
       ) return res.status(401).json({message:"Fill all fields!"})

    const verifiedPassword=await securePassword(req.body.Password)
    if(!verifiedPassword) return res.status(401).json({message:"Wrong password!"})

    const validatedPhone=validTel(req.body.phoneNumber)
    
    if(!validatedPhone) return res.status(401).json({message:"Invalid phone number!"})

    //console.log(validatedPhone)
    

    const validatedTSC=validTSC(req.body.tscNumber)
   // console.log("This "+validated)

    if(!validatedTSC) return res.status(401).json({message:"Invalid TSC number!"})
     
    
   
    const validatedEmail=validEmail(req.body.Email);
     //console.log(validEmail)
    if(!validatedEmail) return res.status(401).json({message:"invalid email"})
            console.log(validEmail)


    try{
      const transaction=  await  connection.beginTransaction();
            const query2="INSERT users (username,password,role,email) values(?,?,?,?)";
            const [result2]=await db.execute(query2,
                [
                req.body.Username,
                verifiedPassword,
                req.body.Role,
                req.body.Email
                
            ]);

             const query="INSERT INTO teachers (first_name,last_name,tsc_number,email,gender,phone_number,department,subject) values(?,?,?,?,?,?,?,?)";
             const [result]=await db.execute(query,
                    [
                    req.body.firstName,
                    req.body.lastName,
                    req.body.tscNumber,
                    req.body.Email,
                    req.body.Gender,
                    req.body.phoneNumber,
                    req.body.Department,
                    req.body.Subject
                    
                ]);

                await connection.commit();

                 if(result2.length===0||result.length===0) return res.status(500).json({message:"server error"})

   

                return res.status(201).json({
                message:"Teacher added!"})

    }
    catch(err){
        res.status(500).json({message:"Invalid request"})
        console.log("Error: "+err.message)
        await connection.rollback();
    }
    finally{
        connection.release();
    }
    
}




