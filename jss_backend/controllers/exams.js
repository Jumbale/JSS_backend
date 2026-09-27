const db=require('../config/db')

module.exports=async(req,res)=>{
    console.log(req.body)
    let termId;
    let totalExams
    const {examName,examStatus,termName,examDate}=req.body
    try{
        
        const [termRows]=await db.execute(`SELECT term_id FROM terms WHERE term_name=?`,[termName])
        if(termRows.length===0) return res.status(400).json({success:false,message:"Error..."})
            termRows.forEach(term=>{
               termId=term.term_id; 
        })

        const [termExistenceRows]=await db.execute(`SELECT COUNT(*) AS total_exams FROM exams WHERE exam_name=? AND term_id=?`,[examName,termId])
            if(!termExistenceRows||termExistenceRows.length===0)return res.status(500).json({success:false})
            termExistenceRows.forEach(exams=>{
                totalExams=exams.total_exams
            })

            console.log(totalExams)
             
            if(totalExams>=1)return res.status(400).json({message:"Exam already recorded!"})


        const [examRows]=await db.execute(`INSERT INTO exams(exam_name,exam_status,term_id,exam_data) VALUES(?,?,?,?)`,
                                            [examName,examStatus,termId,examDate])
        if(examRows.length===0) return res.status(400).json({success:false,message:"Exam Not Added, Try Again!"})
            res.status(201).json({success:true,message:"Exam Added!"})


    }catch(err){
        console.log(err)
    }
}