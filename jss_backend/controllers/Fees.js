const db=require("../config/db")

module.exports=async(req,res)=>{

    let schoolId;
    let termId;
    const{paymentDate,feeVoteHead,paymentMode,transactionCode,
            amountPaid,depositorName,depositorPhoneNumber,receiptNotes,
            admissionNumber,studentName,termName
    }=req.body

    try{
          const studentSchoolQuery= await db.execute(`SELECT school_id FROM students WHERE admission_number=?`,[admissionNumber]) 
          
          if(!studentSchoolQuery || studentSchoolQuery.length===0) return ""

          studentSchoolQuery.forEach(studentSchool=>{
            schoolId=studentSchool.school_id
          })

          const termQuery= await db.execute(`SELECT term_id FROM terms WHERE term_name=?`,[termName]) 
          
          if(!termQuery || termQuery.length===0) return ""

          termQuery.forEach(terms=>{
            termId=terms.term_id
          })


          const feesQuery= await db.execute(`INSERT INTO fees payment_date,fee_vote_head,payment_mode,
                                            transaction_code,amount_paid,depositor_name,depositor_phone_number,
                                            receipt_notes,admission_number,student_name,term_id,school_id,is_new=1 VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,[

                                                paymentDate,feeVoteHead,paymentMode,transactionCode,
                                                amountPaid,depositorName,depositorPhoneNumber,receiptNotes,
                                                admissionNumber,studentName,termId,schoolId
                                            ]) 
          
          if(!feesQuery || feesQuery.length===0) return res.status(400).json({success:false, message:"failed to update payment details!"})

          
    }catch(error){
        console.error(error)
    }

}