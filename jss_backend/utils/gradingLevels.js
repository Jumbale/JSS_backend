module.exports=(score)=>{
        if(score>=80){
            return {
                code:"EE",
                description:"Exeeding Expectations"
            }
        }else if(score>=60){
                 return {
                code:"ME",
                description:"Meeting Expectations"
            }
        }else if(score>=40){
                 return {
                code:"AE",
                description:"Approaching Expectations"
            }
        }else if(score<40){
                 return {
                code:"BE",
                description:"Below Expectations"
            }
        }
    
}