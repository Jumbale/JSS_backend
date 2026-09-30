const LoginDetails=require('../controllers/desktop_login')



module.exports=async()=>{
    console.log("Data")
    const{schoolName}=await LoginDetails()
    const savedSchool=schoolName
    console.log(savedSchool)

    

    return {SchoolName:schoolName}
}