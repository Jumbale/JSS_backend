
require('dotenv').config()

const db=require('../config/db')

const validTel=require('../utils/verify_phonenumber')
const validEmail=require('../utils/verify_email')
const validTSC=require('../utils/verify_tsc')
const verifyField=require('../utils/empty_fields')


module.exports= async(req,res)=>{
     //console.log("hello")
try{
    const {parentsFirstName,parentLastName,childNumber,parentEmail,
            Occupation,parentsPhonenumber,parents_nationality}=req.body;

    if(verifyField(req.body.parentsFirstName)
        || verifyField(req.body.parentLastName)
        || verifyField(req.body.childNumber) 
        || verifyField(req.body.parentEmail)
        || verifyField(req.body.Occupation)
        || verifyField(req.body.parentsPhonenumber)
        || verifyField(req.body.parents_nationality)
        
        ) return res.status(401).json({message:"Fill all fields!"})

    const validatedPhone=validTel(req.body.parentsPhonenumber)
    
    if(!validatedPhone) res.status(401).json({message:"Invalid phone number!"})

    
    const validatedEmail=validEmail(req.body.parentEmail);
     //console.log(validEmail)
    if(!validatedEmail) return res.status(401).json({message:"invalid email"})
            console.log(validEmail)
    const query=`INSERT INTO parents (
                 parents_first_name,
                 parents_last_name,
                 child_number,
                 parents_email,
                 occupation,
                 parents_phone_number,
                 parents_nationality
                 ) values(?,?,?,?,?,?,?)`;
    const [result]=await db.execute(query,
        [
        req.body.parentsFirstName,
        req.body.parentLastName,
        req.body.childNumber,
        req.body.parentEmail,
        req.body.Occupation,
        req.body.parentsPhonenumber,
        req.body.parents_nationality
       
         
    ]);

    return res.status(201).json({
        message:"Parent added!",
        id:result.insertedId})


}catch(err){
    res.status(500).json({message:"Invalid request"})
    console.log("Error: "+err.message)
}
    
}




