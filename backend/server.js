import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/routes.js';
import pool from './db/config.js';
import requestIp from 'request-ip';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import winston from 'winston';
import { promisify } from 'util';
import expressWs from 'express-ws';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFile = promisify(fs.readFile);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

const app = express();
expressWs(app);

app.enable('trust proxy');

// Connecting to the database
const connectDB = async () => {
  try {
    const conn = await pool.getConnection();
    if (conn) {
      conn.release();
    }
  } catch (err) {
    logger.error('Database connection error:', err);
  }
};

connectDB();

const importSQL = async () => {
  try {
    const conn = await pool.getConnection();

    if (conn) {
      logger.info('MariaDB Connected!');

      // Check if the database is empty
      const rows = await conn.query('SHOW TABLES');
      if (rows.length === 0) {
        logger.info('Database is empty, importing data...');

        const sqlFilePath = path.resolve(
          __dirname,
          'data',
          'keniba_persons.sql'
        );
        const sql = await readFile(sqlFilePath, 'utf-8');

        const statements = sql.split(/;\s*$/m);
        for (const statement of statements) {
          if (statement.trim()) {
            await conn.query(statement);
          }
        }

        logger.info('SQL file imported successfully!');
      } else {
        logger.info('Database is not empty, skipping import.');
      }

      conn.release();
    }
  } catch (err) {
    logger.error('Error importing SQL file:', err);
  }
};

importSQL();
app.enable('trust proxy');

// CORS middleware setup to allow requests from specified origins
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.NODE_DOMAIN);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(requestIp.mw());

// Express middleware for parsing requests
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));
app.use(express.json());
app.use(cors());

app.use(requestIp.mw());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// API routes

// Serve static files from the public/uploads directory
app.use('/api', express.static('public/works'));
app.use('/api', express.static('public'));

// WebSocket route for backup progress

app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

// Starting the server
app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
