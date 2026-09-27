const multer=require('multer')

module.exports=()=>{
 const storage=multer.diskStorage({
    destination:'resources/uploads/schoolPhotos',
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }
 })

  return multer({storage})
}