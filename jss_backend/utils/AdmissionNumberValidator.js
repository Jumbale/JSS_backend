
module.exports=(admissionNumber)=>{
    
 if(!admissionNumber.length) {
    console.log("No value provided")
 }

 const validAdmissionNumber=/^[A-Z]{2,8}\d{2,10}$/.test(admissionNumber)

return validAdmissionNumber



}