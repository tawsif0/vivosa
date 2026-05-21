const fs = require('fs');
const logPath = 'C:\\Users\\Emon\\.gemini\\antigravity\\brain\\44602d8a-e390-45b6-b414-1ed341748140\\.system_generated\\logs\\transcript.jsonl';

const lines = fs.readFileSync(logPath, 'utf8').split('\n');
const requests = [];

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.type === 'USER_INPUT') {
      requests.push(obj.content);
    }
  } catch (e) {
    // ignore
  }
}

console.log('--- ALL USER REQUESTS ---');
requests.forEach((req, idx) => {
  console.log(`[Request ${idx + 1}]:\n`, req);
  console.log('-------------------------');
});
