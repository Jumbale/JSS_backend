
const db=require('../config/db')


const verifyField=require('../utils/empty_fields')



module.exports= async(req,res)=>{
    console.log(req.body)

    let academicYearId;
    let totalTerms;

    const connection=await db.getConnection();
     //console.log("hello")

    const {YearName,YearStatus,TermName,AcademicYear,StartDate,EndDate}=req.body;

    if(verifyField(YearName)|| verifyField(YearStatus)
       || verifyField(TermName) || verifyField(AcademicYear)
       || verifyField(StartDate) || verifyField(EndDate)
      ) return res.status(401).json({message:"Fill all fields!"})

    

    try{
         const [academicYearRows]=await db.execute(`SELECT academic_year_id FROM academic_years WHERE year_name=?`,[YearName])
            if(!academicYearRows||academicYearRows.length===0)res.status(500).json({success:false})

                console.log(academicYearRows)

                academicYearRows.forEach(years=>{
                    //console.log(years.academic_year_id)
                      academicYearId=years.academic_year_id
                })

            console.log(academicYearId)
                  
                


            try{
                    await  connection.beginTransaction();
                    const [checkAcademicRows]=await db.execute(`SELECT *FROM academic_years WHERE year_name=?`,[YearName])
                    if(checkAcademicRows.length>0) return res.status(400).json({success:false,message:"Academic year already exists!"})
                
                    const query2="INSERT academic_years (year_name,status) values(?,?)";
                    const [result2]=await db.execute(query2,
                        [
                        req.body.YearName,
                        req.body.YearStatus
                        
                    ]);

                    const [yearsRows]=await db.execute(`SELECT COUNT(*) AS totalTerms FROM terms WHERE term_name=? AND year_id=? `,[TermName,academicYearId])
                        if(yearsRows.length===0) return res.status(400).json({success:false})
                        yearsRows.forEach(year=>{
                            totalTerms=year.totalTerms
                        })

                        if(totalTerms>=1) return res.status(400).json({success:false, message:"Term already recorded!"})





                    const yearId=result2.insertId

                    const query="INSERT INTO terms (year_id,term_name,start_date,end_date) values(?,?,?,?)";
                        await db.execute(query,
                            [
                            yearId,
                            req.body.TermName,
                            req.body.StartDate,
                            req.body.EndDate  
                        ]);

                        await connection.commit();

                        return res.status(201).json({
                        message:"Data saved!"})

            }catch(err){
                console.log("Error: "+err.message)
                await connection.rollback();

                return res.status(500).json({message:"server error"})

            }
            finally{
                connection.release();
            }

    }
    catch(err){
        res.status(500).json({message:"Invalid request"})
        
    }
    
    
}




