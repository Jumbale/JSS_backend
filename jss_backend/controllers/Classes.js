const db=require('../config/db')

const checkTSC=require('../utils/verify_tsc')

module.exports=async(req,res)=>{
    console.log(req.body)
    try{
       const{className,teachersTSC}=req.body

       const verifyTSC=checkTSC(req.body.teachersTSC)
       if(!verifyTSC) res.status(401).json({message:"Invalid TSC Number!"})

       const [result2]=await db.execute(`SELECT * FROM teachers WHERE tsc_number=?`,[req.body.teachersTSC])


       const teacherData=result2.find(TSC=>TSC.tsc_number===req.body.teachersTSC)

      if(!teacherData) return res.status(401).json({message:"Details mismatch, Please Retry!"})

     //   console.log(teacherData.email)

       

       

       const query=`INSERT INTO classes (class_name,teacher_tsc_number,email) values(?,?,?)`

       const result=await db.execute(query,[className,teachersTSC,teacherData.email])

       if(!result) return res.status(401).json({message:"Failed!"})

            res.status(200).json({message:"Class added!"})


    }catch(err){
        console.log(err)
        res.status(500).json({message:"server error!"})

    }

}