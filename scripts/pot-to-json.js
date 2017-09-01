const fs = require('fs')
const path = require('path')
const gettextParser = require('gettext-parser')

const PROJECT_LANGUAGES = ['es', 'it']

PROJECT_LANGUAGES.forEach(lang => {
  const poPath = path.resolve(`./l10n/translations/${lang}.po`)
  const poJson = gettextParser.po.parse(fs.readFileSync(poPath))
  fs.writeFileSync(
    path.resolve(`./src/l10n/${lang}.json`),
    JSON.stringify(poJson, null, 2)
  )
})

const potJson = gettextParser.po.parse(
  fs.readFileSync(path.resolve('./l10n/source.pot'))
)
fs.writeFileSync(
  path.resolve('./src/l10n/en.json'),
  JSON.stringify(potJson, null, 2)
)
