require('dotenv').config()

const AfricasTalking=require('africastalking')({
    apiKey:process.env.AFRICAS_TALKING_API,
    username:process.env.AFRICAS_TALKING_USERNAME
})

const sms=AfricasTalking.SMS

module.exports=async(req,res)=>{
    const {phoneNumber,message}=req.body

    console.log(phoneNumber,message)
    try{
        const options={
            to:phoneNumber,
            message:message,
            //from: SENDER_ID - will use this once the alphanumeric SID/short code from safaricom is approved
        }
        const response=await sms.send(options)

        //console.log(username)

        const recipient=response?.SMSMessageData?.Recipients?.[0]

        if(!recipient||recipient.status!=="Success") return res.status(422).json({error:`sms rejected: ${recipient?.status}`,
                                                                                    details:recipient})

            return res.status(200).json({
                status:"message sent!",
                to:phoneNumber,
                cost:recipient?.cost
            })

    }catch(err){
        console.error(err)
        res.status(500).json({message:"Failed to communicate to the  sms gateway"})
    }
}