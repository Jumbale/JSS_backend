const db=require('../config/db')


module.exports=async(req,res)=>{
    try{
         const query="SELECT * FROM users";

         const[rows]=await db.execute(query);

         if(!rows) return res.status(500).json({message:"Request failed!"})

            
            res.status(200).json(rows)

            

            

    }catch(err){
         console.log(err) 
         return res.status(500).json({message:"Request failed!"})
          
    }
 

}