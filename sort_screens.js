const fs = require('fs');

const data = JSON.parse(fs.readFileSync('C:/Users/Acer/.gemini/antigravity-ide/brain/fcdf9c88-86c1-4dd5-9fcf-10afafdee13c/.system_generated/steps/16/output.txt', 'utf8'));
const project = data.projects.find(p => p.title.includes('VitalSync'));

const screens = project.screenInstances
  .filter(s => s.sourceScreen)
  .sort((a, b) => a.x - b.x)
  .map(s => ({ id: s.id, x: s.x, sourceScreen: s.sourceScreen }));

fs.writeFileSync('screens_sorted.json', JSON.stringify(screens, null, 2));
console.log('Saved sorted screens to screens_sorted.json');
