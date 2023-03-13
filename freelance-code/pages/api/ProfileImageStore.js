import upload from '../../middleware/multer';
import connection from '../../config/database';


export default function handler(req, res) {
    upload.single('image')(req, res, (err) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        const { filename } = req.file;
        const { name } = req.body;
        const query = `INSERT INTO services (name, filename) VALUES (?, ?)`;
        connection.query(query, [name, filename], (err, results) => {
          if (err) {
            res.status(500).json({ message: 'Error uploading image to database' });
          } else {
            res.status(200).json({ message: 'Image uploaded successfully' });
          }
        });
      }
    });
  }