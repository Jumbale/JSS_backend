const db=require('../config/db')
const ReportGenerator=require('../controllers/reportGenerator')
const GradingLevels=require('../utils/gradingLevels')

const perfomanceAnalysis=require('../utils/perfomanceAnalytics')

module.exports=async(reportCardData)=>{
      //console.log(reportCardData)

      const ResultsSummary=[]

     

    


     

       
                

       const rowResults=reportCardData.map(results=>{  
            ResultsSummary.push(results.score)
            return `<tr>
                <td class="subject"> ${results.subjectName}</td>
                <td>${results.score}</td>
                <td class="grade-me">${GradingLevels(results.score).code}</td>
                <td>${GradingLevels(results.score).description}</td>
            </tr>`
        }).join("")

        

         const perfomanceSummary=perfomanceAnalysis(ResultsSummary)
         console.log(perfomanceSummary)

         const{marks,averageScore,totalSubjects,overallLevel}=perfomanceSummary
        
    const studentData=reportCardData[0]

    if(!studentData.admissionNumber) {
        console.log("No record found")
        return "";
    }

    let schoolName;
    let boxNumber;
    let boxCode;
    let town;
    let county;
    let country;
    let telephoneNumber;
    let email;
    let motto;
    let principal;
    let schoolLogo;

    try{
            const [queryResult]= await db.execute(`SELECT * FROM school_information WHERE info_id=? `,[studentData.schoolId]) 

            queryResult.forEach(school=>{
            schoolName=school.school_name
            boxNumber=school.box_number
            boxCode=school.box_code
            town=school.town
            county=school.county
            country=school.country
            telephoneNumber=school.telephone_number
            email=school.email
            motto=school.motto
            principal=school.principal
            schoolLogo=school.school_logo
        })

      }catch(err){
        console.log(err)
      }

      console.log(schoolLogo)
 
 let Logo=`http://localhost:5000/api/jss/${schoolLogo.replace('resources/uploads/schoolPhotos/','')}`

 console.log(Logo)
return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Student Report Card</title>

    <style>
       

        @page {
            size: A4;
            margin: 10mm;
        }

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: freeSans;
            font-size: 12px;
            color: #222;
            background: white;
        }

        .report-card {
            width: 100%;
            max-width: 210mm;
            margin: auto;
        }


        .school-header {
            display: flex;
            align-items: center;
            border-bottom: 3px solid #1f2937;
            padding-bottom: 10px;
        }

        .school-logo {
            width: 75px;
            height: 75px;
            border: 1px solid #aaa;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #666;
            flex-shrink: 0;
        }

        .school-details {
            flex: 1;
            text-align: center;
            padding: 0 15px;
        }

        .school-details h1 {
            margin: 0;
            font-size: 22px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .school-details h2 {
            margin: 4px 0;
            font-size: 14px;
            font-weight: normal;
        }

        .school-details p {
            margin: 2px 0;
            font-size: 10px;
        }

        .school-motto {
            font-style: italic;
            font-weight: bold;
        }


        /* ==============================
           REPORT TITLE
        ============================== */

        .report-title {
            text-align: center;
            margin: 12px 0;
        }

        .report-title h2 {
            margin: 0;
            font-size: 18px;
            text-transform: uppercase;
        }

        .report-title p {
            margin: 4px 0 0;
            font-weight: bold;
            font-size: 12px;
        }


        /* ==============================
           STUDENT INFORMATION
        ============================== */

        .student-info {
            border: 1px solid #444;
            margin-top: 10px;
        }

        .info-title {
            background: #e5e7eb;
            padding: 6px 8px;
            font-weight: bold;
            border-bottom: 1px solid #444;
            text-transform: uppercase;
        }

        .student-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
        }

        .student-item {
            padding: 7px 8px;
            border-right: 1px solid #bbb;
            border-bottom: 1px solid #bbb;
        }

        .student-item:nth-child(3n) {
            border-right: none;
        }

        .student-item strong {
            display: inline-block;
            margin-right: 4px;
        }


        /* ==============================
           PERFORMANCE TABLE
        ============================== */

        .section-title {
            margin-top: 15px;
            margin-bottom: 6px;
            padding: 3px 4px;
            background: #1f2937;
            color: white;
            font-weight: bold;
            text-transform: uppercase;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            table-layout:fixed;
        }

        th,
        td {
            border: 1px solid #555;
            padding: 3px 2px;
            overflow-wrap: break-word;
        }

        th {
            background: #e5e7eb;
            font-weight: bold;
            text-align: center;
        }

        td {
            text-align: center;
        }

        td.subject {
            text-align: left;
            font-weight: 500;
        }

        .grade-ee {
            font-weight: bold;
        }

        .grade-me {
            font-weight: bold;
        }

        .grade-ae {
            font-weight: bold;
        }

        .grade-be {
            font-weight: bold;
        }

        .total-row {
            font-weight: bold;
            background: #f3f4f6;
        }


        /* ==============================
           SUMMARY
        ============================== */

        .summary-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-top: 10px;
        }

        .summary-box {
            border: 1px solid #555;
            text-align: center;
            padding: 8px;
        }

        .summary-label {
            display: block;
            font-size: 10px;
            color: #555;
            margin-bottom: 4px;
        }

        .summary-value {
            font-size: 15px;
            font-weight: bold;
        }


        /* ==============================
           PERFORMANCE LEVEL LEGEND
        ============================== */

        .grading-table {
            margin-top: 8px;
        }

        .grading-table th,
        .grading-table td {
            padding: 5px;
        }



        .attendance-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            border: 1px solid #555;
        }

        .attendance-item {
            padding: 8px;
            text-align: center;
            border-right: 1px solid #555;
        }

        .attendance-item:last-child {
            border-right: none;
        }

        .attendance-item span {
            display: block;
        }

        .attendance-label {
            font-size: 10px;
            margin-bottom: 3px;
        }

        .attendance-value {
            font-weight: bold;
            font-size: 14px;
        }


        

        .comment-box {
            border: 1px solid #555;
            margin-top: 4px;
            min-height: 55px;
            padding: 4px;
        }

        .comment-label {
            font-weight: bold;
            margin-bottom: 8px;
        }


     

        .signatures {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
            margin-top: 10px;
        }

        .signature-box {
            padding-top: 10px;
            border-bottom: 1px solid #222;
        }

        .signature-label {
            margin-top: 5px;
            font-weight: bold;
        }


        

        .footer {
            margin-top: 18px;
            padding-top: 8px;
            border-top: 1px solid #777;
            text-align: center;
            font-size: 9px;
            color: #555;
        }


        

        @media print {

            body {
                background: white;
            }

            .report-card {
                width: 100%;
            }

            .section-title,
            th,
            .info-title {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }

            table {
                page-break-inside: avoid;
            }

            .student-info,
            .summary-grid,
            .attendance-grid,
            .comment-box,
            .signatures {
                page-break-inside: avoid;
            }
        }

    </style>
</head>


<body>

<div class="report-card">



    <div class="school-header">

        <div class="school-logo">
          <img style="width:inherit; height:inherit;" src="${Logo}"/>
        </div>

        <div class="school-details">

            <h1>${schoolName}</h1>


            <p>P.O. Box ${boxNumber} - ${boxCode}, ${town}, ${country}</p>

            <p>
                Tel: ${telephoneNumber} |
                Email:${email}
            </p>

            <p class="school-motto">
                "${motto}"
            </p>

        </div>

    </div>



    <div class="report-title">

        <h2>Student Report Card</h2>

        <p>
            Academic Year: ${studentData.yearName} &nbsp; | &nbsp;
            Term: ${studentData.termName} &nbsp; | &nbsp;
            Exam: ${studentData.examName}
        </p>

    </div>



    <div class="student-info">

        <div class="info-title">
            Student Information
        </div>

        <div class="student-grid">

            <div class="student-item">
                <strong>Name:</strong>
                ${studentData.studentFirstName} ${studentData.studentLastName}
            </div>

            <div class="student-item">
                <strong>Admission No:</strong>
                    ${studentData.admissionNumber}
            </div>

            <div class="student-item">
                <strong>Gender:</strong>
                 ${studentData.studentGender}
            </div>

            <div class="student-item">
                <strong>Class:</strong>
                ${studentData.studentGrade}
            </div>


            <div class="student-item">
                <strong>Class Teacher:</strong>
            ${studentData.teachersFirstName}  ${studentData.teachersLastName}
            
            </div>

        </div>

    </div>


    <div class="section-title">
        Academic Performance
    </div>

    <table>

        <thead>

        <tr>
            <th style="width: 35%;">Subject</th>
            <th style="width: 12%;">Marks</th>
            <th style="width: 12%;">Level</th>
            <th>Performance Description</th>
        </tr>

        </thead>

        <tbody>
            ${rowResults}
        </tbody>

    </table>



    <div class="summary-grid">

        <div class="summary-box">
            <span class="summary-label">Total Marks</span>
            <span class="summary-value">${marks}</span>
        </div>

        <div class="summary-box">
                <span class="summary-label">Average Mark</span>
                <span class="summary-value">${averageScore.toFixed(2)}</span>
        </div>

        <div class="summary-box">
                <span class="summary-label">Overall Level</span>
                <span class="summary-value">${overallLevel}</span>
        </div>

        <div class="summary-box">
                <span class="summary-label">Subjects</span>
                <span class="summary-value">${totalSubjects}</span>
        </div>

    </div>



    <div class="section-title">
        Performance Level Guide
    </div>

    <div style="display:flex; justify-content:space-between;">
        
            <div>
                <div>80 - 100</div>
                <div>EE</div>
                <div>Exceeding Expectations</div>
            </div>
            <div>
                <div>60 - 79</div>
                <div>ME</div>
                <div>Meeting Expectations</div>
            </div>
            <div>
                <div>40 - 59</div>
                <div>AE</div>
                <div>Approaching Expectations</div>
            </div>
            <div>
                <div>0 - 39</div>
                <div>BE</div>
                <div>Below Expectations</div>
            </div>
        

    </div>
<div style="display:grid; grid-template-columns:repeat(3,1fr);column-gap:20px;margin-top:10px;)">
    

    
       
    
    <div style=" border:1px solid black;border-radius:10px;">
            <p style="font-weight:bold; padding-left:5px;">Class Teacher's Comment</p>

     <div style="padding:5px;">

        ${studentData.studentFirstName} ${studentData.studentLastName} has demonstrated good progress this term.
        He should continue working hard, particularly in
        Social Studies, to improve his performance.

     </div>
    </div>
     


    <div style=" border:1px solid black;border-radius:10px;">
        <p style="font-weight:bold; padding-left:5px;">Principal's Comment</p>

        <div style="padding:5px;">
            A commendable performance. Continue working hard
            and maintain good discipline.

         
        </div>

  

    </div>
</div>
    <div class="signatures">

        <div>

            <div class="signature-box"></div>

            <div class="signature-label">
                Class Teacher's Signature
            </div>

            <p>
                Name: ${studentData.teachersFirstName} ${studentData.teachersLastName} 
            </p>

            <p>
                Date: __________________
            </p>

        </div>


        <div>

            <div class="signature-box"></div>

            <div class="signature-label">
                Principal's Signature
            </div>

            <p>
                Name:${principal}
            </p>

            <p>
                Date: __________________
            </p>

        </div>

    </div>


    <!-- =========================================
         FOOTER
    ========================================== -->

    <div class="footer">

        <p>
            This report card is computer generated.
        </p>

    </div>


</div>

</body>
</html>

    `
}
