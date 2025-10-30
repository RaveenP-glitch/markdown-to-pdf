# 📄 File Converter - Markdown to PDF

A beautiful, modern React application for converting Markdown files to PDF with a stunning glassmorphism UI design.

## ✨ Features

- 🎨 **Modern Glassmorphism UI** - Beautiful frosted glass effect with smooth animations
- 📝 **Markdown to PDF Conversion** - Convert your `.md` files to professional PDF documents
- 🎬 **Smooth Animations** - Engaging loading states and transitions
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎯 **Easy to Use** - Simple drag-and-drop or click to upload interface
- ⚡ **Fast & Efficient** - Quick conversion with real-time feedback

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and Yarn installed on your machine. 
- Download Node.js from [nodejs.org](https://nodejs.org/)
- Install Yarn from [yarnpkg.com](https://yarnpkg.com/) or run: `npm install -g yarn`

### Installation

1. **Clone or navigate to the repository:**
   ```bash
   cd markdown-to-pdf
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```
   
   Or simply:
   ```bash
   yarn
   ```

3. **Start the development server:**
   ```bash
   yarn dev
   ```

4. **Open your browser:**
   
   The app will be running at `http://localhost:5173` (or another port if 5173 is busy).

## 🎯 How to Use

1. **Select File Types:**
   - Use the "From" dropdown to select your source format (Markdown)
   - Use the "To" dropdown to select your target format (PDF)

2. **Upload Your File:**
   - Click on the upload area to select a markdown file
   - Or drag and drop your file directly

3. **Convert:**
   - Click the "Convert" button to start the conversion
   - Wait for the conversion to complete (a loader will appear)

4. **Download:**
   - Once conversion is complete, the "Download" button will be enabled
   - Click "Download" to save your converted PDF file

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **markdown-it** - Markdown parser
- **jsPDF** - PDF generation
- **html2canvas** - HTML to canvas conversion
- **CSS3** - Modern animations and glassmorphism effects

## 📦 Build for Production

To create a production build:

```bash
yarn build
```

The optimized files will be in the `dist` folder, ready to be deployed.

To preview the production build locally:

```bash
yarn preview
```

## 🚀 Deploy to Vercel

### Quick Deploy (Recommended)

1. **Push your code to GitHub, GitLab, or Bitbucket**

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository
   - Vercel will auto-detect the settings from `vercel.json`
   - Click "Deploy"

### Manual Configuration (if needed)

If you need to configure manually, use these settings:

**Build & Development Settings:**
- **Framework Preset:** Vite
- **Build Command:** `yarn build`
- **Output Directory:** `dist`
- **Install Command:** `yarn install`
- **Development Command:** `yarn dev`

**Environment Variables:** None required for this project

### Deploy via Vercel CLI

Alternatively, you can deploy using the Vercel CLI:

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

### Post-Deployment

After deployment, your app will be available at:
- `https://your-project-name.vercel.app`
- You can also add a custom domain in Vercel settings

## 🎨 Customization

### Changing Colors

You can customize the gradient background by editing the `background` property in `.app-container` class in `src/App.css`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%);
```

### Adding More Conversion Types

Currently, the app supports Markdown to PDF conversion. To add more formats:

1. Add new options to the dropdown menus in `src/App.jsx`
2. Implement the conversion logic for the new format
3. Update the file type validation in the file input

## 🐛 Troubleshooting

- **Port already in use:** If port 5173 is busy, Vite will automatically use the next available port
- **Conversion fails:** Make sure your markdown file is properly formatted and not corrupted
- **Styles not loading:** Clear your browser cache and restart the dev server

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 🌟 Future Enhancements

- Support for more file formats (HTML, TXT, DOCX)
- Batch file conversion
- Custom PDF styling options
- Cloud storage integration
- File preview before conversion

---

Made with ❤️ using React and modern web technologies

