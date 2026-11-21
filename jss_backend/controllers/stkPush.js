require('dotenv').config()
const db = require('../config/db')

module.exports = async (req, res) => {
  const { phoneNumber, Amount,admissionNumber} = req.body

  console.log(req.body)

  let studentId;

  try{
        const [studentsQuery]=await db.execute(`SELECT id from students WHERE admission_number=? LIMIT 1`,[admissionNumber])
        //console.log(studentsQuery)
        if(studentsQuery.length===0) return res.status(400).json({success:false,message:"message not found"})

        
        studentId=studentsQuery[0].id
            
        console.log("This ",studentsQuery[0].id)
  }catch(error){
        console.error(error)
  }

  const {
    DARAJA_CONSUMER_KEY, DARAJA_CONSUMER_SECRET,
    DARAJA_SHORT_CODE, DARAJA_PASSKEY, DARAJA_CALLBACK_URL,
  } = process.env

  try {
    // 1. Access token
    const auth = Buffer.from(`${DARAJA_CONSUMER_KEY}:${DARAJA_CONSUMER_SECRET}`).toString("base64")

    const tokenRes = await fetch(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      { headers: { Authorization: `Basic ${auth}` } }
    )
    if (!tokenRes.ok) {
      return res.status(502).json({ success: false, error: "Could not get M-Pesa token" })
    }
    const { access_token } = await tokenRes.json()



    // 2. STK Push
    const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14)
    const password = Buffer.from(`${DARAJA_SHORT_CODE}${DARAJA_PASSKEY}${timestamp}`).toString("base64")

    const response = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: DARAJA_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Number(Amount),
        PartyA: phoneNumber,
        PartyB: DARAJA_SHORT_CODE,
        PhoneNumber: phoneNumber,
        CallBackURL: DARAJA_CALLBACK_URL,
        AccountReference: admissionNumber,
        TransactionDesc: "Payment for order 123",
      }),
    })

    const data = await response.json()
    console.log(data)

    // 3. Check Daraja accepted it
    if (data.ResponseCode !== "0" || !data.CheckoutRequestID) {
      return res.status(400).json({
        success: false,
        error: data.errorMessage || data.ResponseDescription || "STK Push failed",
      })
    }

    // 4. Save as pending
    await db.execute(
      `INSERT INTO mpesa_transactions (student_id,checkout_request_id, phone, amount, status,account_reference)
       VALUES (?, ?, ?,?, 'pending',?)`,
      [studentId,data.CheckoutRequestID, phoneNumber, Amount,admissionNumber]
    )

    // 5. Respond to your client
    return res.status(200).json({
      success: true,
      message: "Check your phone and enter your M-Pesa PIN",
      checkoutRequestId: data.CheckoutRequestID,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, error: "Something went wrong" })
  }
}