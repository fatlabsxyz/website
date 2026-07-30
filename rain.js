// Background canvas (#matrix-canvas): letter rain + client logos drifting down.
// Single letters only — no words, no symbols.

(function () {
    const canvas = document.getElementById('matrix-canvas');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        canvas.remove();
        return;
    }

    const ctx = canvas.getContext('2d');
    const chars = 'abcdefghijklmnopqrstuvwxyzアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const colors = ['#FF1493', '#FFD700', '#00FFFF', '#FF00FF', '#00FF00', '#FF6347', '#7FFF00', '#FF69B4'];
    const fontSize = 32;

    const LOGO_SRCS = [
        'logos/ethereum-white.png',
        'logos/starknet-white.png',
        'logos/0xbow-white.png',
        'logos/miden-white.png',
        'logos/aztec-white.png',
    ];
    const LOGO_SIZE = 88;
    const LOGO_EVERY = 160; // frames between guaranteed logo drops (~2.7s)

    const logoImgs = [];
    LOGO_SRCS.forEach(src => {
        const img = new Image();
        img.onload = () => logoImgs.push(img);
        img.src = src;
    });

    let width, height, columns, lastSpawn;
    const items = [];

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        columns = Math.floor(width / fontSize);
        lastSpawn = Array(columns).fill(-1000);
    }
    resize();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 150);
    });

    function spawnChar(col) {
        const x = col * fontSize;
        // heavier on the edges so text stays readable
        const edge = Math.abs((x / width) - 0.5) * 2;
        items.push({
            x, y: -fontSize,
            char: chars[Math.floor(Math.random() * chars.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: 0.05 + 0.09 * edge,
            speed: 0.7 + Math.random() * 0.6,
        });
    }

    function spawnLogo() {
        // never show the same client twice at once
        const falling = new Set(items.filter(it => it.img).map(it => it.img.src));
        const pool = logoImgs.filter(img => !falling.has(img.src));
        if (!pool.length) return;
        const img = pool[Math.floor(Math.random() * pool.length)];
        items.push({
            img,
            x: Math.random() * (width - LOGO_SIZE),
            y: -LOGO_SIZE,
            opacity: 0.16,
            speed: 0.55 + Math.random() * 0.35,
        });
    }

    let frame = 0;
    let running = true;

    function animate() {
        if (!running) return;
        frame++;

        ctx.clearRect(0, 0, width, height);
        ctx.font = fontSize + 'px "Short Stack", cursive';

        if (frame % 8 === 0) {
            for (let col = 0; col < columns; col++) {
                const edge = Math.abs((col / columns) - 0.5) * 2;
                if (Math.random() < 0.003 + 0.007 * edge && frame - lastSpawn[col] > 120) {
                    spawnChar(col);
                    lastSpawn[col] = frame;
                }
            }
        }

        if (frame % LOGO_EVERY === 0 && logoImgs.length) spawnLogo();

        for (let i = items.length - 1; i >= 0; i--) {
            const it = items[i];
            ctx.globalAlpha = it.opacity;
            if (it.img) {
                if (it.y > -LOGO_SIZE && it.y < height + LOGO_SIZE) {
                    // white glow so client marks shine brighter than the rain
                    ctx.shadowColor = '#ffffff';
                    ctx.shadowBlur = 18;
                    ctx.drawImage(it.img, it.x, it.y, LOGO_SIZE, LOGO_SIZE);
                    ctx.shadowBlur = 0;
                }
            } else {
                if (frame % 12 === 0 && Math.random() > 0.8) {
                    it.char = chars[Math.floor(Math.random() * chars.length)];
                }
                if (it.y > 0 && it.y < height + fontSize) {
                    ctx.fillStyle = it.color;
                    ctx.fillText(it.char, it.x, it.y);
                }
            }
            it.y += 2.5 * it.speed;
            if (it.y > height + LOGO_SIZE) items.splice(i, 1);
        }

        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }

    document.addEventListener('visibilitychange', () => {
        const wasRunning = running;
        running = !document.hidden;
        if (running && !wasRunning) animate();
    });

    document.fonts.load(fontSize + 'px "Short Stack"').finally(() => animate());
})();
