import dotenv from 'dotenv';
dotenv.config();

import * as utils from './utils/utils.js';

import express from 'express';
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static('public'));

const projects = [
    { name: 'Lumyn: Constellation of Self', url: 'https://visit-lumyn.noirmak.com/', image: 'noirmak-visit-lumyn.jpg' },
    { name: 'GLITCH.EXE: Orpheus Protocol', url: 'https://orpheus.noirmak.com/', image: 'noirmak-orpheus.jpg' },
    { name: 'stillbecoming', url: 'https://stillbecoming.noirmak.com/', image: 'noirmak-still-becoming.jpg' },
    { name: 'Undertones', url: 'https://undertones.noirmak.com/', image: 'noirmak-undertones.jpg' },
    { name: 'Between States', url: 'https://between-states-pitch-deck.noirmak.com/', image: 'noirmak-between-states.jpg' },
    { name: 'Noise Palette', url: 'https://noise-palette.noirmak.com/', image: 'noirmak-noise-palette.jpg' },
    { name: 'Atmos Index', url: 'https://atmosindex.noirmak.com/', image: 'noirmak-atmos-index.jpg' },
    { name: 'Stitched in Code', url: 'https://stitchedincode.noirmak.com/', image: 'noirmak-web-stitched-in-code.jpg' },
    { name: 'Lumyn', url: 'https://lumyn.noirmak.com/', image: 'noirmak-lumyn-web.jpg' }
];

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/collection', (req, res) => {
    res.render('collection');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/projects', (req, res) => {
    res.render('projects', { projectArray: projects });
});

app.get('/project/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id < 1 || id > projects.length) {
        throw new Error('No project with that ID');
    }
    res.render('project', { project: projects[id - 1], id: id });
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
