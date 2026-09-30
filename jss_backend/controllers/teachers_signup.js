
require('dotenv').config()

const db=require('../config/db')

const validTel=require('../utils/verify_phonenumber')
const validEmail=require('../utils/verify_email')
const validTSC=require('../utils/verify_tsc')
const verifyField=require('../utils/empty_fields')
const securePassword=require('../utils/passwordHashed')


module.exports= async(req,res)=>{
    console.log(req.body)

    let schoolId;

    const connection=await db.getConnection();
     //console.log("hello")

    const {Username,Role,Password,firstName,lastName,tscNumber,Email,Gender,phoneNumber,Department,Subject,schoolName}=req.body;

    if(verifyField(Username)|| verifyField(Role)
       || verifyField(Password) || verifyField(firstName)
       || verifyField(lastName) || verifyField(tscNumber)
       || verifyField(Email)||verifyField(Gender)
       || verifyField(phoneNumber)||verifyField(Department)
       ||verifyField(Subject)
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
       const [schoolRows]=await db.execute(`SELECT id FROM schools WHERE school_name=?`,[schoolName])
             if(schoolRows.length===0) return ""
             schoolRows.forEach(schools=>{
             schoolId=schools.id
             })

        console.log(schoolId)

        try{

            await  connection.beginTransaction();
             
            const query2="INSERT users (username,password,role,email,school_id) values(?,?,?,?,?)";
            const [result2]=await db.execute(query2,
                [
                req.body.Username,
                verifiedPassword,
                req.body.Role,
                req.body.Email,
                schoolId
                
            ]);
            if(!result2||result2.length===0) return res.status(500).json({message:"server error"})


             const query="INSERT INTO teachers (first_name,last_name,tsc_number,email,gender,phone_number,department,subject,school_id) values(?,?,?,?,?,?,?,?,?)";
             const [result]=await db.execute(query,
                    [
                    firstName,
                    lastName,
                    tscNumber,
                    Email,
                    Gender,
                    phoneNumber,
                    Department,
                    Subject,
                    schoolId
  
                ]);
                await connection.commit();

                return res.status(201).json({
                    message:"Teacher added!"})

    }
    catch(err){
         console.log("Error: "+err.message)
         
         await connection.rollback();
         return res.status(500).json({message:"Failed! Could not register teacher, please confirm the teacher's details and try again."})

    }
    finally{
        connection.release();
    }


    }
    catch(err){
        res.status(500).json({message:"Invalid request"})
       
    }
    
    
}




