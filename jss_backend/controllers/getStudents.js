const db=require('../config/db')


module.exports=async(req,res)=>{
      let schoolId;
      //let schoolInfoId;

      const {schoolName}=req.params

      console.log(schoolName)
    try{
        // const query=`SELECT students.*, parents.parents_first_name,parents.parents_last_name,
         // parents.parents_email,parents.parents_phone_number,parents.parents_nationality from students
          //LEFT JOIN parents ON students.admission_number=parents.child_number WHERE students.status='active'`;

 
        const [schoolRows]=await db.execute(`SELECT id FROM schools WHERE school_name=?`,[schoolName])
        //console.log()
        if(schoolRows===0) return ""
            schoolRows.forEach(school=>{
            schoolId=school.id
        })

        console.log(schoolId)

        //const schoolInfoRows=await db.execute(`SELECT info_id FROM school_information WHERE =?`,[schoolId])
       // if(schoolInfoRows===0) return ""
        //schoolInfoRows.forEach(schoolInformation=>{
           // schoolInfoId=schoolInformation.info_id
            //})

          const status="active";

         const[rows]=await db.execute(`SELECT * FROM students WHERE status=? AND school_id=?` ,[status,schoolId]);

         if(!rows) return res.status(500).json({message:"Request failed!"})

            
            res.status(200).json(rows)

            

            

    }catch(err){
         console.log(err) 
         return res.status(500).json({message:"Request failed!"})
          
    }
 

}