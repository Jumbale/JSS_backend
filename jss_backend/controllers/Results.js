const db=require('../config/db')

module.exports=async(req,res)=>{
    console.log(req.body)
    try{
        let TscNumber;
        let termId;
        let subject;
        let academicYear;
        let schoolId;
        let examId;

       const{AdmissionNumber,SubjectCode,termName,subjectName,yearName,
            Score,Remarks,schoolName,Exam
            }=req.body

            const [examsResults]=await db.execute(`SELECT exam_id FROM exams WHERE exam_name=? `,[Exam])
            console.log(examsResults)
            if(examsResults.length==0) return res.status(400).json({success:false,message:"Exam not registered!"})
            examsResults.forEach(exam=>{
               examId=exam.exam_id
               console.log(examId)
            })
            console.log("passed here!")

       const [termQueryResult]=await db.execute(`SELECT term_id FROM terms WHERE term_name=? `,[termName])
            if(termQueryResult.length===0) return res.status(400).json({success:false,message:"Failed! Term doesn't exist"})
       termQueryResult.forEach(term=>{
            
               termId=term.term_id
            
        })

        const [sqlResult]=await db.execute(`SELECT info_id FROM school_information WHERE school_name=?`,[schoolName])
             if(sqlResult.length===0) return res.status(400).json({success:false,message:"Failed! School doesn't exist"})
        if(!sqlResult) return res.status(400).json({success:false,message:"School not found!"})
         
        sqlResult.forEach(selectedSchool=>{
            schoolId=selectedSchool.info_id
        })
        

        const [tscQueryResult]=await db.execute(`SELECT teachers.tsc_number,teachers.subject,academic_years.academic_year_id FROM teachers
                INNER JOIN classes ON 
                teachers.tsc_number=classes.teacher_tsc_number
                CROSS JOIN(SELECT academic_year_id FROM academic_years WHERE year_name=?) academic_years`,[yearName])
        if(tscQueryResult.length===0){
            return res.status(401).json({message:"Failed!"})
        } else{
                tscQueryResult.forEach(data=>{
                   TscNumber=data.tsc_number,
                   subject=data.subject,
                   academicYear=data.academic_year_id
                })


        }
        
    

        console.log(TscNumber)
        console.log(subject)
        console.log(termId)
        console.log(academicYear)
        
        console.log(__dirname)

       

       const query=`INSERT INTO results (admission_number,subject_code,term_id,teacher_tsc_number,
                    year_name,score,remarks,school_id,exam_id ) values(?,?,?,?,?,?,?,?,?)`
       // console.log("passed")
       const [result]=await db.execute(query,[AdmissionNumber,SubjectCode,termId,TscNumber,
                                     yearName,Score,Remarks,schoolId,examId])
                                    console.log(AdmissionNumber)

        console.log(AdmissionNumber)

       if(result.length===0) return res.status(401).json({message:"Failed!"})

        res.status(200).json({message:"Results uploaded!"})


    }catch(err){
        console.log(err)
        res.status(500).json({message:"server error!"})

    }

}