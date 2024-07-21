import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/product_images/');
    },
    filename: function (req, file, cb) {
        cb(null, "product-" + Date.now() + '-' + uuidv4() + "-" + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
}).array("images")


const handleUploads = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error', message: err.message });
        }
        next();
    });
}

export { handleUploads, upload };