// FAT Logo Configuration - Matching exact ASCII art structure

const FATLogoConfig = {
  // Letter spacing
  spacing: {
    betweenLetters: 120,  // Horizontal gap between F-A-T
    barHeight: 10,        // How tall each bar is
    rowSpacing: 14,       // Vertical gap between rows (matches ASCII line height)
  },

  // Colors
  colors: {
    F: '#fd1813',  // Red
    A: '#0fa14c',  // Green
    T: '#1f70c1',  // Blue
  },

  // Animation
  animation: {
    barRevealSpeed: 80,    // ms between each bar in a row
    rowDelay: 150,         // ms pause between rows
    startDelay: 300,       // ms before animation starts
  },

  // Letter F - wider by 3px each
  F: {
    rows: [
      { left: [0, 118], right: null },        // Row 0: Full top (+3)
      { left: [0, 118], right: null },        // Row 1
      { left: [15, 40], right: [90, 113] },   // Row 2: Indent + right piece (+3)
      { left: [15, 38], right: null },        // Row 6 (+3)
      { left: [15, 40], right: null },        // Row 5 (+3)
      { left: [15, 88], right: null },        // Row 3: Extended middle bar (+3)
      { left: [15, 88], right: null },        // Row 4 (+3)
      { left: [13, 40], right: null },        // Row 5 (+3)
      { left: [13, 43], right: null },        // Row 8 (+3)
      { left: [8, 48], right: null },         // Row 9: Bottom base (+3)
      { left: [5, 53], right: null },         // Row 10 (+3)
    ]
  },

  // Letter A - wider by 3px each (symmetric)
  A: {
    rows: [
      { left: [35, 83], right: null },        // Row 0: Top centered (+3)
      { left: [32, 86], right: null },        // Row 1: Expands (+3)
      { left: [29, 48], right: [71, 90] },    // Row 2: Splits symmetrically (+3)
      { left: [26, 45], right: [74, 93] },    // Row 3: Wider split (+3)
      { left: [23, 42], right: [77, 96] },    // Row 4: Continues outward (+3)
      { left: [18, 101], right: null },       // Row 6: Full middle bar (+3)
      { left: [16, 103], right: null },       // Row 7 (+3)
      { left: [11, 41], right: [77, 107] },   // Row 8: Bottom split (+3)
      { left: [5, 36], right: [82, 113] },    // Row 9 (+3)
      { left: [5, 36], right: [82, 113] },    // Row 10 (+3)
      { left: [0, 41], right: [77, 118] },    // Row 11: Bottom base (+3)
    ]
  },

  // Letter T - wider by 3px each
  T: {
    rows: [
      { left: [5, 118], right: null },        // Row 0: Full top (+3)
      { left: [5, 118], right: null },        // Row 1 (+3)
      { left: [8, 35], right: [83, 110], center: [50, 73] },  // Row 2: Three parts (+3)
      { left: null, right: null, center: [50, 73] },  // Row 3: Thin stem (+3)
      { left: null, right: null, center: [50, 73] },  // Row 4 (+3)
      { left: null, right: null, center: [50, 73] },  // Row 5 (+3)
      { left: null, right: null, center: [50, 73] },  // Row 6 (+3)
      { left: null, right: null, center: [48, 75] },  // Row 7: Widens (+3)
      { left: null, right: null, center: [48, 75] },  // Row 8 (+3)
      { left: null, right: null, center: [40, 83] },  // Row 9: Bottom base (+3)
      { left: null, right: null, center: [40, 83] },  // Row 10 (+3)
    ]
  }
};

// How to edit:
// 1. Each letter has 8 rows (matching ASCII art lines)
// 2. Numbers are horizontal positions [start, end]
// 3. null = no bar in that position
// 4. Adjust numbers to reshape - use debug mode to see grid!
