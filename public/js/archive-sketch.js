// Pixel Grid — Cam Mansanarez | @noir_mak
// Adapted from work-sketch.js to run inside the #archive section

window.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('#archive');
    if (!section) return;

    const sketch = (p) => {
        const gridSize = 20;
        const noiseScale = 0.08;
        let cols, rows;
        let timeOffset = 0;
        let staticBurst = false;
        let burstTimer = 0;

        p.setup = () => {
            const canvas = p.createCanvas(section.offsetWidth, section.offsetHeight);
            canvas.elt.id = 'archive-canvas';
            section.insertBefore(canvas.elt, section.firstChild);
            cols = Math.ceil(p.width / gridSize);
            rows = Math.ceil(p.height / gridSize);
            p.noStroke();
        };

        p.draw = () => {
            p.background(28, 28, 31);

            if (p.random(1) < 0.008) {
                staticBurst = true;
                burstTimer = 20;
            }

            if (burstTimer > 0) {
                burstTimer--;
                if (burstTimer === 0) staticBurst = false;
            }

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * gridSize;
                    const y = j * gridSize;

                    let noiseVal = p.noise(i * noiseScale, j * noiseScale, timeOffset);
                    let noiseVal2 = p.noise(i * noiseScale * 2 + 100, j * noiseScale * 2 + 100, timeOffset * 1.5);
                    let combinedNoise = (noiseVal + noiseVal2 * 0.5) / 1.5;

                    if (staticBurst) combinedNoise = p.random(1);

                    p.fill(combinedNoise > 0.5 ? p.color(255, 255, 255, 200) : p.color(0, 0, 0, 150));
                    p.rect(x, y, gridSize, gridSize);

                    if (!staticBurst && p.random(1) < 0.02) {
                        p.fill(p.random(1) > 0.5 ? 255 : 0);
                        p.rect(x, y, gridSize, gridSize);
                    }
                }
            }

            timeOffset += 0.015;
        };

        p.windowResized = () => {
            p.resizeCanvas(section.offsetWidth, section.offsetHeight);
            cols = Math.ceil(p.width / gridSize);
            rows = Math.ceil(p.height / gridSize);
        };
    };

    new p5(sketch);
});
