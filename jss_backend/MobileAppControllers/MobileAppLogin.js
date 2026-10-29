const db=require('../config/db')
const verifyAdmissionNumber=require('../utils/AdmissionNumberValidator')
const verifyTSC=require('../utils/verify_tsc')
module.exports=async(req,res)=>{
    console.log(req.body)

    let schoolId;

    const {school,password,role}=req.body
    try{
            
        const [schoolsRows]=await db.execute(`SELECT id FROM schools WHERE school_name=?`,[school])
        if(!schoolsRows||schoolsRows.length===0) return res.status(400).json({success:false,message:"school is yet to be registered!"})
        schoolsRows.forEach(schools=>{
        schoolId=schools.id
    })
     console.log(schoolId)

    }catch(err){
        console.log(err)
    }

    

    if(role==="student"|| role==="parent"){
        let school;
        let studentName;
        let admNumber;
        let Grade;

        const admissionNumber=password
        const verifiedAdmissionNumber=verifyAdmissionNumber(admissionNumber)
        if(!verifiedAdmissionNumber)return  res.status(400).json({success:false,message:"Invalid admission number"})
        try{
            const [studentRows]=await db.execute(`SELECT students.*,schools.id,schools.school_name
                 FROM students
                 JOIN schools ON students.school_id=schools.id
                 WHERE status='active' AND school_id=? AND admission_number=?`,[schoolId,admissionNumber])
            if(!studentRows||studentRows.length===0){return res.status(400).json({success:false,message:"Invalid details"})} 
            studentRows.forEach((studentDetails)=>{
                school=studentDetails.school_name
                studentName=studentDetails.first_name+" "+studentDetails.last_name
                admNumber=studentDetails.admission_number
                Grade=studentDetails.grade
            })
            
                return res.status(201).json({
                    success:true,
                    school:school,
                    studentName:studentName,
                    admNumber:admNumber,
                    Grade:Grade

                })
            
        }catch(err){
            console.log(err)
            return res.status(500).json({message:"server error!"})
        }

    }else if(role==="teacher"){
        const tscNumber=password
        console.log(password)
        const verifiedTSC=verifyTSC(tscNumber)
        if(!verifiedTSC)return res.status(400).json({success:false,message:"Invalid TSC number!"})
         
        try{
            const [teachersRows]=await db.execute(`SELECT * FROM teachers WHERE school_id=? AND tsc_number`,[schoolId,tscNumber])
            if(!teachersRows||teachersRows.length===0){return res.status(400).json({success:false,message:"Invalid details"})} 
            
                return res.status(201).json({success:true,isTeacher:true})
            
        }catch(err){
            console.log(err)
            return res.status(500).json({message:"server error!"})
            
        }
    
    }


    }