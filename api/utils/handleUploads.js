import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js'

const FILE_SIZE_LIMIT = 2 * 1024 * 1024; // 2 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => ({
        folder: process.env.CLOUDINARY_ROOT + "/product_images", // Set folder dynamically based on the request
        // format: async () => (file.mimetype === 'image/png' ? 'png' : 'jpg'), // Format based on mimetype
        format: 'jpg', // Format based on mimetype
        public_id: "product-" + Date.now() + '-' + uuidv4(),
    }),
});

// without cloudinary
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/product_images/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, "product-" + Date.now() + '-' + uuidv4() + "-" + file.originalname);
//     }
// });

const upload = multer({
    storage: storage,
    limits: {
        fileSize: FILE_SIZE_LIMIT
    },
    fileFilter: function (req, file, cb) {
        if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
}).array("images")


export { upload };