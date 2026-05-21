const fs = require('fs');

const logPath = 'C:\\Users\\Emon\\.gemini\\antigravity\\brain\\44602d8a-e390-45b6-b414-1ed341748140\\.system_generated\\logs\\transcript.jsonl';
const lines = fs.readFileSync(logPath, 'utf8').split('\n');
const fileLines = {};

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.type === 'VIEW_FILE' && obj.content.includes('Total Lines: 512') && obj.content.includes('Showing lines 1 to 512')) {
      const contentLines = obj.content.split('\n');
      for (const cl of contentLines) {
        const match = cl.match(/^(\d+):\s(.*)$/);
        if (match) {
          fileLines[parseInt(match[1])] = match[2];
        }
      }
    }
  } catch (e) { }
}

const keys = Object.keys(fileLines).map(Number);
if (keys.length > 0) {
  const maxLine = Math.max(...keys);
  const output = [];
  for (let i = 1; i <= maxLine; i++) {
    output.push(fileLines[i] !== undefined ? fileLines[i] : '');
  }
  fs.writeFileSync('c:\\Users\\Emon\\Desktop\\New folder\\vivosa\\client\\src\\pages\\About_redesigned.jsx', output.join('\n'), 'utf8');
  console.log('Successfully wrote redesigned file up to line', maxLine);
}
