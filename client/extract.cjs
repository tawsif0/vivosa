const fs = require('fs');
const html = fs.readFileSync('C:/Users/Emon/.gemini/antigravity/brain/27338671-2ad5-485d-adfc-702f0d22c2c2/scratch/page.html', 'utf-8');

const regex = /<h4 class="elementor-heading-title elementor-size-default">([\s\S]*?)<\/h4>[\s\S]*?<div class="elementor-widget-container">\s*([^<]+)<\/div>\s*<\/div>/g;

let match;
while ((match = regex.exec(html)) !== null) {
  let title = match[1].trim();
  let desc = match[2].trim().replace(/\s+/g, ' ');
  if (desc.length > 50 && !desc.includes("We offer a wide range")) {
      console.log('---');
      console.log('TITLE:', title);
      console.log('DESC:', desc);
  }
}
