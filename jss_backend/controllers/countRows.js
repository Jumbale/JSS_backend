 const db=require('../config/db')
module.exports=async(req,res)=>{

    let totalTeachers;
    let totalClasses;
    let upcomingExam;
    let ongoingExam;
    let completedExam;
    try{
        const query=`SELECT
                            (SELECT COUNT(*) FROM teachers) AS total_teachers,
                            (SELECT COUNT(*) FROM classes) AS total_classes,
                            (SELECT COUNT(*) FROM exams WHERE exam_status='upcoming') AS upcoming_exam,
                            (SELECT COUNT(*) FROM exams WHERE exam_status='ongoing') AS ongoing_exam,
                            (SELECT COUNT(*) FROM exams WHERE exam_status='completed') AS completed_exam
                             `
        const [rowCount]=await db.execute(query)

        console.log(rowCount)
    
    if(!rowCount || rowCount.length===0) return res.status(500).json({success:false})
    
    rowCount.forEach(countedRows => {
        totalTeachers=countedRows.total_teachers
        totalClasses=countedRows.total_classes
        upcomingExam=countedRows.upcoming_exam
        ongoingExam=countedRows.ongoing_exam
        completedExam=countedRows.completed_exam

    });



    return res.status(200).json({totalTeachers:totalTeachers,
                                 totalClasses:totalClasses,
                                 upcomingExam:upcomingExam,
                                 ongoingExam:ongoingExam,
                                 completedExam:completedExam

    })


    }catch(err){
        console.log(err)
    }

}