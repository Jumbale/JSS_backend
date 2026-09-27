
require('dotenv').config()

const db=require('../config/db')

const bycrypt=require('bcrypt')


module.exports= async(req,res)=>{
     //console.log("hello")

     let schoolId;
    console.log(req.body)

     console.log(req.body.AdmNumber);
try{
    const {AdmNumber,firstName,lastName,Grade,
            Gender,DOB,Residence,
            Religion,Nationality,
            Status,Category,schoolName}=req.body;

            


    if(req.body.AdmNumber.length!==4) return res.status(400).json({message:"Invalid Admission number!"})

    const result2=await db.execute(`SELECT * FROM classes WHERE class_name=?`,[Grade])
        console.log(result2[0])
    const classDetails=result2[0].find(classDetail=>classDetail.class_name===Grade)
      console.log(classDetails.class_id)
      // console.log(req.body.Grade)

    if(result2.length===0) return res.status(401).json({message:"Unexpected error occurred, try again!"})

    const [schoolRows]=await db.execute(`SELECT info_id from school_information WHERE school_name=?`,[schoolName])

    schoolRows.forEach(school=>{
        schoolId=school.info_id;
    })

    console.log(schoolId)
    
    const query="INSERT INTO students (admission_number,first_name,last_name,grade,gender,date_of_birth,residence,religion,nationality,status,category,class_id,school_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const [result]=await db.execute(query,
        [
        AdmNumber,
        firstName,
        lastName,
        Grade,
        Gender,
        DOB,
        Residence,
        Religion,
        Nationality,
        Status,
        Category,
        classDetails.class_id,
        schoolId

         
    ]);

    return res.status(201).json({
        message:"student Registered",
        id:result.insertedId})


}catch(err){
    res.status(500).json({message:"request failed, try again!"})
    console.log("Error: "+err.message)
}
    
}



