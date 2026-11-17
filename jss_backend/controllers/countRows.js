 const db=require('../config/db')
module.exports=async(req,res)=>{

    const {schoolName}=req.body

    let totalTeachers;
    let totalClasses;
    let upcomingExam;
    let ongoingExam;
    let completedExam;
    let schoolId;
    try{
        const getIdQuery=await db.execute(`SELECT school_id from school_information WHERE school_name=?`,[schoolName])

        if(!getIdQuery||getIdQuery.length===0) return ""
        
        getIdQuery.forEach(schoolInfo=>{
            schoolId=schoolInfo.school_id
        })
        const query=`SELECT
                            (SELECT COUNT(*) FROM teachers WHERE school_id='${schoolId}') AS total_teachers,
                            (SELECT COUNT(*) FROM classes WHERE school_id='${schoolId}' ) AS total_classes,
                            (SELECT COUNT(*) FROM exams WHERE exam_status='upcoming' AND school_id='${schoolId}') AS upcoming_exam,
                            (SELECT COUNT(*) FROM exams WHERE exam_status='ongoing' AND school_id='${schoolId}') AS ongoing_exam,
                            (SELECT COUNT(*) FROM exams WHERE exam_status='completed' AND school_id='${schoolId}') AS completed_exam
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