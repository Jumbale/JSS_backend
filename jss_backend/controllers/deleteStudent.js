
 const db=require('../config/db');
module.exports=async(req,res)=>{
  console.log(req.body)
  //console.log(req.body.admission_number)

    try{
       const admNumber=req.body.admission_number;
        

        //console.log(admNumber)

       // console.log(admNumber)

    const [results]=await db.execute(`UPDATE students SET status='inactive' WHERE admission_number=?`,[admNumber])
     if(results.affectedRows===0) return res.status(403).json({message:"Delete failed!"})
           
        return res.status(200).json({message:"student deleted!"})

    }catch(err){
        res.status(500).json({message:"server error"})
        console.log(err)
    }
    

}