module.exports=(phoneNumber)=>{
 const validatedPhone=/^\d{10}$/.test(phoneNumber);
 return validatedPhone;
}