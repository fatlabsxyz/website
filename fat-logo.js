// FAT logo — ascii art, line-by-line reveal. Click to replay.
// Locked design: og (og-xl, RGB, ember shadow). ?logo=blackmetal for the meme.

(function () {
  const DEFAULT = 'og';

  const RGB = { F: '#ea4125', A: '#0fa14c', T: '#1f70c1' };
  const ROW_DELAY = 100;
  const START_DELAY = 250;

  // Original art (fat-ibm.txt). split = [fEnd, aEnd] column indices
  // separating the F / A / T color regions.
  const OG_ART = [
    { text: '▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀    ▀▀▀▀▀▀▀    ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀', split: [16, 29] },
    { text: '▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀   ▝▀▀▀▀▀▀▀▘   ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀', split: [16, 29] },
    { text: '  ▀▀▀▀     ▀▀▀▀   ▀▀▀▀ ▀▀▀▀   ▀▀▀▀  ▀▀▀▀  ▀▀▀▀', split: [16, 29] },
    { text: '  ▀▀▀▀▀▀▀▀       ▝▀▀▀▘ ▝▀▀▀▘        ▀▀▀▀      ', split: [16, 29] },
    { text: '  ▀▀▀▀▀▀▀▀       ▀▀▀▀▀▀▀▀▀▀▀        ▀▀▀▀      ', split: [16, 29] },
    { text: '  ▀▀▀▀▀         ▝▀▀▀▀▀▀▀▀▀▀▀▘       ▀▀▀▀      ', split: [16, 29] },
    { text: '▀▀▀▀▀▀▀▀▀     ▀▀▀▀▀▀▘   ▝▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀    ', split: [10, 32] },
    { text: '▀▀▀▀▀▀▀▀▀     ▀▀▀▀▀▀     ▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀    ', split: [10, 32] },
  ];

  // Black metal rendition (fat-blackmetal.txt). Single color, glow.
  const BLACKMETAL_ART = String.raw`/\          /\                    /\          /\_________/\           /\
\ \         \ \                  /  \         \  _______  /           / /
 \ \         \ \_____/\         / /\ \         \/  ___  \/           / /
  \ \        / ______  \       / /  \ \           / /\ \            / /
   \ \      / / \____\ /      / /    \ \          \ \/ /           / /
   /  /     \ \              / / /\/\ \ \         / /\ \           \  \
  /  /       \ \___/\       / /  \  /  \ \        \ \/ /            \  \
  \  \       / ___  \       \ \   \/   / /        / /\ \            /  /
   \  \     / / \_\ /        \ \______/ /         \ \/ /           /  /
    \  \    \ \              / _______  \         /    \          /  /
     \  \    \ \            / /       \ \        / /\/\ \        /  /
      \/      \/            \/         \/        \/    \/        /\
`.split('\n').slice(0, -1);

  const VARIANTS = {
    og: {
      scale: 1.5,
      lineHeight: 1.2,
      shadow: '0.3em 0.3em 0 rgba(234, 65, 37, 0.18)',
      lines: OG_ART.map(({ text, split }) => [
        [text.slice(0, split[0]), RGB.F],
        [text.slice(split[0], split[1]), RGB.A],
        [text.slice(split[1]), RGB.T],
      ]),
    },
    blackmetal: {
      scale: 0.95,
      lineHeight: 1.05,
      shadow: '0 0 10px rgba(214, 214, 210, 0.5)',
      lines: BLACKMETAL_ART.map(text => [[text, '#d6d6d2']]),
    },
  };

  function init() {
    const container = document.getElementById('fat-logo-container');
    const header = document.getElementById('title');
    if (!container || !header) return;

    const pick = new URLSearchParams(location.search).get('logo');
    const variant = VARIANTS[pick] || VARIANTS[DEFAULT];

    const pre = document.createElement('pre');
    pre.className = 'ascii-fat-art';
    pre.setAttribute('role', 'img');
    pre.setAttribute('aria-label', 'FAT');
    pre.style.setProperty('--ascii-scale', variant.scale);
    pre.style.lineHeight = variant.lineHeight;
    pre.style.textShadow = variant.shadow;

    const lines = variant.lines.map(parts => {
      const line = document.createElement('span');
      line.className = 'ascii-line';
      parts.forEach(([chunk, color]) => {
        const s = document.createElement('span');
        s.textContent = chunk;
        s.style.color = color;
        line.appendChild(s);
      });
      pre.appendChild(line);
      return line;
    });

    container.appendChild(pre);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let playing = false;

    function play() {
      if (playing) return;
      playing = true;
      header.classList.remove('logo-done');
      lines.forEach(l => {
        l.style.transition = 'none';
        l.style.opacity = 0;
      });
      pre.getBoundingClientRect(); // flush styles so the reset doesn't animate
      lines.forEach((l, i) => {
        l.style.transition = `opacity 260ms ease ${START_DELAY + i * ROW_DELAY}ms`;
        l.style.opacity = 1;
      });
      setTimeout(() => {
        header.classList.add('logo-done');
        playing = false;
      }, START_DELAY + lines.length * ROW_DELAY + 400);
    }

    if (reduceMotion) {
      lines.forEach(l => { l.style.opacity = 1; });
      header.classList.add('logo-done');
    } else {
      container.style.cursor = 'pointer';
      container.addEventListener('click', play);
      play();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
