module.exports=(email)=>{
 const validatedEmail=/^\S+@\S+\.\S+$/.test(email);
 return validatedEmail;
}

