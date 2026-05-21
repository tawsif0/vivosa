const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\Emon\\.gemini\\antigravity\\brain\\44602d8a-e390-45b6-b414-1ed341748140\\.system_generated\\logs\\transcript.jsonl';
const fileLines = {};

const lines = fs.readFileSync(logPath, 'utf8').split('\n');

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.step_index === 192 || obj.step_index === 194) {
      const content = obj.content;
      // Content has "Showing lines X to Y\nThe following code has been modified..."
      // Let's find where the line numbered lines start.
      const contentLines = content.split('\n');
      for (const cl of contentLines) {
        const match = cl.match(/^(\d+):\s(.*)$/);
        if (match) {
          const lineNum = parseInt(match[1]);
          const lineText = match[2];
          fileLines[lineNum] = lineText;
        } else {
          // Sometimes lines might span multiple lines if there was a newline in the line itself,
          // but in this view_file output, each line is prefixed. If it doesn't match, let's see.
        }
      }
    }
  } catch (e) {
    console.error('Error parsing line:', e);
  }
}

// Reconstruct
const maxLine = Math.max(...Object.keys(fileLines).map(Number));
const output = [];
for (let i = 1; i <= maxLine; i++) {
  output.push(fileLines[i] !== undefined ? fileLines[i] : '');
}

fs.writeFileSync('c:\\Users\\Emon\\Desktop\\New folder\\vivosa\\client\\src\\pages\\About_original.jsx', output.join('\n'), 'utf8');
console.log('Successfully wrote original file up to line', maxLine);
