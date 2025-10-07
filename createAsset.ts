import path from "path";
import { chromium } from "playwright";
import { fileURLToPath } from "url";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  console.log("🚀 Starting Playwright PDF and JPEG generation...");

  // Launch browser
  const browser = await chromium.launch({
    headless: true, // Set to false if you want to see the browser
  });

  const page = await browser.newPage();

  // Set viewport to ensure consistent rendering
  //   await page.setViewportSize({
  //     width: 1200,
  //     height: 1600,
  //   });

  try {
    console.log("📡 Navigating to Vite development server...");

    // Navigate to your Vite dev server
    // Default ports: 4000, 4001, 4002, 4003 (check your terminal for the actual port)
    const viteUrl = "http://localhost:4002"; // Update this if your port is different

    await page.goto(viteUrl, {
      waitUntil: "networkidle", // Wait for all network requests to finish
      timeout: 30000, // 30 second timeout
    });

    console.log("⏳ Waiting for page to fully load...");

    // Wait for main content to load
    await page.waitForSelector(".main-container", { timeout: 10000 });

    // Wait a bit more for fonts and styles to load
    await page.waitForTimeout(2000);

    console.log("🖨️ Generating PDF and JPEG...");

    // Generate PDF and image files with resume-optimized settings
    const pdfPath = path.join(__dirname, "dist", "Kenny_Becerra_Resume.pdf");
    const jpegPath = path.join(__dirname, "dist", "Kenny_Becerra_Resume.jpg");
    const pngPath = path.join(__dirname, "dist", "Kenny_Becerra_Resume.png");

    // Generate PDF
    await page.pdf({
      path: pdfPath,
      format: "A4", // Standard resume format
      printBackground: true, // Include background colors/images
      margin: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      scale: 1,
      displayHeaderFooter: false,
      preferCSSPageSize: true,
    });

    console.log(`✅ PDF successfully generated: ${pdfPath}`);

    // Take high-quality image screenshots
    await page.screenshot({
      path: jpegPath,
      type: "jpeg",
      quality: 95,
      fullPage: true,
      omitBackground: false,
      scale: "css",
      clip: { x: 0, y: 0, width: 816, height: 1056 }, // A4 at 150 DPI
    });

    await page.screenshot({
      path: pngPath,
      type: "png",
      fullPage: true,
      omitBackground: false,
      scale: "css",
      clip: { x: 0, y: 0, width: 816, height: 1056 }, // A4 at 150 DPI
    });

    console.log(`✅ JPEG successfully generated: ${jpegPath}`);
    console.log(`✅ PNG successfully generated: ${pngPath}`);
  } catch (error: any) {
    console.error("❌ Error generating PDF:", error.message);

    // Try alternative ports if the default fails
    const alternatePorts = [4001, 4002, 4003, 3000];

    for (const port of alternatePorts) {
      try {
        console.log(`🔄 Trying alternative port: ${port}...`);
        await page.goto(`http://localhost:${port}`, {
          waitUntil: "networkidle",
          timeout: 10000,
        });

        await page.waitForSelector(".main-container", { timeout: 5000 });
        await page.waitForTimeout(2000);

        const pdfPath = path.join(
          __dirname,
          "dist",
          "Kenny_Becerra_Resume.pdf"
        );
        const jpegPath = path.join(
          __dirname,
          "dist",
          "Kenny_Becerra_Resume.jpg"
        );
        const pngPath = path.join(
          __dirname,
          "dist",
          "Kenny_Becerra_Resume.png"
        );

        // Generate PDF
        await page.pdf({
          path: pdfPath,
          format: "A4",
          printBackground: true,
          margin: {
            top: "0.5in",
            bottom: "0.5in",
            left: "0.5in",
            right: "0.5in",
          },
          scale: 0.8,
          displayHeaderFooter: false,
          preferCSSPageSize: false,
        });

        console.log(
          `✅ PDF successfully generated on port ${port}: ${pdfPath}`
        );

        // Generate image screenshots
        await page.screenshot({
          path: jpegPath,
          type: "jpeg",
          quality: 95,
          fullPage: true,
        });

        await page.screenshot({
          path: pngPath,
          type: "png",
          fullPage: true,
        });

        console.log(
          `✅ JPEG successfully generated on port ${port}: ${jpegPath}`
        );
        console.log(
          `✅ PNG successfully generated on port ${port}: ${pngPath}`
        );
        break;
      } catch (portError) {
        console.log(`⚠️ Port ${port} failed, trying next...`);
      }
    }
  } finally {
    await browser.close();
    console.log("🏁 Browser closed. PDF and image generation complete!");
  }
})();
