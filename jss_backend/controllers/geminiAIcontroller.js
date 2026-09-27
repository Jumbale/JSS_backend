const askGemini=require('../utils/geminiAIservices')
const db=require('../config/db')

module.exports=async(req,res)=>{
    const{question}=req.body
    console.log(question)
    if(!question||question.trim()==="") return res.status(400).json({success:false,message:"Please provide a prompt"})

        try{
            const [[studentsRowData],[teachersRowData],[classesRowData],[resultsRows]]=await Promise.all([
                                db.execute(`SELECT * FROM students`),
                                db.execute(`SELECT * FROM teachers`),
                                db.execute(`SELECT * FROM classes`),
                                db.execute(`SELECT * FROM results`)

                                                    
            ])
                                                    
        

            if(!studentsRowData.length&&!teachersRowData&&!classesRowData &&!classesRowData) return res.status(500).json({success:false})
            
            const dataBase={studentsRowData,teachersRowData,classesRowData,resultsRows}

            const answer=await askGemini(question,dataBase)

            console.log(answer)

            return res.status(200).json({message:answer})

        }catch(err){
            console.log(err)
            res.status(500).json({message:"Unable to process your question..."})
        }

        
}