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
    {
        name: 'Lumyn: Constellation of Self',
        url: 'https://visit-lumyn.noirmak.com/',
        image: 'noirmak-visit-lumyn.jpg',
        description: 'Placeholder description for Lumyn: Constellation of Self. This will be replaced with a full creative technology write-up covering concept, process, and audience interaction.',
        tags: ['placeholder', 'generative art', 'interactive']
    },
    {
        name: 'GLITCH.EXE: Orpheus Protocol',
        url: 'https://orpheus.noirmak.com/',
        image: 'noirmak-orpheus.jpg',
        description: 'Placeholder description for GLITCH.EXE: Orpheus Protocol. This will be replaced with a full creative technology write-up covering concept, process, and audience interaction.',
        tags: ['placeholder', 'live coding', 'performance']
    },
    {
        name: 'stillbecoming',
        url: 'https://stillbecoming.noirmak.com/',
        image: 'noirmak-still-becoming.jpg',
        description: 'Placeholder description for stillbecoming. This will be replaced with a full creative technology write-up covering concept, process, and audience interaction.',
        tags: ['placeholder', 'generative visuals', 'web']
    },
    {
        name: 'Undertones',
        url: 'https://undertones.noirmak.com/',
        image: 'noirmak-undertones.jpg',
        description: 'Placeholder description for Undertones. This will be replaced with a full creative technology write-up covering concept, process, and audience interaction.',
        tags: ['placeholder', 'sound', 'interactive']
    },
    {
        name: 'Between States',
        url: 'https://between-states-pitch-deck.noirmak.com/',
        image: 'noirmak-between-states.jpg',
        description: 'Placeholder description for Between States. This will be replaced with a full creative technology write-up covering concept, process, and audience interaction.',
        tags: ['placeholder', 'installation', 'immersive']
    },
    {
        name: 'Noise Palette',
        url: 'https://noise-palette.noirmak.com/',
        image: 'noirmak-noise-palette.jpg',
        description: 'Placeholder description for Noise Palette. This will be replaced with a full creative technology write-up covering concept, process, and audience interaction.',
        tags: ['placeholder', 'p5.js', 'generative art']
    },
    {
        name: 'Atmos Index',
        url: 'https://atmosindex.noirmak.com/',
        image: 'noirmak-atmos-index.jpg',
        description: 'Placeholder description for Atmos Index. This will be replaced with a full creative technology write-up covering concept, process, and audience interaction.',
        tags: ['placeholder', 'data visualization', 'web']
    },
    {
        name: 'Stitched in Code',
        url: 'https://stitchedincode.noirmak.com/',
        image: 'noirmak-web-stitched-in-code.jpg',
        description: 'Placeholder description for Stitched in Code. This will be replaced with a full creative technology write-up covering concept, process, and audience interaction.',
        tags: ['placeholder', 'live coding', 'performance']
    },
    {
        name: 'Lumyn',
        url: 'https://lumyn.noirmak.com/',
        image: 'noirmak-lumyn-web.jpg',
        description: 'Placeholder description for Lumyn. This will be replaced with a full creative technology write-up covering concept, process, and audience interaction.',
        tags: ['placeholder', 'generative art', 'web']
    }
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
    if (isNaN(id) || id < 1 || id > projects.length) {
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
