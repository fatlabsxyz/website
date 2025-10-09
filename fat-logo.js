// FAT Logo - Loads from fat-logo-config.js

const FATLogo = {
  // Load config
  config: typeof FATLogoConfig !== 'undefined' ? FATLogoConfig : null,

  // Convert config format to internal format
  convertConfig() {
    if (!this.config) return this.letterData;

    const converted = {};
    ['F', 'A', 'T'].forEach(letter => {
      const letterConfig = this.config[letter];
      converted[letter] = [];

      letterConfig.rows.forEach((row, idx) => {
        const y = idx * this.config.spacing.rowSpacing;
        const segments = [];

        if (row.left) segments.push(row.left);
        if (row.right) segments.push(row.right);
        if (row.center) segments.push(row.center);

        if (segments.length > 0) {
          converted[letter].push({ y, segments });
        }
      });
    });

    return converted;
  },
  // Each letter with even MORE detail lines (16 rows)
  letterData: {
    F: [
      { y: 0, segments: [[0, 110]] },         // Top base - wider
      { y: 12, segments: [[0, 110]] },
      { y: 24, segments: [[5, 30], [90, 105]] },    // Tapers inward
      { y: 36, segments: [[5, 30]] },         // Left edge only
      { y: 48, segments: [[5, 30]] },
      { y: 60, segments: [[5, 90]] },         // Middle bar - wider
      { y: 72, segments: [[5, 90]] },
      { y: 84, segments: [[5, 30]] },         // Left edge only
      { y: 96, segments: [[5, 30]] },
      { y: 108, segments: [[0, 35]] },        // Bottom - narrow
      { y: 120, segments: [[0, 35]] },
    ],
    A: [
      { y: 0, segments: [[40, 75]] },         // Top narrow point
      { y: 12, segments: [[34, 81]] },        // Expands outward diagonally
      { y: 24, segments: [[28, 39], [76, 87]] },    // Splits with diagonal
      { y: 36, segments: [[22, 35], [80, 93]] },    // Outer edges slope out
      { y: 48, segments: [[16, 31], [84, 99]] },    // Continue diagonal
      { y: 60, segments: [[0, 115]] },        // Middle bar full
      { y: 72, segments: [[0, 115]] },
      { y: 84, segments: [[6, 28], [87, 109]] },    // Bottom split - slopes IN
      { y: 96, segments: [[8, 30], [85, 107]] },    // Inner diagonal
      { y: 108, segments: [[10, 32], [83, 105]] },  // Continues inward
      { y: 120, segments: [[12, 32], [83, 103]] },  // Bottom base aligned
    ],
    T: [
      { y: 0, segments: [[0, 115]] },         // Top base full - wider
      { y: 12, segments: [[0, 115]] },
      { y: 24, segments: [[5, 30], [50, 65], [85, 110]] },  // Three parts
      { y: 36, segments: [[50, 65]] },        // Center stem
      { y: 48, segments: [[50, 65]] },
      { y: 60, segments: [[50, 65]] },
      { y: 72, segments: [[50, 65]] },
      { y: 84, segments: [[50, 65]] },
      { y: 96, segments: [[50, 65]] },
      { y: 108, segments: [[45, 70]] },       // Bottom base wider
      { y: 120, segments: [[45, 70]] },
    ],
  },

  colors: {
    F: '#fd1813',
    A: '#0fa14c',
    T: '#1f70c1',
  },

  init(debugMode = false) {
    const container = document.getElementById('fat-logo-container');
    if (!container) return;

    // Use config if available
    const letterData = this.config ? this.convertConfig() : this.letterData;
    const colors = this.config ? this.config.colors : this.colors;
    const spacing = this.config ? this.config.spacing.betweenLetters : 120;
    const barHeight = this.config ? this.config.spacing.barHeight : 10;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 380 165');
    svg.setAttribute('style', 'width: 100%; max-width: 450px; height: auto; shape-rendering: crispEdges; margin: 0 auto; display: block;');

    // Debug mode: Add grid and labels BELOW letters
    if (debugMode) {
      // Create background group
      const bgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      bgGroup.setAttribute('opacity', '0.6');

      // Vertical grid lines every 10px
      for (let x = 0; x < 400; x += 10) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x);
        line.setAttribute('y1', 0);
        line.setAttribute('x2', x);
        line.setAttribute('y2', 150);
        line.setAttribute('stroke', x % 50 === 0 ? '#ff4d00' : '#444');
        line.setAttribute('stroke-width', x % 50 === 0 ? '1' : '0.5');
        bgGroup.appendChild(line);
      }

      // Horizontal grid lines
      for (let y = 0; y < 150; y += 12) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', 0);
        line.setAttribute('y1', y);
        line.setAttribute('x2', 400);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', '#444');
        line.setAttribute('stroke-width', '0.5');
        bgGroup.appendChild(line);
      }

      svg.appendChild(bgGroup);

      // Number labels BELOW the logo area
      for (let x = 0; x < 400; x += 10) {
        if (x % 10 === 0) {
          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('x', x + 1);
          text.setAttribute('y', 155);
          text.setAttribute('fill', '#b9d3d7');
          text.setAttribute('font-size', '6');
          text.setAttribute('font-family', 'monospace');
          text.textContent = x;
          svg.appendChild(text);
        }
      }

      // Adjust viewBox to show numbers above
      svg.setAttribute('viewBox', '0 -15 380 160');
    }

    const letters = [
      { letter: 'F', offsetX: 0 },
      { letter: 'A', offsetX: spacing },
      { letter: 'T', offsetX: spacing * 2 },
    ];

    const allBars = [];

    // Create all bars
    letters.forEach(({ letter, offsetX }) => {
      const color = colors[letter];
      const data = letterData[letter];

      data.forEach(row => {
        row.segments.forEach(([x1, x2]) => {
          const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rect.setAttribute('x', offsetX + x1);
          rect.setAttribute('y', row.y);
          rect.setAttribute('width', '0'); // Start at 0 width
          rect.setAttribute('height', barHeight);
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
      if (currentRow >= rows.length) {
        // All rows complete - show [solutions] text
        setTimeout(() => {
          const solutionsText = document.getElementById('solutions-text');
          if (solutionsText) {
            solutionsText.style.opacity = '1';
          }
        }, 300);
        return;
      }

      const rowY = rows[currentRow];
      const barsInRow = allBars.filter(b => b.row === rowY);

      // Reveal all bars in row simultaneously
      barsInRow.forEach((bar) => {
        bar.rect.style.transition = 'width 0.15s cubic-bezier(0.16, 1, 0.3, 1)';
        bar.rect.setAttribute('width', bar.fullWidth);
      });

      currentRow++;
      setTimeout(animateNextRow, 200); // Pause between rows
    }

    // Start animation after short delay
    setTimeout(animateNextRow, 300);
  }
};

// Initialize
const DEBUG_MODE = false; // Set to true to see grid

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => FATLogo.init(DEBUG_MODE));
} else {
  FATLogo.init(DEBUG_MODE);
}
