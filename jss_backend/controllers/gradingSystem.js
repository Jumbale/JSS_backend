const db=require('../config/db')

module.exports=async(res,req)=>{
    try{
       const{minMark,maxMark,Code,Description}=req.body

       const query=`INSERT INTO grading_system  min_mark,max_mark,code,description values(?,?,?,?)`

       const result=await db.execute(query,[minMark,maxMark,Code,Description])

       if(!result) return res.status(401).json({message:"Failed!"})

        res.status(200).json({message:"Grading system added!"})


    }catch(err){
        res.status(500).json({message:"server error!"})

    }

}