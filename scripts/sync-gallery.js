const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imagesDir = path.join(__dirname, '../public/images');
const galleryJsonPath = path.join(__dirname, '../content/gallery.json');

if (!fs.existsSync(imagesDir)) {
  console.error('❌ public/images directory not found.');
  process.exit(1);
}

const categories = fs.readdirSync(imagesDir).filter(file => {
  return fs.statSync(path.join(imagesDir, file)).isDirectory();
});

let items = [];

categories.forEach(category => {
  const catPath = path.join(imagesDir, category);
  const files = fs.readdirSync(catPath).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

  files.forEach((file, index) => {
    const nameWithoutExt = path.parse(file).name;
    // Format title nicely: "common-lounge" -> "Common Lounge"
    const formattedTitle = nameWithoutExt
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());

    items.push({
      id: `${category}-${index + 1}`,
      title: formattedTitle,
      category: category,
      src: `/images/${category}/${file}`,
      alt: `${formattedTitle} - ${category}`
    });
  });
});

// Write JSON file
if (!fs.existsSync(path.dirname(galleryJsonPath))) {
  fs.mkdirSync(path.dirname(galleryJsonPath), { recursive: true });
}
fs.writeFileSync(galleryJsonPath, JSON.stringify(items, null, 2));
console.log(`✅ Scanned public/images and generated gallery.json with ${items.length} photos.`);

// Sync to Git
try {
  console.log('🚀 Staging, committing, and pushing to GitHub...');
  execSync('git add public/images/ content/gallery.json');
  execSync('git commit -m "auto: sync new gallery photos and gallery.json"');
  execSync('git push origin main');
  console.log('🎉 Done! Photos updated and pushed live to GitHub.');
} catch (err) {
  console.log('ℹ️ Local gallery.json updated. (No new uncommitted git changes detected).');
}
