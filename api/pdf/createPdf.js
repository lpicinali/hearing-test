const path = require('path')
const HtmlToPdf = require('html5-to-pdf')

module.exports = function createPdf({ html }) {
  return new Promise((resolve, reject) => {
    const pdfId = Date.now()
    const pdfFilename = `${pdfId}.pdf`
    const outputPath = path.resolve(__dirname, '../../public/pdf', pdfFilename)

    const htp = new HtmlToPdf({
      inputBody: html,
      outputPath,
      include: [
        {
          type: 'css',
          filePath: path.join(__dirname, 'results-pdf.css'),
        },
      ],
      options: {
        printBackground: true,
      },
    })
    htp.build(err => {
      if (err) {
        reject(err)
      } else {
        resolve(pdfId)
      }
    })
  })
}
