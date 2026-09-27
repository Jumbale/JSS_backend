const db=require('../config/db')

module.exports=async(res,req)=>{
    try{
       const{yearName,termName,startDate,endDate}=req.body

       const query=`INSERT INTO terms year_name,term_name,start_date,end_date values(?,?,?,?)`

       const result=await db.execute(query,[yearName,termName,startDate,endDate])

       if(result.length===0) return res.status(401).json({message:"Failed!"})

        res.status(200).json({message:"Term added!"})


    }catch(err){
        res.status(500).json({message:"server error!"})

    }

}