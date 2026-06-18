import dotenv from 'dotenv';
dotenv.config();

import * as utils from './utils/utils.js';
import * as db from './utils/database.js';

import express from 'express';
const app = express();
const port = 3000;

const FALLBACK_PROJECTS = [
    { id: 1, name: 'Lumyn: Constellation of Self', image: 'noirmak-visit-lumyn.jpg', description: 'An interactive installation that transforms participant reflections into generative poetry, color, and constellation-inspired visual compositions. Using ml5.js-powered motion tracking via webcam, the installation responds to the physical movements of gallery attendees in real time, weaving their presence directly into the generative output. Through AI, creative coding, and projection, Lumyn creates a collective archive of identity, affirmation, and belonging.', url: 'https://visit-lumyn.noirmak.com/', tags: ['Interactive', 'Installation', 'Experiential', 'Generative Art', 'ml5.js', 'Node.js', 'Express.js', 'Three.js', 'AI-Assisted', 'Projection'] },
    { id: 2, name: 'GLITCH.EXE: Orpheus Protocol', image: 'noirmak-orpheus.jpg', description: 'An experimental web-based artwork reimagining the myth of Orpheus and Eurydice through the lens of digital memory, machine perception, and generative systems. Participants navigate a fragmented computational landscape where text, image, and interaction become unstable artifacts of loss, desire, and retrieval. Drawing from glitch aesthetics, audio-reactive visuals, and speculative storytelling, the project explores what remains when memory is translated into code.', url: 'https://orpheus.noirmak.com/', tags: ['Interactive', 'Web Experience', 'Generative Art', 'JavaScript', 'Node.js', 'Hydra Video Synth', 'HTML/CSS'] },
    { id: 3, name: 'stillbecoming', image: 'noirmak-still-becoming.jpg', description: "A generative art project created as a series of personalized digital gifts for friends and loved ones. Each piece combines code, color, motion, and procedural composition to create a unique visual reflection of a person's journey, celebrating growth, transformation, and the unfinished nature of becoming. The project explores how generative systems can serve as acts of care, connection, and personal storytelling.", url: 'https://stillbecoming.noirmak.com/', tags: ['Generative Art', 'JavaScript', 'p5.js', 'HTML/CSS', 'Procedural Design'] },
    { id: 4, name: 'Undertones', image: 'noirmak-undertones.jpg', description: 'An interactive digital poetry experience exploring memory, emotion, and the unspoken layers beneath human communication. Through text, interaction, and generative visual elements, participants navigate a nonlinear poetic landscape where meaning emerges through exploration rather than direct narration. The project investigates how digital media can expand poetry beyond the page into an experiential form.', url: 'https://undertones.noirmak.com/', tags: ['Interactive', 'Digital Poetry', 'Web Experience', 'HTML/CSS'] },
    { id: 5, name: 'Between States', image: 'noirmak-between-states.jpg', description: 'A concept and pitch platform for an immersive XR experience designed to extend live music performances beyond the stage. Blending spatial media, generative visuals, audience participation, and real-time audio reactivity, the project envisions new forms of connection between performers and audiences through shared digital environments. Developed as both a creative technology proposal and experiential design framework, Between States explores how emerging media can deepen connection, presence, and storytelling beyond the stage.', url: 'https://between-states-pitch-deck.noirmak.com/', tags: ['XR', 'Immersive Media', 'Experiential Design', 'Product Concept', 'Interactive', 'Speculative Design', 'WebXR', 'JavaScript', 'Three.js', 'Spatial Computing', 'Real-Time Graphics', 'Audio Reactive'] },
    { id: 6, name: 'Noise Palette', image: 'noirmak-noise-palette.jpg', description: 'A browser-based creative tool for generating glitch-inspired artworks through noise, color, and procedural drawing systems. By blending user input with algorithmic intervention, Noise Palette transforms digital painting into an unpredictable dialogue between artist and machine.', url: 'https://noise-palette.noirmak.com/', tags: ['Creative Tool', 'Glitch Art', 'Interactive', 'Generative Art', 'JavaScript', 'HTML5 Canvas', 'Procedural Graphics'] },
    { id: 7, name: 'Atmos Index', image: 'noirmak-atmos-index.jpg', description: 'A location-aware generative artwork that transforms local time and atmospheric conditions into a personalized digital sky. Real-world environmental data drives evolving cloud formations, daylight transitions, and celestial elements, creating a unique visualization for every viewer.', url: 'https://atmosindex.noirmak.com/', tags: ['Generative Art', 'Data Visualization', 'Interactive', 'Particle Systems', 'JavaScript'] },
    { id: 8, name: 'Stitched in Code', image: 'noirmak-web-stitched-in-code.jpg', description: 'A digital holiday card that combines glitch art, ASCII-inspired visuals, and creative coding to transform a seasonal greeting into an interactive artwork. Created as a gift for friends and family, the project explores code as a medium for expression, play, and connection.', url: 'https://stitchedincode.noirmak.com/', tags: ['Glitch Art', 'ASCII Art', 'Digital Art', 'JavaScript', 'HTML/CSS'] },
    { id: 9, name: 'Lumyn', image: 'noirmak-lumyn-web.jpg', description: 'A web-based generative art platform that uses a fine-tuned language model to create personalized poetry and color metaphors from participant responses celebrating identity, resilience, and inner beauty. The project explores the intersection of AI, creative coding, and interactive storytelling as tools for reflection and emotional connection.', url: 'https://lumyn.noirmak.com/', tags: ['Generative AI', 'Interactive', 'Digital Poetry', 'Creative Technology', 'Web Experience', 'JavaScript', 'Node.js', 'Express.js', 'LLM Integration'] }
];

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static('public'));

app.get('/', async (req, res) => {
    let projectArray;
    try {
        projectArray = await db.getAllProjects();
    } catch (e) {
        projectArray = FALLBACK_PROJECTS;
    }
    res.render('index', { projectArray });
});

app.get('/collection', (req, res) => {
    res.render('collection');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/projects', async (req, res) => {
    let projectArray;
    try {
        projectArray = await db.getAllProjects();
    } catch (e) {
        projectArray = FALLBACK_PROJECTS;
    }
    res.render('projects', { projectArray });
});

app.get('/project/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 1) {
        throw new Error('No project with that ID');
    }
    let project;
    try {
        project = await db.getProjectById(id);
    } catch (e) {
        project = FALLBACK_PROJECTS.find(p => p.id === id) || null;
    }
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

try {
    await db.connect();
} catch (e) {
    console.warn('Database unavailable — running on fallback data.');
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
