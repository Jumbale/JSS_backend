const db=require('../config/db');

module.exports=(async(req,res)=>{

    
try{
  console.log(req.body)

    const AdmNumber=req.params.admNumber;
    console.log(AdmNumber)
    const{firstName,lastName,Gender,Grade,Residence,
            Nationality,Religion,Status,Category,DOB
          }=req.body


    const result2=await db.execute(`SELECT * FROM classes WHERE class_name=?`,[req.body.Grade])
        console.log(result2[0])
    if(result2.length===0) return res.status(401).json({message:"Unexpected error occurred, try again!"})    
        console.log(req.body.Grade)
    const classDetails=result2[0].find(classDetail=>classDetail.class_name===req.body.Grade)
      //console.log(classDetails.class_id)
      // console.log(req.body.Grade)

    const query=`UPDATE students SET first_name=?, last_name=?,gender=?,grade=?, residence=?,
          nationality=?,religion=?,status=?,category=?,class_id=?,date_of_birth=? WHERE admission_number=?`

    const result=await db.execute(query,[firstName,lastName,Gender,Grade,Residence,
              Nationality,Religion,Status,Category,classDetails.class_id,DOB,AdmNumber])
         
              if(result.length===0)  return res.status(500).json({message:"Failed to update student"})
   
       
        
               res.status(201).json({message:"student updated successfully"})

}catch(err){
    res.status(500).json({message:"server error"})
    console.log(err)
}

})