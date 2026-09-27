const db=require('../config/db')

module.exports=async(req,res)=>{

    console.log(req.params.teachersEmail)
    let ClassName;
  
    const{teachersEmail}=req.params
    try{
        const [classResult]=await db.execute(`SELECT class_name FROM classes WHERE email=?`,[teachersEmail])
        if(classResult.length===0) return res.status(400).json({success:false,message:"Not authorised for this action"})
        
        classResult.forEach(classes=>{
           ClassName=classes.class_name
        })

        const [fetchStudentsQueryResult]=await db.execute(`SELECT *FROM students WHERE grade=?`,[ClassName])
        if(fetchStudentsQueryResult===0) return res.status(400).json({success:false})

        res.status(200).json(fetchStudentsQueryResult)

       
    }catch(err){

    }

}

