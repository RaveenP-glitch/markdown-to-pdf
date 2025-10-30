import { useState } from 'react'
import MarkdownIt from 'markdown-it'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import './App.css'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

function App() {
  const [fromType, setFromType] = useState('markdown')
  const [toType, setToType] = useState('pdf')
  const [selectedFile, setSelectedFile] = useState(null)
  const [isConverting, setIsConverting] = useState(false)
  const [convertedBlob, setConvertedBlob] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [fileName, setFileName] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setFileName(file.name)
      setConvertedBlob(null)
      setShowSuccess(false)
    }
  }

  const renderPage = async (pdf, container, elements, pageIndex, pageWidth, pageHeight, marginTop) => {
    // Create a temporary page container
    const pageContainer = document.createElement('div')
    pageContainer.style.position = 'absolute'
    pageContainer.style.left = '-9999px'
    pageContainer.style.top = '0'
    pageContainer.style.width = container.style.width
    pageContainer.style.padding = container.style.padding
    pageContainer.style.backgroundColor = 'white'
    pageContainer.style.fontFamily = container.style.fontFamily
    pageContainer.style.fontSize = container.style.fontSize
    pageContainer.style.lineHeight = container.style.lineHeight
    pageContainer.style.color = container.style.color
    pageContainer.style.boxSizing = 'border-box'
    
    // Clone the styles
    const styleElement = container.querySelector('style')
    if (styleElement) {
      pageContainer.appendChild(styleElement.cloneNode(true))
    }
    
    // Add elements for this page
    elements.forEach(el => {
      pageContainer.appendChild(el.cloneNode(true))
    })
    
    document.body.appendChild(pageContainer)
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Convert to canvas
    const canvas = await html2canvas(pageContainer, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: pageContainer.scrollWidth,
      height: pageContainer.scrollHeight,
    })
    
    document.body.removeChild(pageContainer)
    
    // Add to PDF
    const imgData = canvas.toDataURL('image/png')
    const imgWidth = pageWidth
    const imgHeight = (canvas.height * pageWidth) / canvas.width
    
    if (pageIndex > 0) {
      pdf.addPage()
    }
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
  }

  const convertMarkdownToPDF = async () => {
    if (!selectedFile) return

    setIsConverting(true)
    setShowSuccess(false)

    try {
      // Read the markdown file
      const text = await selectedFile.text()
      
      // Convert markdown to HTML
      const html = md.render(text)
      
      // Create a temporary container for rendering
      const tempContainer = document.createElement('div')
      tempContainer.style.position = 'absolute'
      tempContainer.style.left = '-9999px'
      tempContainer.style.top = '0'
      tempContainer.style.width = '794px' // A4 width at 96 DPI (210mm)
      tempContainer.style.padding = '75px 57px' // 20mm margins converted to pixels
      tempContainer.style.backgroundColor = 'white'
      tempContainer.style.fontFamily = 'Arial, sans-serif'
      tempContainer.style.fontSize = '14px'
      tempContainer.style.lineHeight = '1.6'
      tempContainer.style.color = '#333'
      tempContainer.style.boxSizing = 'border-box'
      
      // Style the HTML content with proper formatting
      tempContainer.innerHTML = `
        <div style="max-width: 100%;">
          <style>
            * { box-sizing: border-box; }
            h1 { 
              font-size: 28px; 
              margin-top: 0;
              margin-bottom: 16px; 
              color: #2c3e50; 
              line-height: 1.3;
            }
            h2 { 
              font-size: 24px; 
              margin-top: 20px;
              margin-bottom: 12px; 
              color: #34495e; 
              line-height: 1.3;
            }
            h3 { 
              font-size: 20px; 
              margin-top: 18px;
              margin-bottom: 10px; 
              color: #34495e; 
              line-height: 1.3;
            }
            h4, h5, h6 { 
              font-size: 16px; 
              margin-top: 16px;
              margin-bottom: 8px; 
              color: #34495e; 
              line-height: 1.3;
            }
            p { 
              margin-bottom: 12px;
              line-height: 1.6;
            }
            ul, ol { 
              margin-bottom: 12px; 
              padding-left: 24px;
            }
            li { 
              margin-bottom: 6px;
              line-height: 1.5;
            }
            code { 
              background-color: #f4f4f4; 
              padding: 3px 6px; 
              border-radius: 3px; 
              font-family: 'Courier New', Courier, monospace;
              font-size: 13px;
              word-wrap: break-word;
            }
            pre { 
              background-color: #f4f4f4; 
              padding: 12px; 
              border-radius: 6px; 
              margin-bottom: 12px;
              overflow-wrap: break-word;
              white-space: pre-wrap;
              word-wrap: break-word;
              max-width: 100%;
            }
            pre code { 
              background-color: transparent; 
              padding: 0;
              word-wrap: break-word;
              white-space: pre-wrap;
              font-size: 12px;
            }
            blockquote { 
              border-left: 4px solid #ddd; 
              padding-left: 16px; 
              margin-left: 0; 
              margin-bottom: 12px; 
              color: #666;
            }
            a { 
              color: #3498db; 
              text-decoration: none; 
              word-wrap: break-word;
            }
            table { 
              border-collapse: collapse; 
              width: 100%; 
              margin-bottom: 12px;
              font-size: 13px;
            }
            th, td { 
              border: 1px solid #ddd; 
              padding: 8px; 
              text-align: left;
            }
            th { 
              background-color: #f4f4f4; 
              font-weight: bold; 
            }
            img { 
              max-width: 100%; 
              height: auto;
            }
            hr { 
              border: none; 
              border-top: 1px solid #ddd; 
              margin: 20px 0;
            }
          </style>
          ${html}
        </div>
      `
      
      document.body.appendChild(tempContainer)
      
      // Wait for rendering
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
        hotfixes: ['px_scaling']
      })
      
      const pageWidth = 794 // A4 width in pixels at 96 DPI
      const pageHeight = 1123 // A4 height in pixels at 96 DPI
      const marginTop = 75
      const marginBottom = 75
      const contentHeight = pageHeight - marginTop - marginBottom
      
      // Get all direct children that could be split
      const contentDiv = tempContainer.querySelector('div')
      const elements = Array.from(contentDiv.children)
      
      let currentPage = 0
      let currentY = marginTop
      let pageElements = []
      
      // Group elements by page
      for (const element of elements) {
        const elementHeight = element.offsetHeight
        
        // If element doesn't fit on current page and we have content, start new page
        if (currentY + elementHeight > pageHeight - marginBottom && pageElements.length > 0) {
          // Render current page
          await renderPage(pdf, tempContainer, pageElements, currentPage, pageWidth, pageHeight, marginTop)
          
          currentPage++
          currentY = marginTop
          pageElements = []
        }
        
        // Add element to current page
        pageElements.push(element)
        currentY += elementHeight
      }
      
      // Render last page
      if (pageElements.length > 0) {
        await renderPage(pdf, tempContainer, pageElements, currentPage, pageWidth, pageHeight, marginTop)
      }
      
      // Remove temp container
      document.body.removeChild(tempContainer)
      
      // Create blob
      const pdfBlob = pdf.output('blob')
      setConvertedBlob(pdfBlob)
      setShowSuccess(true)
      
    } catch (error) {
      console.error('Conversion error:', error)
      alert('An error occurred during conversion. Please try again.')
    } finally {
      setIsConverting(false)
    }
  }

  const handleDownload = () => {
    if (!convertedBlob) return

    // Create download link
    const url = URL.createObjectURL(convertedBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName.replace(/\.[^/.]+$/, '') + '.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const isConvertDisabled = !selectedFile || isConverting

  return (
    <div className="app-container">
      {isConverting && (
        <div className="loader-overlay">
          <div className="loader-content">
            <div className="loader"></div>
            <div className="loader-text">Converting your file with smart page breaks...</div>
          </div>
        </div>
      )}
      
      <div className="converter-card">
        <h1 className="title">File Converter</h1>
        <p className="subtitle">Convert your markdown files to PDF with ease</p>
        
        <div className="dropdowns-container">
          <div className="dropdown-wrapper">
            <label className="dropdown-label">From</label>
            <select 
              className="dropdown" 
              value={fromType}
              onChange={(e) => setFromType(e.target.value)}
            >
              <option value="markdown">Markdown (.md)</option>
              <option value="text" disabled>Text (.txt) - Coming Soon</option>
              <option value="html" disabled>HTML (.html) - Coming Soon</option>
            </select>
          </div>
          
          <div className="dropdown-wrapper">
            <label className="dropdown-label">To</label>
            <select 
              className="dropdown"
              value={toType}
              onChange={(e) => setToType(e.target.value)}
            >
              <option value="pdf">PDF (.pdf)</option>
              <option value="docx" disabled>Word (.docx) - Coming Soon</option>
              <option value="html" disabled>HTML (.html) - Coming Soon</option>
            </select>
          </div>
        </div>
        
        <div className="upload-area">
          <div className="file-input-wrapper">
            <input
              type="file"
              id="file-input"
              accept=".md,.markdown"
              onChange={handleFileChange}
            />
            <label 
              htmlFor="file-input" 
              className={`file-input-label ${selectedFile ? 'has-file' : ''}`}
            >
              <div>
                <div className="upload-icon">
                  {selectedFile ? '✓' : '📁'}
                </div>
                <div className="upload-text">
                  {selectedFile ? 'File Selected' : 'Click to select a file'}
                </div>
                {selectedFile && (
                  <div className="file-name">{fileName}</div>
                )}
              </div>
            </label>
          </div>
        </div>
        
        <div className="buttons-container">
          <button 
            className="btn btn-convert"
            onClick={convertMarkdownToPDF}
            disabled={isConvertDisabled}
          >
            Convert
          </button>
          <button 
            className="btn btn-download"
            onClick={handleDownload}
            disabled={!convertedBlob}
          >
            Download
          </button>
        </div>
        
        {showSuccess && (
          <div className="success-message">
            ✓ Conversion successful! Click download to save your PDF.
          </div>
        )}
      </div>
    </div>
  )
}

export default App

