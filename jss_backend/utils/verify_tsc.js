module.exports=(tsc)=>{
 const validatedTSC=/^\d{5,7}$/.test(tsc);
 return validatedTSC;
}