const multer=require('multer');
const path=require('path')

let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
            cb(null,'public/upload')
    },
    filename:(req,file,cb)=>{
            cb(null, Date.now() +file.originalname);
    }
})

module.exports=multer({storage})