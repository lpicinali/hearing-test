import jsPDF from 'jspdf'

import html2pdf from 'src/pdf/jspdf.html2pdf.js'

const css = `
@font-face {
  font-family: 'HT-Lato';
  font-style: normal;
  font-weight: normal;
  src: local('Lato'), local('Lato-Regular'),
    url('/fonts/Lato-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'HT-Lato';
  font-style: normal;
  font-weight: bold;
  src: local('Lato Black'), local('Lato-Black'),
    url('/fonts/Lato-Black.ttf') format('truetype');
}

@font-face {
  font-family: 'HT-PT-Mono';
  font-style: normal;
  font-weight: normal;
  src: local('PT Mono'), local('PT-Mono'),
    url('/fonts/PTM55FT.ttf') format('truetype');
}

* {
  box-sizing: border-box;
}

html,
body {
  min-height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'HT-Lato', sans-serif;
  color: #001e3e;
  line-height: 1.5;
}

body > * {
  padding: 40px;
}

h1,
h2 {
  color: #00356c;
}

h1 {
  font-size: 40px !important;
  letter-spacing: -1px;
}

a {
  color: #2586eb;
}

.Header {
  margin-bottom: 40px;
  padding: 40px 0 56px;
  border-bottom: 1px solid #e1e8f0;
  text-align: center;
}

.Header > * {
  max-width: 600px;
  margin: 0 auto;
}

.Header p {
  margin-top: 32px;
}

.Row {
  display: flex;
  margin-right: -20px;
  margin-left: -20px;
}

.Col {
  flex-grow: 1;
  padding-right: 20px;
  padding-left: 20px;
}

.HearingLossCode {
  color: #2586eb;
  font-family: 'HT-PT-Mono', monospace;
  font-size: 48px;
}
`

export default function createPdf(html) {
  return new Promise((resolve, reject) => {
    const styledHtml = `
      <div>
        <style type="text/css">${css}</style>
        ${html}
      </div>
    `

    console.log(styledHtml)

    const pdf = new jsPDF()
    // pdf.text('Hey there', 10, 10)
    // pdf.save('doc.pdf')
    html2pdf(styledHtml, pdf, populatedPdf => {
      resolve(populatedPdf)
    })
  })
}
