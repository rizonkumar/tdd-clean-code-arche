const fs = require("fs");
const path = require("path");

const indexJsPath = path.join(__dirname, "dist/src/index.js");
const carouselJsPath = path.join(__dirname, "dist/src/Carousel.js");

console.log("Checking build output...");

if (fs.existsSync(indexJsPath)) {
  console.log("✅ index.js exists");
  const content = fs.readFileSync(indexJsPath, "utf8");
  if (content.includes("window.Carousel = Carousel")) {
    console.log("✅ Global export found");
  } else {
    console.log("❌ Global export not found");
  }
} else {
  console.log("❌ index.js not found");
}

if (fs.existsSync(carouselJsPath)) {
  console.log("✅ Carousel.js exists");
  const content = fs.readFileSync(carouselJsPath, "utf8");
  if (content.includes("export class Carousel")) {
    console.log("✅ ES module export found");
  } else {
    console.log("❌ ES module export not found");
  }
} else {
  console.log("❌ Carousel.js not found");
}

console.log("\nBuild verification complete!");
console.log("You can now test the demo at: http://localhost:8000/demo.html");
