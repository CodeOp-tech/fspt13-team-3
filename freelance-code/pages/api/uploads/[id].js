import multer from 'multer';
import path from 'path';
const db = require("@/server/helper");


export const config = {
    api: {
        bodyParser: false,
    },
};
  

const storage = multer.diskStorage({
    destination: "public/images",
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + '-' + Date.now() + path.extname(file.originalname)
      );
    },
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single('file'); //used to be 'image'

  function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }

  
  export default function handler(req, res) {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    
    upload(req, res, async function (err) {
        const { id } = req.query;
      if (err) {
        console.log(req.file.filename)
        console.log(err);
        return res.status(400).json({ message: err });
      }

      try {
      console.log("ID:", id);
      const data = req.body;
      const imagePath = req.file ? `/images/${req.file.filename}` : null;
      console.log("File:", req.file);
      //if (imagePath) {

        //testing updating image
        if (imagePath) {
          const user = await db(`SELECT * FROM user_table WHERE user_id = ${id};`);
          if (user && user.avatar) {
            const oldImagePath = user.avatar.replace(/^\//, '');
            fs.unlink(`public/${oldImagePath}`, (err) => {
              if (err) console.log(err);
              console.log(`${oldImagePath} was deleted`);
            });
          }
       
        await db(
          `UPDATE user_table SET avatar = '${imagePath}' WHERE user_id = ${id};`
        );
      }
      res.json({
        status: 'success',
        message: 'Image and data uploaded successfully',
        data: data,
        imagePath: imagePath,
      });
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
    });
  }
  

  