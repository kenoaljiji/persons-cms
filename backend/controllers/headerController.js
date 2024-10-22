import multer from 'multer';
import path from 'path';
import pool from '../db/config.js';

let protocol = process.env.PROTOCOL;

const storage = multer.diskStorage({
  destination: './public/uploads/header',
  filename: function (req, file, cb) {
    // Use a fixed filename for the logo image
    const filename = 'logo' + path.extname(file.originalname); // ensures the extension remains correct
    cb(null, filename);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // for example, 10 MB limit for files
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const isFileTypeAllowed =
      filetypes.test(path.extname(file.originalname).toLowerCase()) &&
      filetypes.test(file.mimetype);
    if (isFileTypeAllowed) {
      cb(null, true);
    } else {
      cb('Error: Only images are allowed! (JPEG, JPG, PNG, GIF)');
    }
  },
});

export const updateHeaderConfig = async (req, res) => {
  const { routes } = req.body;
  const logoImgPath = req.file
    ? `${protocol}://${req.get('host')}/api/uploads/header/${req.file.filename}`
    : null;

  let conn;
  try {
    conn = await pool.getConnection();
    // Perform the query and check for results
    const result = await conn.query(
      `SELECT id FROM header_config WHERE id = 1`
    );

    // Check if any rows exist
    if (result && result.length > 0) {
      console.log('Updating existing record');
      await conn.query(
        `UPDATE header_config SET routes=?, logo_img_path=IFNULL(?, logo_img_path) WHERE id=1`,
        [JSON.stringify(routes), logoImgPath]
      );
    } else {
      console.log('Inserting new record');
      await conn.query(
        `INSERT INTO header_config (id, routes, buttons, logo_img_path) VALUES (1, ?, ?)`,
        [JSON.stringify(routes), logoImgPath]
      );
    }
    res.json({ message: 'Header configuration updated successfully' });
  } catch (error) {
    console.error('Failed to update header configuration:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  } finally {
    if (conn) {
      conn.release();
    }
  }
};

// Your route handler
export const getHeaderConfig = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM header_config WHERE id=1');
    conn.release();

    // Check if rows is not an array and make it an array if it's not
    const results = Array.isArray(rows) ? rows : [rows];

    if (results.length > 0) {
      const config = results[0];

      // Parse routes and buttons from JSON strings to objects
      const routes = JSON.parse(config.routes);

      res.json({
        id: config.id,
        routes: routes,
        logoImgPath: config.logo_img_path,
      });
    } else {
      res.status(404).json({ error: 'Configuration not found' });
    }
  } catch (error) {
    console.error('Failed to fetch header config:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
};
