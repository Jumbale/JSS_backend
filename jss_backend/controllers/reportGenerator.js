
const puppeteer=require('puppeteer')
const db=require('../config/db')

const ReportTemplate=require('../utils/reportTemplate')


module.exports=async(req,res)=>{
    try{
        const {admNumber,Terms,academicYears,schoolName,examName}=req.params
        console.log(req.params)
    

    const query=`SELECT  results.*,
                students.admission_number,
                students.first_name AS student_first_name,
                students.last_name AS student_last_name,
                students.grade,
                students.gender,
                terms.term_id,
                terms.term_name,
                subjects.subject_name,
                school_information.info_id,
                teachers.tsc_number,
                teachers.first_name,
                teachers.last_name,
                teachers.subject,
                exams.exam_id,
                exams.exam_name,
                academic_years.academic_year_id,
                academic_years.year_name
                FROM results 
                JOIN teachers ON results.teacher_tsc_number=teachers.tsc_number
                JOIN students ON results.admission_number=students.admission_number
                JOIN terms ON results.term_id=terms.term_id
                JOIN academic_years ON results.year_name=academic_years.year_name
                JOIN school_information ON results.school_id=school_information.info_id
                JOIN exams ON results.exam_id=exams.exam_id
                JOIN subjects ON results.subject_code=subjects.subject_code

                WHERE results.admission_number=? AND terms.term_name=? AND results.year_name=? 
                AND school_information.school_name=? AND academic_years.status='active' AND exams.exam_status='completed'`

    const [result]=await db.execute(query,[admNumber,Terms,academicYears,schoolName,examName]);
    console.log("Results: "+result)

    const reportCardData=result.map(studentReport=>{
       return{
             resultsId:studentReport.result_id,
             admissionNumber:studentReport.admission_number,
             subjectCode:studentReport.subject_code,
             termId:studentReport.term_id,
             teacherTSC:studentReport.teacher_tsc_number,
             yearName:studentReport.year_name,
             score:studentReport.score,
             remarks:studentReport.remarks,
             dateRecorded:studentReport.date_recorded,
             teachersTscNumber:studentReport.tsc_number,
             teachersFirstName:studentReport.first_name,
             teachersLastName:studentReport.last_name,
             teacherSubject:studentReport.subject,
             studentFirstName:studentReport.student_first_name,
             studentLastName:studentReport.student_last_name,
             studentGrade:studentReport.grade,
             studentGender:studentReport.gender,
             termName:studentReport.term_name,
             schoolId:studentReport.info_id,
             examName:studentReport.exam_name,
             subjectName:studentReport.subject_name
       }

    })

    console.log(reportCardData)

    const html=await ReportTemplate(reportCardData);

      const browser = await puppeteer.launch({
            headless: true
        });

        const page = await browser.newPage();

        await page.setContent(html, {
            waitUntil: "networkidle0"
        });

        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "20mm",
                bottom: "20mm",
                left: "10mm",
                right: "10mm"
            }
        });

        await browser.close();

        res.set({"Content-Type":"application/pdf",
            "Content-Disposition":"inline"

        });
        res.status(200).send(pdf);

}catch(err){
    console.error(err);

        res.status(500).json({
            message: "Failed to generate report card"
        });

}

}