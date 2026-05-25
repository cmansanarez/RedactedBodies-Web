import dotenv from 'dotenv';
dotenv.config();

import * as utils from './utils/utils.js';

import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

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