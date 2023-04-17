
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    limits: { fileSize: 1 * 1000 * 1000 }, // 5 MB
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },

    filename: function (req, files, cb) {
        cb(null, files.fieldname + '_' + Date.now() + path.extname(files.originalname))
        let fileExtension = (files.originalname.split('.')[files.originalname.split('.').length - 1]).toLowerCase(); // convert extension to lower case
        if (["png", "jpg", "jpeg"].indexOf(fileExtension) === -1) {
            //req.mimtype = false;
            cb(null, 'false');
        }
    },
    fileFilter: (req, files, cb) => {
        if (files.mimetype == "image/png" || files.mimetype == "image/jpg" || files.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            throw Error('Only .png, .jpg and .jpeg format allowed!');
            //return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// const upload = multer({
//     storage: storage,
//     // fileFilter: fileFilter,
//     limit: {
//         fieldSize: 1 * 1024 * 1024 //1 MB
//     }
// });

module.exports = multer({ storage: storage });