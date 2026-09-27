const db=require('../config/db')


module.exports=async(req,res)=>{
    try{
        // const query=`SELECT students.*, parents.parents_first_name,parents.parents_last_name,
         // parents.parents_email,parents.parents_phone_number,parents.parents_nationality from students
          //LEFT JOIN parents ON students.admission_number=parents.child_number WHERE students.status='active'`;

          const status="active";

         const[rows]=await db.execute(`SELECT * FROM students WHERE status=?`,[status]);

         if(!rows) return res.status(500).json({message:"Request failed!"})

            
            res.status(200).json(rows)

            

            

    }catch(err){
         console.log(err) 
         return res.status(500).json({message:"Request failed!"})
          
    }
 

}