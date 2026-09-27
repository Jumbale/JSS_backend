const db=require('../config/db')

module.exports=async(req,res)=>{
    const {AcademicYear,term,exams}=req.params
    console.log(req.params)

 try{
    
    const query=`SELECT results.*,students.gender,students.first_name,students.last_name,
                subjects.subject_name,exams.exam_id,exams.exam_name,
                exams.exam_status,
                terms.term_id,terms.term_name
                FROM results 
                JOIN students ON results.admission_number=students.admission_number
                JOIN subjects ON results.subject_code=subjects.subject_code
                JOIN exams ON results.exam_id=exams.exam_id
                JOIN terms ON results.term_id=terms.term_id
                WHERE results.year_name=? AND terms.term_name=? AND exams.exam_name=? AND exams.exam_status='completed'`
    const [rows]=await db.execute(query,[AcademicYear,term,exams])
    console.log(rows)
    if(rows.length===0)return res.status(400).json({message:"No Records Found"})

    res.status(200).json(rows)
    
 }catch(err){
    console.log(err)
 }
}