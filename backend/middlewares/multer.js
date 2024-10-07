

import multer from "multer";


// Define storage with both destination and filename
const storage = multer.diskStorage({

  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});


const upload = multer({
  storage: storage,
});

export default upload;