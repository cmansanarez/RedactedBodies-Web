import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

let pool;

export async function connect() {
    // DigitalOcean SQL server — uncomment when deploying:
    // const cString = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    // pool = mysql.createPool(cString).promise();
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT)
    }).promise();
}

export async function getAllProjects() {
    const [rows] = await pool.query({
        sql: 'SELECT id, project_name AS name, img_url AS image, project_description AS description FROM projects;'
    });
    return rows.map(row => ({ ...row, url: '#', tags: [] }));
}

export async function getProjectById(id) {
    const [rows] = await pool.query({
        sql: 'SELECT id, project_name AS name, img_url AS image, project_description AS description FROM projects WHERE id = ?;',
        values: [id]
    });
    if (!rows[0]) return null;
    return { ...rows[0], url: '#', tags: [] };
}
