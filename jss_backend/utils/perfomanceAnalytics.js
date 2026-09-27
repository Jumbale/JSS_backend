module.exports=(score)=>{
  console.log("This is performanceAnal..."+score)
  let marks=0;
  let overallLevel;

  

  score.forEach((subjectScore)=>{
    marks+=subjectScore


  })

  let averageScore=marks/11

  const totalSubjects=score.length;

  if(averageScore>=80){
        overallLevel="EE"
  }else if(averageScore>=60){
        overallLevel="ME"
  }else if(averageScore>=40){
        overallLevel="AE"
  }else if(averageScore<40){
       overallLevel="BE"
  }

  return{
    marks,
    averageScore,
    totalSubjects,
    overallLevel

  }
}