/* eslint no-unused-expressions: 0 */
import { injectGlobal } from 'styled-components'

import { SILVER } from 'src/styles/colors.js'
import { FONT_NORMAL } from 'src/styles/type.js'

injectGlobal`
@font-face {
  font-family: 'HT-Lato';
  font-style: normal;
  font-weight: normal;
  src: local('Lato'), local('Lato-Regular'), url('/fonts/Lato-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'HT-Lato';
  font-style: normal;
  font-weight: bold;
  src: local('Lato Black'), local('Lato-Black'), url('/fonts/Lato-Black.ttf') format('truetype');
}

@font-face {
  font-family: 'HT-PT-Mono';
  font-style: normal;
  font-weight: normal;
  src: local('PT Mono'), local('PT-Mono'), url('/fonts/PTM55FT.ttf') format('truetype');
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
  background: #002750 radial-gradient(circle 800px, #1a5b9f, #002750) no-repeat center center;
  font-family: ${FONT_NORMAL};
  color: ${SILVER};
  line-height: 1.5;
}
`
