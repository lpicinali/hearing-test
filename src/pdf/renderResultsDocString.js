import React from 'react'
import { renderToString } from 'react-dom/server'

import ResultsDoc from 'src/pdf/ResultsDoc.js'

export default function renderResultsDocString(props) {
  const html = renderToString(<ResultsDoc {...props} />)
  return html
}
