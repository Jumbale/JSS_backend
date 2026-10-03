const askGemini=require('../utils/geminiAIservices')
const db=require('../config/db')

module.exports=async(req,res)=>{
    const{question,school}=req.body

    console.log(req.body)

    let schoolId;
    let schoolInfoId;
    console.log(question)
    if(!question||question.trim()==="") return res.status(400).json({success:false,message:"Please provide a prompt"})

        try{
            const [schoolRows]=await db.execute(`SELECT id FROM schools WHERE school_name=? `,[school])
            console.log()
              if(schoolRows.length===0) return ""

              schoolRows.forEach(schools=>{
              schoolId=schools.id
            })

            const [schoolsInfoRows]=await db.execute(`SELECT info_id FROM school_information WHERE school_id=? `,[schoolId])
            console.log(schoolsInfoRows)
              if(schoolsInfoRows.length===0) return ""

              schoolsInfoRows.forEach(schoolInfo=>{
              schoolInfoId=schoolInfo.info_id
            })

                console.log("School id",schoolId)
                console.log("School information if",schoolInfoId)





            const [[studentsRowData],[teachersRowData],[classesRowData],[resultsRows]]=await Promise.all([
                                db.execute(`SELECT * FROM students WHERE school_id=?`,[schoolId]),
                                db.execute(`SELECT * FROM teachers WHERE school_id=?`,[schoolId]),
                                db.execute(`SELECT * FROM classes WHERE school_id=?`,[schoolId]),
                                db.execute(`SELECT * FROM results WHERE school_id=?`,[schoolInfoId])

                                                    
            ])
                
           // res.send(studentsRowData,teachersRowData)
           console.log(studentsRowData.length)
          
        

            if(!studentsRowData.length&&!teachersRowData.length&&!classesRowData.length &&!classesRowData.length) return res.status(500).json({success:false})
            
            const dataBase={studentsRowData,teachersRowData,classesRowData,resultsRows}

             console.log(dataBase)

            const answer=await askGemini(question,dataBase)

            console.log(answer)

            return res.status(200).json({message:answer})

        }catch(err){
            console.log(err)
            res.status(500).json({message:"Unable to process your question..."})
        }

        
}