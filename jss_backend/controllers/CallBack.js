require('dotenv').config()

const db=require('../config/db')


module.exports=async(req,res)=>{
  const stkCallback = req.body.Body.stkCallback;

  if (stkCallback.ResultCode === 0) {
    // Success: pull out the receipt number, amount, phone from cb.CallbackMetadata.Item
    const {
    CheckoutRequestID,
    ResultCode,
    ResultDesc,
    CallbackMetadata,
  } = stkCallback;

  try {
    // 1. Look up the pending transaction created during STK Push
    const [rows] = await db.execute(
      "SELECT id, status FROM mpesa_transactions WHERE checkout_request_id = ? LIMIT 1",
      [CheckoutRequestID]
    );

    console.log(rows)

    if (rows.length === 0) {
      console.warn("Callback received for unknown CheckoutRequestID:", CheckoutRequestID);
      return res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    // 2. Idempotency check: avoid overwriting an already finalized payment
    if (rows[0].status !== "PENDING") {
      return res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    // 3. Determine outcome (ResultCode === 0 means payment succeeded)
    const isSuccess = Number(ResultCode) === 0;
    const status = isSuccess ? "PAID" : "FAILED";

    let receiptNumber = null;
    if (isSuccess) {
      const items = CallbackMetadata?.Item || [];
      const metadata = Object.fromEntries(
        items.map((item) => [item.Name, item.Value])
      );
      receiptNumber = metadata.MpesaReceiptNumber || null;
    }

    // 4. Update the row in MySQL
    await db.execute(
      `UPDATE mpesa_transactions
       SET status = ?,
           mpesa_receipt_number = ?,
           result_desc = ?
       WHERE checkout_request_id = ?`,
      [status, receiptNumber, ResultDesc, CheckoutRequestID]
    );

    

    // 5. Always return HTTP 200 after a successful DB update
    return res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (err) {
    console.error("Failed to process M-Pesa callback:", err.message);
    // Return 500 only if your DB operation failed so Daraja can retry delivery
    return res.status(500).json({ ResultCode: 1, ResultDesc: "Internal server error" });
  }


  }

}