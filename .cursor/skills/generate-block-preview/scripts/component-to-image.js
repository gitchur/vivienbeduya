#!/usr/bin/env node

/**
 * Component to Image Converter
 * 
 * Converts React/Tailwind/HTML components to PNG images.
 * Useful for creating block preview images from Figma MCP output.
 * 
 * AUTOMATED: Just runs and creates the PNG file - no manual intervention needed.
 * PORTABLE: Copy this file to any project that needs component screenshots.
 * 
 * Usage:
 *   node .flight/component-to-image.js <input-file> <output-path> [options]
 *   node .flight/component-to-image.js component.html output.png
 *   node .flight/component-to-image.js component.html output.png --width 1920 --bg "#000"
 * 
 * Arguments:
 *   <input-file>    Path to HTML file containing component markup
 *   <output-path>   Where to save the PNG image
 * 
 * Options:
 *   --width         Viewport width (default: 1400)
 *   --height        Viewport height (default: 900)
 *   --bg            Background color (default: #000000)
 *   --padding       Body padding (default: 40px)
 *   --help          Show this help message
 * 
 * Prerequisites:
 *   npm install puppeteer --save-dev
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// ============================================
// CLI ARGUMENT PARSING
// ============================================

function showHelp() {
  console.log(`
Component to Image Converter
============================

Fully automated tool that converts HTML/React/Tailwind components to PNG images.
Perfect for creating Sanity CMS block preview images from Figma MCP output.

Prerequisites:
  npm install puppeteer --save-dev

Usage:
  node .flight/component-to-image.js <input-file> <output-path> [options]

Arguments:
  <input-file>    Path to HTML file containing component markup (or '-' for stdin)
  <output-path>   Where to save the PNG image (creates directories automatically)

Options:
  --width <px>    Viewport width (default: 1400)
  --height <px>   Viewport height (default: 900)
  --bg <color>    Background color (default: #000000)
  --padding <px>  Body padding (default: 40px)
  --help          Show this help message

Examples:
  # Basic usage - creates PNG automatically
  node .flight/component-to-image.js component.html output.png

  # Figma MCP output → Sanity block preview
  node .flight/component-to-image.js figma-hero.html src/sanity/assets/block-hero.png

  # Custom viewport and background
  node .flight/component-to-image.js component.html output.png --width 1920 --bg "#1c1c1c"

  # Read from stdin
  echo '<div>Hello</div>' | node .flight/component-to-image.js - output.png

Integration:
  1. Generate image from Figma component
  2. Add to src/sanity/assets/images.ts
  3. Use in block schema: image: images.blockName.src
  4. Preview shows in Sanity Studio block picker
  `);
  process.exit(0);
}

function parseArgs() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
  }
  
  if (args.length < 2) {
    console.error('❌ Error: Missing required arguments\n');
    console.error('Usage: node .flight/component-to-image.js <input-file> <output-path>\n');
    console.error('Run with --help for more information');
    process.exit(1);
  }
  
  const config = {
    inputFile: args[0],
    outputPath: args[1],
    width: 1400,
    height: 900,
    backgroundColor: '#000000',
    padding: '40px'
  };
  
  // Parse options
  for (let i = 2; i < args.length; i++) {
    switch (args[i]) {
      case '--width':
        config.width = parseInt(args[++i], 10);
        break;
      case '--height':
        config.height = parseInt(args[++i], 10);
        break;
      case '--bg':
      case '--background':
        config.backgroundColor = args[++i];
        break;
      case '--padding':
        config.padding = args[++i];
        break;
      default:
        console.warn(`⚠️  Unknown option: ${args[i]}`);
    }
  }
  
  return config;
}

// ============================================
// MAIN FUNCTION
// ============================================

async function componentToImage(componentHTML, outputPath, options = {}) {
  const {
    width = 1400,
    height = 900,
    backgroundColor = '#000000',
    padding = '40px'
  } = options;
  
  console.log('🚀 Starting component rendering...');
  
  let browser;
  try {
    // Launch headless browser
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width, height });
    
    // Create HTML with Tailwind CDN
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body {
              margin: 0;
              padding: ${padding};
              background-color: ${backgroundColor};
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: 'Aeonik', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }
          </style>
        </head>
        <body>
          ${componentHTML}
        </body>
      </html>
    `;
    
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Wait a bit for fonts and rendering
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find the component element and screenshot it
    const element = await page.$('body > div');
    
    if (element) {
      await element.screenshot({ 
        path: outputPath,
        omitBackground: false
      });
      console.log(`✅ Image saved to: ${outputPath}`);
    } else {
      console.error('❌ Could not find component element');
    }
    
  } catch (error) {
    console.error('❌ Error rendering component:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// ============================================
// READ INPUT
// ============================================

async function readInput(inputPath) {
  if (inputPath === '-') {
    // Read from stdin
    return new Promise((resolve, reject) => {
      let data = '';
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', chunk => data += chunk);
      process.stdin.on('end', () => resolve(data));
      process.stdin.on('error', reject);
    });
  } else {
    // Read from file
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input file not found: ${inputPath}`);
    }
    return fs.readFileSync(inputPath, 'utf8');
  }
}

// ============================================
// RUN
// ============================================

(async () => {
  try {
    const config = parseArgs();
    
    // Read component HTML
    console.log(`📖 Reading component from: ${config.inputFile === '-' ? 'stdin' : config.inputFile}`);
    const componentHTML = await readInput(config.inputFile);
    
    if (!componentHTML.trim()) {
      throw new Error('Input is empty');
    }
    
    // Ensure output directory exists
    const outputDir = path.dirname(config.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`📁 Created output directory: ${outputDir}`);
    }
    
    // Convert component to image
    await componentToImage(componentHTML, config.outputPath, {
      width: config.width,
      height: config.height,
      backgroundColor: config.backgroundColor,
      padding: config.padding
    });
    
    console.log('\n📸 Component successfully converted to image!');
    console.log(`   Output: ${config.outputPath}`);
    console.log(`   Viewport: ${config.width}x${config.height}`);
    console.log(`   Background: ${config.backgroundColor}`);
    
  } catch (error) {
    console.error('\n💥 Failed to convert component:', error.message);
    process.exit(1);
  }
})();

// ============================================
// USAGE EXAMPLES
// ============================================

/*

EXAMPLE 1: Basic usage - Create component HTML file and convert
---------------------------------------------------------
# 1. Ensure puppeteer is installed
npm install puppeteer --save-dev

# 2. Save your component HTML to a file
echo '<div class="bg-black p-10 text-white">Hello World</div>' > component.html

# 3. Convert to image (fully automated)
node .flight/component-to-image.js component.html output.png


EXAMPLE 2: Use with Figma MCP output
---------------------------------------------------------
# 1. Extract component from Figma using get_design_context
# 2. Save the Tailwind HTML to figma-component.html
# 3. Convert to image (creates PNG automatically)
node .flight/component-to-image.js figma-component.html src/sanity/assets/block-newsletter.png

# 4. Register in src/sanity/assets/images.ts
# 5. Use in block schema: image: images.blockNewsletter.src
# 6. Compare implementation with Figma screenshot from get_screenshot


EXAMPLE 3: Custom viewport and background
---------------------------------------------------------
node .flight/component-to-image.js component.html output.png --width 1920 --height 1080 --bg "#1c1c1c"


EXAMPLE 4: Pipe from stdin
---------------------------------------------------------
echo '<div class="bg-gray-900 p-8 text-white rounded-lg">Newsletter</div>' | \
  node .flight/component-to-image.js - output.png


EXAMPLE 5: Create block preview images for Sanity CMS
---------------------------------------------------------
# Generate preview images for all blocks
node .flight/component-to-image.js hero.html src/sanity/assets/block-hero.png
node .flight/component-to-image.js newsletter.html src/sanity/assets/block-newsletter.png
node .flight/component-to-image.js carousel.html src/sanity/assets/block-carousel.png

# Images automatically show in Sanity Studio block picker


EXAMPLE 6: Use as Node module
---------------------------------------------------------
const { componentToImage } = require('./.flight/component-to-image.js');

await componentToImage(
  '<div>My Component</div>', 
  'src/sanity/assets/block-myblock.png',
  { width: 1920, backgroundColor: '#000' }
);


WORKFLOW: Figma to Block Implementation
---------------------------------------------------------
1. Extract design from Figma MCP:
   - get_design_context → Copy Tailwind HTML to figma-component.html
   - get_screenshot → Save as figma-reference.png

2. Generate preview (automated):
   node .flight/component-to-image.js figma-component.html src/sanity/assets/block-name.png

3. Register image:
   - Add to src/sanity/assets/images.ts
   - Reference in block schema: image: images.blockName.src

4. Implement in Linaria (see AGENTS.md for conversion guide)

5. Validate:
   - Compare your implementation vs src/sanity/assets/block-name.png
   - Compare against figma-reference.png from MCP
   - Adjust until visually identical

*/

// Export for use in other scripts
module.exports = { componentToImage, readInput };
