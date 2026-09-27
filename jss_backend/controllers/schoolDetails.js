const emailValidation=require('../utils/verify_email');
const phoneNumberValidation=require('../utils/verify_phonenumber');

const db=require('../config/db')
module.exports=async(req,res)=>{
        
console.log(req.body)
console.log(req.file)

const {SchoolName,BoxNumber,Town,County,
        Country,Telephone,Email,Motto,Principal,BoxCode}=req.body

if(!req.file) return res.status(400).json({success:false,
    message:"Please resend file!"
})

const photoPath=req.file.path

if(!emailValidation(req.body.Email)) return res.status(400).json({message:"Invalid Email!"})

if(!phoneNumberValidation(req.body.Telephone))return res.status(400).json({message:"Invalid Telephone Number!"})
try{
    const query=`INSERT INTO school_information (
                    school_name,box_number,box_code,
                    town,county,country,telephone_number,email,
                    motto,principal,school_logo) VALUES(?,?,?,?,?,?,?,?,?,?,?)`
    const [results]=await db.execute(query,[SchoolName,BoxNumber,BoxCode,
                                        Town,County,Country,Telephone,Email,
                                        Motto,Principal,photoPath
    ])

    if(!results) res.status(400).json({success:false,
                                        message:"Failed!"
    })

    res.status(200).json({success:true,
                        message:"school information added!"
    })
}catch(err){
    console.log(err)

}

}