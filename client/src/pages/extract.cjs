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
      const contentLines = content.split('\n');
      for (const cl of contentLines) {
        const match = cl.match(/^(\d+):\s(.*)$/);
        if (match) {
          const lineNum = parseInt(match[1]);
          const lineText = match[2];
          fileLines[lineNum] = lineText;
        }
      }
    }
  } catch (e) {
    // ignore parsing errors of truncated lines at the end of the file
  }
}

// Reconstruct
const keys = Object.keys(fileLines).map(Number);
if (keys.length > 0) {
  const maxLine = Math.max(...keys);
  const output = [];
  for (let i = 1; i <= maxLine; i++) {
    output.push(fileLines[i] !== undefined ? fileLines[i] : '');
  }

  fs.writeFileSync('c:\\Users\\Emon\\Desktop\\New folder\\vivosa\\client\\src\\pages\\About_original.jsx', output.join('\n'), 'utf8');
  console.log('Successfully wrote original file up to line', maxLine);
} else {
  console.log('No lines found!');
}
