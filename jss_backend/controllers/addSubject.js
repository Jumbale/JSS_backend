const db=require('../config/db')
const verifyField=require('../utils/empty_fields')

module.exports=async(req,res)=>{
    const{SubjectCode,SubjectName,Department}=req.body

    console.log(req.body)

    if(verifyField(req.body.SubjectCode)|| verifyField(req.body.SubjectName)
           || verifyField(req.body.Department) ) return res.status(401).json({message:"Fill all fields!"})


    try{
        const query=`INSERT INTO subjects (subject_name,subject_code,department) VALUES(?,?,?)`
        await db.execute(query,[req.body.SubjectName,req.body.SubjectCode,req.body.Department])
        return res.status(201).json({message:"Subject added!"})

    }catch(err){
        console.log(err)
       return res.status(500).json({message:"Unexpected error occurred!"})

    }
}