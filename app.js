import dotenv from 'dotenv';
dotenv.config();

import * as utils from './utils/utils.js';
import * as db from './utils/database.js';

import express from 'express';
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static('public'));

app.get('/', async (req, res) => {
    const projectArray = await db.getAllProjects();
    res.render('index', { projectArray });
});

app.get('/collection', (req, res) => {
    res.render('collection');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/projects', async (req, res) => {
    const projectArray = await db.getAllProjects();
    res.render('projects', { projectArray });
});

app.get('/project/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 1) {
        throw new Error('No project with that ID');
    }
    const project = await db.getProjectById(id);
    if (!project) {
        throw new Error('No project with that ID');
    }
    res.render('project', { project });
});

app.get('/newProject', (req, res) => {
    res.render('newProject');
});

app.post('/mail', async (req, res) => {
    try {
        await utils.sendMessage(req.body.subject, req.body.text);
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

app.use((err, req, res, next) => {
    console.error(err.message);
    res.render('error');
});

await db.connect();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
