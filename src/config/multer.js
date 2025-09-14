const { builtinModules } = require('module');
const multer = require('multer');
const path = require('path')

//Store uploaded files in /uploads temporarily
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});



//Only allow images
const fileFilter = (req, file, cb) => {
    if( file.mimetype.startsWith('image')){
        cb(null, true)
    }else{
        cb(new Error('Only image files are allowed'), false)
    }
}


const upload = multer({ storage, fileFilter });

module.exports = upload;