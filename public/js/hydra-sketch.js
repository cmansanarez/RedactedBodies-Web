// Parallel Arrays — Cam Mansanarez | @noir_mak
// Adapted to run inside the #live-coding section

window.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('#live-coding');
    if (!section) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'hydra-canvas';

    function updateCanvasResolution() {
        const dpr = window.devicePixelRatio || 1;
        const pixelWidth = Math.floor(section.offsetWidth * dpr);
        const pixelHeight = Math.floor(section.offsetHeight * dpr);

        canvas.width = pixelWidth;
        canvas.height = pixelHeight;

        if (window.hydra) {
            window.hydra.setResolution(pixelWidth, pixelHeight);
        }
    }

    const hydra = new Hydra({
        canvas: canvas,
        detectAudio: false,
        width: Math.floor(section.offsetWidth * (window.devicePixelRatio || 1)),
        height: Math.floor(section.offsetHeight * (window.devicePixelRatio || 1))
    });

    window.hydra = hydra;
    section.insertBefore(canvas, section.firstChild);
    updateCanvasResolution();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateCanvasResolution, 100);
    });

    const nsides = [3, 4, 5];
    const colors = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];

    let chain = solid(0, 0, 0, 1);

    for (let i = 0; i < nsides.length; i++) {
        const c = colors[i];
        const layer = shape(nsides[i], 0.5, 0.1)
            .scale(0.5 + i * 0.2)
            .rotate(() => time * 0.2 * (i + 1))
            .color(c[0], c[1], c[2]);
        chain = chain.add(layer, 0.6);
    }

    chain.out(o0);

    src(o0)
        .modulate(o0, 0.3)
        .modulate(o1, [0, 0.5].fast(0.5).smooth(1))
        .scale([1, 1.25].fast(0.25).smooth(0.4))
        .rotate(0.5, -0.3)
        .out(o1);

    render(o1);
});
