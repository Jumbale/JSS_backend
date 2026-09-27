const db=require('../config/db')

module.exports=async(req,res)=>{
    try{
        const query=`SELECT * FROM subjects`
        const[subjects]=await db.execute(query)

        if(subjects.length===0) return res.status(401).json({message:"Failed!"})

        res.status(200).json(subjects)

    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Unexpected error occurred!"})

    }
}