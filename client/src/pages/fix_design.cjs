const fs = require('fs');

const content = fs.readFileSync('c:\\Users\\Emon\\Desktop\\New folder\\vivosa\\client\\src\\pages\\About_redesigned.jsx', 'utf8');

// Replace custom font styles with Tailwind font classes
let fixed = content.replace(/style=\{\{\s*fontFamily:[^}]+\}\}/g, '');
fixed = fixed.replace(/\s*style=\{\{\s*\}\}\s*/g, '');

// Replace specific hardcoded colors with theme variables
fixed = fixed.replace(/bg-\[\#edf7f2\]/g, 'bg-background');
fixed = fixed.replace(/text-\[\#0e7448\]/g, 'text-primary');
fixed = fixed.replace(/bg-\[\#0e7448\]\/\d+/g, 'bg-primary/10');
fixed = fixed.replace(/border-\[\#0e7448\]\/\d+/g, 'border-outline-variant/30');
fixed = fixed.replace(/text-\[\#334139\]/g, 'text-secondary');
fixed = fixed.replace(/text-\[\#cda250\]/g, 'text-tertiary-container');
fixed = fixed.replace(/bg-\[\#eaf5ef\]/g, 'bg-surface-container-low');
fixed = fixed.replace(/border-\[\#cda250\]/g, 'border-tertiary-container');
fixed = fixed.replace(/bg-\[\#0f172a\]/g, 'bg-surface-container-highest');
fixed = fixed.replace(/bg-\[\#004b35\]/g, 'bg-primary-container');
fixed = fixed.replace(/text-[#4caf50]/g, 'text-primary');
fixed = fixed.replace(/text-[#ff9800]/g, 'text-tertiary');
fixed = fixed.replace(/text-[#f44336]/g, 'text-error');
fixed = fixed.replace(/text-[#2b6951]/g, 'text-primary');

// Replace specific typography structure classes
// e.g. "text-xl sm:text-2xl font-bold uppercase tracking-[0.2em] text-[#0e7448] font-space text-center"
fixed = fixed.replace(/text-xl sm:text-2xl font-bold uppercase tracking-\[0\.2em\][^\"]+/g, 'font-display text-headline-xl text-primary text-center editorial-underline');

// Replace body fonts
fixed = fixed.replace(/text-sm sm:text-base leading-relaxed/g, 'font-body text-body-md text-secondary leading-relaxed');

// The original UI used `group rounded-xl overflow-hidden shadow-lg border border-outline/5 bg-[#faf8f5] hover-lift hover-lift-emerald` for product category cards, as user stated:
// Let's replace the cards in product category:
// "border border-[#0e7448]/10 rounded-2xl bg-white shadow-lg overflow-hidden flex flex-col hover-lift hover-lift-emerald"
fixed = fixed.replace(/border border-outline-variant\/30 rounded-2xl bg-white shadow-lg overflow-hidden flex flex-col hover-lift hover-lift-emerald/g, 'group rounded-xl overflow-hidden shadow-lg border border-outline/5 bg-surface-container-low hover-lift');
fixed = fixed.replace(/bg-white/g, 'bg-surface');

// Let's replace the horizontal dividers (h-[1.5px] w-12 sm:w-20 bg-[#0e7448]/30) with nothing, since we use editorial-underline
fixed = fixed.replace(/<div className="h-\[1\.5px\][^>]+><\/div>/g, '');

fs.writeFileSync('c:\\Users\\Emon\\Desktop\\New folder\\vivosa\\client\\src\\pages\\About.jsx', fixed, 'utf8');
console.log('Successfully fixed design and wrote to About.jsx');
