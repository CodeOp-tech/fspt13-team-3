import multer from "multer";
import path from "path";
const db = require("@/server/helper");


export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: "public/documents",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

function checkFileType(file, cb) {
  const filetypes = /doc|docx|pdf|odt|html/;

  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: documents Only!');
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
      console.log(req.file.filename);
      console.log(err);
      return res.status(400).json({ message: err });
    }

    try {
      console.log("ID:", id);
      const data = req.body;
      const docPath = req.file ? `/documents/${req.file.filename}` /* req.file.buffer */ : null;

      console.log("File:", req.file, req.file.buffer );
      //testing updatingpdf
      if (docPath) {
        const services = await db(`SELECT * FROM services WHERE user_id = ${id};`);
          if (services && services.resume) {
            const oldDocPath = services.resume.replace(/^\//, '');
            fs.unlink(`public/${oldDocPath}`, (err) => {
              if (err) console.log(err);
              console.log(`${oldDocPath} was deleted`);
            });
          }


        await db(
          `UPDATE services SET resume = '${docPath}' WHERE user_id = ${id};`
        );
      }
              
      res.json({
        status: "success",
        message: "Document and data uploaded successfully",
        data: data,
        docPath: docPath,
      });
    //}
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
  });
}
