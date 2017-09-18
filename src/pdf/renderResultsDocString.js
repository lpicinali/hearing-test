import React from 'react'
import { renderToString } from 'react-dom/server'

import configs from 'src/configs.js'
import ResultsDoc from 'src/pdf/ResultsDoc.js'

const styles = `
@font-face {
  font-family: 'HT-Lato';
  font-style: normal;
  font-weight: normal;
  src: local('Lato'), local('Lato-Regular'),
    url('${configs.siteUrl}/fonts/Lato-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'HT-Lato';
  font-style: normal;
  font-weight: bold;
  src: local('Lato Black'), local('Lato-Black'),
    url('${configs.siteUrl}/fonts/Lato-Black.ttf') format('truetype');
}

@font-face {
  font-family: 'HT-PT-Mono';
  font-style: normal;
  font-weight: normal;
  src: local('PT Mono'), local('PT-Mono'),
    url('${configs.siteUrl}/fonts/PTM55FT.ttf') format('truetype');
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
  font-size: 12px;
  color: #001e3e;
  line-height: 1.5;
}

body > * {
  padding: 40px;
}

h1,
h2 {
  color: #00356c;
  font-weight: bold;
}

h1 {
  font-size: 40px !important;
  letter-spacing: -1px;
  line-height: 1;
}

.Header {
  margin-bottom: 40px;
  padding: 40px 0 56px;
  border-bottom: 1px solid #e1e8f0;
  text-align: center;
}

.Header h1,
.Header p {
  max-width: 400px;
  margin: 0 auto;
}

.Header p {
  margin-top: 32px;
}

.Header a {
  color: #2586eb;
}

.Row {
  margin-right: -20px;
  margin-left: -20px;
}

.Col {
  display: inline-block;
  min-width: 260px;
  padding-right: 20px;
  padding-left: 20px;
}

.HearingLossCode {
  color: #2586eb;
  font-family: 'HT-PT-Mono', monospace;
  font-size: 48px;
}
`

export default function renderResultsDocString(props) {
  const contentHtml = renderToString(<ResultsDoc {...props} />)
  const html = `
    <html>
      <head>
        <style>${styles}</style>
      </head>
      <body>${contentHtml}</body>
    </html>`
  // console.log(html)
  return html
}
