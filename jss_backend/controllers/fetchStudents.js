const db=require('../config/db')

module.exports=async(req,res)=>{

  
    try{

        


        const query=`SELECT * FROM classes`
        const [result]=await db.execute(query)

        if(!result) return res.status(401).json({message:"Failed!"})

            res.status(200).json({result})
        

    }catch(err){
        console.log(err)
        res.status(500).json({meesage:"server error"})

    }
}