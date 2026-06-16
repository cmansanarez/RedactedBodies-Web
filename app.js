import dotenv from 'dotenv';
dotenv.config();

import * as utils from './utils/utils.js';

import express from 'express';
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static('public'));

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
    res.render('projects');
});

app.get('/project', (req, res) => {
    res.render('project');
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});