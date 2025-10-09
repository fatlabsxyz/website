// FAT Logo - Minimal horizontal bar design
// Inspired by IBM wordmark - clean, modular, geometric

const FATLogo = {
  // Each letter with even MORE detail lines (16 rows)
  letterData: {
    F: [
      { y: 0, segments: [[0, 90]] },          // Top base
      { y: 12, segments: [[0, 90]] },
      { y: 24, segments: [[5, 25], [75, 85]] },     // Tapers inward
      { y: 36, segments: [[5, 25]] },         // Left edge only
      { y: 48, segments: [[5, 25]] },
      { y: 60, segments: [[5, 70]] },         // Middle bar
      { y: 72, segments: [[5, 70]] },
      { y: 84, segments: [[5, 25]] },         // Left edge only (no right side!)
      { y: 96, segments: [[5, 25]] },
      { y: 108, segments: [[0, 30]] },        // Bottom - JUST LEFT (narrow!)
      { y: 120, segments: [[0, 30]] },
    ],
    A: [
      { y: 0, segments: [[32, 68]] },         // Top narrow
      { y: 8, segments: [[28, 72]] },
      { y: 16, segments: [[24, 38], [62, 76]] },    // Splits start
      { y: 24, segments: [[20, 34], [66, 80]] },
      { y: 32, segments: [[16, 30], [70, 84]] },
      { y: 40, segments: [[12, 26], [74, 88]] },
      { y: 48, segments: [[8, 22], [78, 92]] },
      { y: 56, segments: [[4, 18], [82, 96]] },
      { y: 64, segments: [[0, 100]] },        // Middle bar full
      { y: 72, segments: [[0, 100]] },
      { y: 80, segments: [[0, 20], [80, 100]] },    // Bottom split
      { y: 88, segments: [[0, 20], [80, 100]] },
      { y: 96, segments: [[0, 22], [78, 100]] },
      { y: 104, segments: [[0, 24], [76, 100]] },   // Bottom base
      { y: 112, segments: [[0, 26], [74, 100]] },
      { y: 120, segments: [[0, 26], [74, 100]] },
    ],
    T: [
      { y: 0, segments: [[0, 100]] },         // Top base full
      { y: 8, segments: [[0, 100]] },
      { y: 16, segments: [[0, 100]] },
      { y: 24, segments: [[4, 24], [42, 58], [76, 96]] },  // Three parts
      { y: 32, segments: [[42, 58]] },        // Stem
      { y: 40, segments: [[42, 58]] },
      { y: 48, segments: [[42, 58]] },
      { y: 56, segments: [[42, 58]] },
      { y: 64, segments: [[42, 58]] },
      { y: 72, segments: [[42, 58]] },
      { y: 80, segments: [[42, 58]] },
      { y: 88, segments: [[40, 60]] },
      { y: 96, segments: [[38, 62]] },
      { y: 104, segments: [[36, 64]] },       // Bottom base wider
      { y: 112, segments: [[36, 64]] },
      { y: 120, segments: [[36, 64]] },
    ],
  },

  colors: {
    F: '#fd1813',
    A: '#0fa14c',
    T: '#1f70c1',
  },

  init() {
    const container = document.getElementById('fat-logo-container');
    if (!container) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 420 135');
    svg.setAttribute('style', 'width: 100%; max-width: 550px; height: auto; shape-rendering: crispEdges;');

    const letters = [
      { letter: 'F', offsetX: 0 },
      { letter: 'A', offsetX: 145 },
      { letter: 'T', offsetX: 290 },
    ];

    const allBars = [];

    // Create all bars
    letters.forEach(({ letter, offsetX }) => {
      const color = this.colors[letter];
      const data = this.letterData[letter];

      data.forEach(row => {
        row.segments.forEach(([x1, x2]) => {
          const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rect.setAttribute('x', offsetX + x1);
          rect.setAttribute('y', row.y);
          rect.setAttribute('width', '0'); // Start at 0 width
          rect.setAttribute('height', '8'); // Thinner bars for more detail
          rect.setAttribute('fill', color);
          // No border radius - sharp angular edges
          rect.setAttribute('data-full-width', x2 - x1);
          svg.appendChild(rect);

          allBars.push({ rect, row: row.y, fullWidth: x2 - x1 });
        });
      });
    });

    container.appendChild(svg);

    // Animate row by row, bar by bar
    const rows = [...new Set(allBars.map(b => b.row))].sort((a, b) => a - b);
    let currentRow = 0;

    function animateNextRow() {
      if (currentRow >= rows.length) return;

      const rowY = rows[currentRow];
      const barsInRow = allBars.filter(b => b.row === rowY);

      barsInRow.forEach((bar, idx) => {
        setTimeout(() => {
          // Snap to full width (sharp reveal)
          bar.rect.style.transition = 'width 0.12s cubic-bezier(0.16, 1, 0.3, 1)';
          bar.rect.setAttribute('width', bar.fullWidth);
        }, idx * 80);
      });

      currentRow++;
      setTimeout(animateNextRow, barsInRow.length * 80 + 150);
    }

    // Start animation after short delay
    setTimeout(animateNextRow, 300);
  }
};

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => FATLogo.init());
} else {
  FATLogo.init();
}
