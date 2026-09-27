const db=require('../config/db')

module.exports=async(req,res)=>{
    let ClassName;
    let termId
    let examId

    const {teachersEmail,Exam,Term,academicYear}=req.params
    try{
        const [TermRows]=await db.execute(`SELECT term_id FROM terms WHERE term_name=?`,[Term])
        if(TermRows.length===0) return res.status(400).json({success:false,message:"Upload Results for the selected term!"})
        
        TermRows.forEach(terms=>{
           termId=terms.term_id
        })




        const [ExamRows]=await db.execute(`SELECT exam_id FROM exams WHERE exam_name=?`,[Exam])
        if(ExamRows.length===0) return res.status(400).json({success:false,message:"Upload Results for the selected term!"})
        
        ExamRows.forEach(exams=>{
           examId=exams.exam_id
        })


        const [classResult]=await db.execute(`SELECT class_name FROM classes WHERE email=?`,[teachersEmail])
        if(classResult.length===0) return res.status(400).json({success:false,message:"Not authorised for this action"})
        
        classResult.forEach(classes=>{
           ClassName=classes.class_name
        })

        const [resultsRows]=await db.execute(`SELECT results*.,students.admission_number,
                                                students.gender,students.first_name,
                                                students.last_name,students.grade
                                                FROM results
                                                JOIN students ON results.admission_number=students.admission_number
                                                WHERE students.grade=?,results.term_id=?,results.exam_id=?,results.year_name=?`,
                                              [ClassName,termId,examId,academicYear])
        if(resultsRows===0)  return res.status(400).json({success:false,message:"Failed"})                                    

    }catch(err){
        console.log(err)
    }
}