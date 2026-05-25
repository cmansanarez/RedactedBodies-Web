// Hero Hydra sketch — Cam Mansanarez | @noir_mak
// Audio reactivity simulated with math oscillators (no mic required)

window.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('#hero');
    if (!section) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'hero-canvas';

    function updateCanvasResolution() {
        const dpr = window.devicePixelRatio || 1;
        const pixelWidth = Math.floor(section.offsetWidth * dpr);
        const pixelHeight = Math.floor(section.offsetHeight * dpr);
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
        if (window.heroHydra) window.heroHydra.setResolution(pixelWidth, pixelHeight);
    }

    const hydra = new Hydra({
        canvas: canvas,
        detectAudio: false,
        width: Math.floor(section.offsetWidth * (window.devicePixelRatio || 1)),
        height: Math.floor(section.offsetHeight * (window.devicePixelRatio || 1))
    });

    window.heroHydra = hydra;
    section.insertBefore(canvas, section.firstChild);
    updateCanvasResolution();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateCanvasResolution, 100);
    });

    // Simulated fft bins — oscillate at different rates and phases to mimic audio energy
    const fft = [
        () => (Math.sin(time * 0.8) * 0.5 + 0.5) * 0.8,
        () => (Math.sin(time * 1.1 + 1.0) * 0.5 + 0.5) * 0.6,
        () => (Math.sin(time * 1.4 + 2.0) * 0.5 + 0.5) * 0.7,
        () => (Math.sin(time * 0.9 + 3.0) * 0.5 + 0.5) * 0.5,
        () => (Math.sin(time * 1.6 + 4.0) * 0.5 + 0.5) * 0.4,
    ];

    const gate = () => Math.max(0, Math.sin(time * 1.2));

    const colorCycle = () => {
        const t = (time * 0.2) % 4;
        if (t < 1) return [1, 1, 0, 1];
        else if (t < 2) return [1, 0, 1, 1];
        else if (t < 3) return [0, 1, 1, 1];
        else return [1, 1, 1, 1];
    };

    shape(3, 0.01, 0.5).rotate(Math.PI / 2, 0.5)
        .contrast(1.2).saturate(0)
        .color(
            () => colorCycle()[0] * Math.max(0, fft[0]() - 0.15) * 3,
            () => colorCycle()[1] * Math.max(0, fft[0]() - 0.15) * 3,
            () => colorCycle()[2] * Math.max(0, fft[0]() - 0.15) * 3
        )
        .modulatePixelate(noise(3, 3).scrollY(0, 0.2), [100, 200].fast(0.2).smooth(0.4))
        .modulate(noise(6, 0.2).pixelate(80, 40), 0.05).scale(1.1)
        .sub(src(o0).scale(1.01).rotate(0.005))
        .modulate(src(o0), [0, 1].fast(0.5).smooth(0.4))
        .modulate(noise(6, 0.2).pixelate(80, 40), () => gate() * 0.05).scale(1.1)
        .scrollX(() => gate() * (fft[1]() + fft[2]()) * 0.02 * Math.sin(time * 5))
        .scrollY(() => gate() * (fft[0]() + fft[3]()) * 0.02 * Math.cos(time * 4))
        .rotate(() => gate() * (fft[4]() + fft[2]()) * 0.02)
        .out(o0);
});
