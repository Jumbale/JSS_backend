const db=require('../config/db')

module.exports=async(res,req)=>{
    try{
       const{subjectName,subjectCode}=req.body

       const query=`INSERT INTO subjects subject_name,subject_code values(?,?)`

       const result=await db.execute(query,[subjectName,subjectCode])

       if(!result) return res.status(401).json({message:"Failed!"})

        res.status(200).json({message:"Subject added!"})


    }catch(err){
        res.status(500).json({message:"server error!"})

    }

}