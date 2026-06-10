const fs = require('fs');
const pages = [
    'app/dashboard/page.tsx',
    'app/settings/page.tsx',
    'app/profile/page.tsx',
    'app/goals/page.tsx',
    'app/insights/page.tsx',
    'app/gamified/page.tsx'
];

for (const p of pages) {
    if (!fs.existsSync(p)) continue;
    let content = fs.readFileSync(p, 'utf8');
    
    // Replace Health Records
    content = content.replace(
      /href="#"( className="flex items-center gap-4 px-4 py-3 text-\[#c2c6d6\]\/80 hover:text-\[#dae2fd\] hover:bg-white\/5 transition-all duration-200 rounded-xl group active:translate-x-1">\s*<span className="material-symbols-outlined group-hover:text-\[#adc6ff\]">folder_shared<\/span>\s*<span className="font-\['Inter'\] text-\[14px\]">Health Records<\/span>)/g,
      'href="/goals#health-records"$1'
    );
    // Replace Achievements
    content = content.replace(
      /href="#"( className="flex items-center gap-4 px-4 py-3 text-\[#c2c6d6\]\/80 hover:text-\[#dae2fd\] hover:bg-white\/5 transition-all duration-200 rounded-xl group active:translate-x-1">\s*<span className="material-symbols-outlined group-hover:text-\[#adc6ff\]">military_tech<\/span>\s*<span className="font-\['Inter'\] text-\[14px\]">Achievements<\/span>)/g,
      'href="/gamified"$1'
    );
    // Replace Devices
    content = content.replace(
      /href="#"( className="flex items-center gap-4 px-4 py-3 text-\[#c2c6d6\]\/80 hover:text-\[#dae2fd\] hover:bg-white\/5 transition-all duration-200 rounded-xl group active:translate-x-1">\s*<span className="material-symbols-outlined group-hover:text-\[#adc6ff\]">devices<\/span>\s*<span className="font-\['Inter'\] text-\[14px\]">Devices<\/span>)/g,
      'href="/profile"$1'
    );
    
    fs.writeFileSync(p, content);
}
console.log('Nav fixed!');
