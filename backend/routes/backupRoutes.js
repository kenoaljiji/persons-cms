import express from 'express';
import { createServer } from 'http';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { promisify } from 'util';
import { finished } from 'stream';
import pool from '../db/config.js';
const streamFinished = promisify(finished);
import expressWs from 'express-ws';

const router = express.Router();
expressWs(router); // Initialize WebSocket on the router

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* const __dirname = path.resolve(); */

const app = express();
const server = createServer(app); // Use createServer from 'http' module
expressWs(app, server);

const backupDatabase = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const tables = await conn.query('SHOW TABLES');
    const rootDir = path.join(__dirname, '../'); // Adjust according to where your script is located
    const backupDir = path.join(rootDir, 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    const backupPath = path.join(
      backupDir,
      `backup-${new Date().toISOString().slice(0, 10)}.sql`
    );
    const stream = fs.createWriteStream(backupPath, { encoding: 'utf-8' });

    for (const tableInfo of tables) {
      const tableName = Object.values(tableInfo)[0];
      const data = await conn.query(`SELECT * FROM ${tableName}`);
      if (data.length > 0) {
        const keys = Object.keys(data[0]);
        stream.write(`-- Data for table ${tableName}\n`);
        data.forEach((row) => {
          const values = keys
            .map((key) => `'${row[key]?.toString().replace(/'/g, "''")}'`)
            .join(', ');
          stream.write(
            `INSERT INTO ${tableName} (${keys.join(
              ', '
            )}) VALUES (${values});\n`
          );
        });
      } else {
        stream.write(`-- No data available for table ${tableName}\n`);
      }
    }

    stream.end();
    await streamFinished(stream);

    return backupPath; // Return the path to the created backup file
  } catch (err) {
    console.error('Error during database backup:', err);
    throw err; // Throw error to be handled by route
  } finally {
    if (conn) {
      await conn.end();
    }
  }
};

export const backupBackend = async (ws) => {
  const rootDir = path.join(__dirname, '../');
  const backupsDir = path.join(rootDir, 'backups');

  if (!fs.existsSync(backupsDir)) {
    fs.mkdirSync(backupsDir, { recursive: true });
  }

  const backupFileName = `backup-${new Date().toISOString().slice(0, 10)}.zip`;
  const backupPath = path.join(backupsDir, backupFileName);
  const output = fs.createWriteStream(backupPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  let fileList = [];
  const collectFiles = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
      const fullPath = path.join(dir, file);
      if (fullPath.includes('.env')) {
        // Ensure .env files are included
        fileList.push(fullPath);
      } else if (
        !fullPath.includes('node_modules') &&
        !fullPath.includes('backups')
      ) {
        if (fs.statSync(fullPath).isDirectory()) {
          collectFiles(fullPath);
        } else {
          fileList.push(fullPath);
        }
      }
    });
  };

  collectFiles(rootDir);

  let processedFiles = 0;

  archive.on('entry', (entry) => {
    processedFiles++;
    const progress = Math.round((processedFiles / fileList.length) * 100);
    ws.send(JSON.stringify({ progress }));
    /*  console.log(
      `Processed: ${processedFiles}/${fileList.length}, Progress: ${progress}%`
    ); */
  });

  archive.on('warning', (err) => {
    console.warn(`Archiver warning: ${err}`);
  });

  archive.on('error', (err) => {
    console.error(`Archiver error: ${err}`);
    throw err;
  });

  archive.pipe(output);

  // Append files using glob which ensures all files are processed
  archive.glob('**/*', {
    cwd: rootDir,
    ignore: ['node_modules/**', 'backups/**'],
  });

  // Explicitly include specific files if necessary
  archive.file(path.join(rootDir, 'backups/build.zip'), {
    name: 'backups/build.zip',
  });

  await new Promise((resolve, reject) => {
    output.on('close', () => {
      ws.send(
        JSON.stringify({
          progress: 100,
          message: 'Backup complete',
          path: backupPath,
        })
      );

      resolve();
    });
    output.on('error', reject);
    archive.finalize().catch(reject);
  });
};

router.ws('/ws/progress', async (ws, req) => {
  try {
    const backupPath = await backupBackend(ws);
    ws.send(JSON.stringify({ message: 'Backup complete', path: backupPath }));
  } catch (error) {
    ws.send(JSON.stringify({ error: 'Failed to create backup' }));
  }
});

router.get('/backend', async (req, res) => {
  req.setTimeout(0); // No timeout
  try {
    const backupPath = path.join(
      __dirname,
      '../backups',
      `backup-${new Date().toISOString().slice(0, 10)}.zip`
    );
    res.setHeader('Content-Type', 'application/zip');
    res.download(backupPath, 'backend-archive.zip', (error) => {
      if (error) {
        console.error('Download failed:', error);
        res.status(500).send('Failed to download backup');
      }
    });
  } catch (error) {
    console.error('Error creating backup:', error);
    res.status(500).send('Failed to create backup');
  }
});

// Adjust the path according to where your script is located
const rootDir = path.join(__dirname, '../');
// Ensure this points directly to the file you intend to send, not a directory
const backupFilePath = path.join(rootDir, 'backups', 'build.zip');

router.get('/react-build', async (req, res) => {
  // Setting no timeout for a download might be necessary if it's a large file
  req.setTimeout(0); // Be cautious with setting no timeout in a production environment

  try {
    res.download(backupFilePath, 'build.zip', (err) => {
      if (err) {
        // Log the error for server-side debugging
        console.error('Download error:', err);
        // Send a more detailed error response or keep it generic based on your error handling policy
        res.status(500).send('Failed to download the file.');
      }
    });
  } catch (error) {
    console.error('Error encountered:', error);
    res.status(500).send('Error preparing the download.');
  }
});

router.get('/db-backup', async (req, res) => {
  try {
    const backupPath = await backupDatabase(); // Ensure the backup function returns the file path
    res.download(backupPath); // This sends the file to the client
  } catch (error) {
    console.error('Error during database backup:', error);
    res.status(500).send('Failed to create database backup');
  }
});

export default router;
