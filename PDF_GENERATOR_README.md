# Resume PDF Generator

This project includes a Playwright script that automatically generates a PDF of your resume from the running Vite development server.

## Prerequisites

1. **Playwright installed**: `npm install -D playwright`
2. **Playwright browsers**: `npx playwright install chromium`
3. **Vite development server running**: `npm run dev`

## Usage

### Step 1: Start the Vite Development Server

```bash
npm run dev
```

This will start your resume website on `http://localhost:4000` (or another port if 4000 is busy).

### Step 2: Generate PDF

In a new terminal window:

```bash
npm run generate-pdf
```

OR directly:

```bash
node createAsset.ts
```

## What the Script Does

1. **Launches Chromium browser** in headless mode
2. **Navigates** to your Vite development server
3. **Waits** for the page to fully load (fonts, styles, content)
4. **Generates PDF** with optimized settings for resumes:
   - A4 format
   - 0.5 inch margins
   - Background colors/images included
   - Professional scaling

## Output

The PDF will be saved as: `dist/Kenny_Becerra_Resume.pdf`

## Troubleshooting

- **Port Issues**: The script automatically tries ports 4000, 4001, 4002, 4003, and 3000
- **Loading Issues**: The script waits for the `.main-container` element to ensure your resume content is loaded
- **Styling Issues**: Set `headless: false` in `createAsset.ts` to see the browser and debug visually

## Customization

Edit `createAsset.ts` to customize:

- **PDF filename**: Change the `pdfPath` variable
- **Page format**: Change `format: 'A4'` to 'Letter' or other formats
- **Margins**: Adjust the margin values
- **Scale**: Modify the `scale` value (0.1 to 2.0)
- **Browser visibility**: Set `headless: false` to see the browser in action
