import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

let pool;

export async function connect() {
    const sslEnabled = process.env.DB_SSL === 'true';

    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT),
        ...(sslEnabled && { ssl: { rejectUnauthorized: false } })
    }).promise();
}

export async function getAllProjects() {
    const [rows] = await pool.query({
        sql: 'SELECT id, project_name AS name, img_url AS image, project_description AS description, url, tags FROM projects;'
    });
    return rows;
}

export async function getProjectById(id) {
    const [rows] = await pool.query({
        sql: 'SELECT id, project_name AS name, img_url AS image, project_description AS description, url, tags FROM projects WHERE id = ?;',
        values: [id]
    });
    return rows[0] || null;
}
