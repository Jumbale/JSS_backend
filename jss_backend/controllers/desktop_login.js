
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

require('dotenv').config()


const db=require('../config/db')
const DesktopAuthorization=require('../middleware/desktop_auth')
const securePassword=require('../utils/passwordHashed')


module.exports=async(req,res)=>{
    //const{tscNumber,currentPassword,newPassword,passwordRepeat}=req.body;
    console.log(req.body)

    

   
    try{
        if(req.body.newPassword){
            console.log(req.body)
            
            if(req.body.newPassword!==req.body.passwordRepeat) return res.status(401).json({message:"Passwords don't match!"})
                const Role="teacher"
                const query4=`SELECT * FROM users WHERE role=?`
                const[result4]=await db.execute(query4,[Role])
                const usersData=result4.find(userData=>userData.must_change_password===1 && userData.email===req.body.Email)

                const userEmail=usersData.email

                 console.log(userEmail)

               

                if(!await bcrypt.compare(req.body.currentPassword,usersData.password)) return res.status(401).json({message:"Wrong password!"})
                     
                const newPswd=await bcrypt.hash(req.body.newPassword,10)

                console.log(userEmail)
                const query3=`UPDATE users SET must_change_password=?,password=? WHERE email=?`
                const [result3]=await db.execute(query3,[0,newPswd,userEmail])

               
                if(!result3) res.status(401).json({message:"failed!"})

                 return res.status(200).json({message:"Password has been reset!"})    
            

        }else{

        if(req.body.Role==="teacher"){
        const query=`SELECT *FROM classes`
        const [results]=await db.execute(query)
        const teacher=results.find(mwalimu=>mwalimu.email===req.body.Email)
        //console.log(teacher.email)

        if(!teacher) return res.status(401).json({message:"You have not been assigned a class, please consult the administrator!"})

        //const hashedPswd=await securePassword(req.body.Password);    
        const query2=`SELECT * FROM users WHERE email=?`
        const [result2]=await db.execute(query2,[req.body.Email])
 
        const users=result2.find(user=>user.email===req.body.Email)

        
        console.log(users)
        if(!(await bcrypt.compare(req.body.Password,users.password))) 
            return  res.status(401).json({message:"Wrong password!"})
      

           

        if(users.must_change_password===1){
            return res.status(200).json({mustChangePassword:true,
                                        loggedIn:false,
                                        role:"teacher"
            })

        }


            return res.status(200).json({
                loggedIn:true,
                mustChangePassword:false,
              role:"teacher"
              })


        }
        
        
        
        else{
        const query="SELECT * FROM users";
        //console.log("checking...")
        const[rows]=await db.execute(query)
        //console.log(rows)
        const user=rows.find(user=>user.email===req.body.Email )
          console.log(user)
        if(!user) return res.status(400).json({message:" Invalid email or password "})
        
        if(user.role!==req.body.Role) return res.status(403).json({message:" Unauthorized Access! "})

        const [schoolRows]=await db.execute(`SELECT id from schools WHERE school_name=?`,[req.body.SchoolName])
        console.log(schoolRows)
        if(schoolRows.length===0) return res.status(400).json({success:false,message:"login failed! school does not exist"})
            // school=req.body.SchoolName
            // console.log("printed...",school)
            
              
            

       
        if(await bcrypt.compare(req.body.Password,user.password)){
            const DesktopUserDetails={username:user.email,role:user.role}
             //console.log(DesktopUserDetails)
            const token=jwt.sign(DesktopUserDetails,process.env.DESKTOP_ACCESS_TOKEN,{expiresIn:"30m"})
            res.status(200).json({token:token,
                                email:user.email
                                             })
        
        }else{
            return res.status(401).json({message:"Wrong password"})
        }

        }
    }
       

            
        //console.log("")
    }catch(err){
         res.status(500).json({message:"check username and try again"})
    }
    
    console.log("this is ",req.body.SchoolName)
    return  {schoolName:req.body.SchoolName}
}