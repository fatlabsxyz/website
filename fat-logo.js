// FAT Logo - Horizontal bar segments
// Inspired by TF BANK style - retro-futuristic LED display

const FATLogo = {
  // Define each letter as horizontal bars (y positions, x start, x end)
  F: [
    { y: 0, x1: 0, x2: 100 },    // Top
    { y: 20, x1: 0, x2: 100 },
    { y: 40, x1: 0, x2: 20 },    // Vertical left
    { y: 60, x1: 0, x2: 80 },    // Middle
    { y: 80, x1: 0, x2: 80 },
    { y: 100, x1: 0, x2: 20 },   // Vertical left
    { y: 120, x1: 0, x2: 20 },
    { y: 140, x1: 0, x2: 20 },
  ],
  A: [
    { y: 0, x1: 20, x2: 80 },    // Top
    { y: 20, x1: 20, x2: 80 },
    { y: 40, x1: 0, x2: 20 },    // Left vertical
    { y: 40, x1: 80, x2: 100 },  // Right vertical
    { y: 60, x1: 0, x2: 20 },
    { y: 60, x1: 80, x2: 100 },
    { y: 80, x1: 0, x2: 100 },   // Middle bar
    { y: 100, x1: 0, x2: 20 },
    { y: 100, x1: 80, x2: 100 },
    { y: 120, x1: 0, x2: 20 },
    { y: 120, x1: 80, x2: 100 },
    { y: 140, x1: 0, x2: 20 },
    { y: 140, x1: 80, x2: 100 },
  ],
  T: [
    { y: 0, x1: 0, x2: 100 },    // Top
    { y: 20, x1: 0, x2: 100 },
    { y: 40, x1: 40, x2: 60 },   // Center vertical
    { y: 60, x1: 40, x2: 60 },
    { y: 80, x1: 40, x2: 60 },
    { y: 100, x1: 40, x2: 60 },
    { y: 120, x1: 40, x2: 60 },
    { y: 140, x1: 40, x2: 60 },
  ],

  init() {
    const container = document.getElementById('fat-logo-container');
    if (!container) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 380 160');
    svg.setAttribute('style', 'width: 100%; max-width: 500px; height: auto;');

    // Define glow filter
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'glow');
    const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    blur.setAttribute('stdDeviation', '4');
    blur.setAttribute('result', 'coloredBlur');
    const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    const mergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    mergeNode1.setAttribute('in', 'coloredBlur');
    const mergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    mergeNode2.setAttribute('in', 'SourceGraphic');
    merge.appendChild(mergeNode1);
    merge.appendChild(mergeNode2);
    filter.appendChild(blur);
    filter.appendChild(merge);
    defs.appendChild(filter);
    svg.appendChild(defs);

    const letters = [
      { data: this.F, offsetX: 0, color: '#fd1813' },
      { data: this.A, offsetX: 130, color: '#0fa14c' },
      { data: this.T, offsetX: 260, color: '#1f70c1' },
    ];

    let barIndex = 0;
    const allBars = [];

    // Create all bars
    letters.forEach(letter => {
      letter.data.forEach(bar => {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', letter.offsetX + bar.x1);
        rect.setAttribute('y', bar.y);
        rect.setAttribute('width', bar.x2 - bar.x1);
        rect.setAttribute('height', '12');
        rect.setAttribute('rx', '6');
        rect.setAttribute('fill', letter.color);
        rect.setAttribute('filter', 'url(#glow)');
        rect.setAttribute('opacity', '0');
        svg.appendChild(rect);
        allBars.push({ rect, row: bar.y });
      });
    });

    container.appendChild(svg);

    // Animate line by line
    const rows = [...new Set(allBars.map(b => b.row))].sort((a, b) => a - b);
    let currentRow = 0;

    function animateNextRow() {
      if (currentRow >= rows.length) return;

      const rowY = rows[currentRow];
      const barsInRow = allBars.filter(b => b.row === rowY);

      barsInRow.forEach((bar, idx) => {
        setTimeout(() => {
          bar.rect.style.transition = 'opacity 0.2s ease-in';
          bar.rect.setAttribute('opacity', '1');
        }, idx * 80);
      });

      currentRow++;
      setTimeout(animateNextRow, barsInRow.length * 80 + 150);
    }

    animateNextRow();
  }
};

// Initialize when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => FATLogo.init());
} else {
  FATLogo.init();
}
