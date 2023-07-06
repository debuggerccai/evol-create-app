const config = require('../src/config')

// 基本script
const baseScripts = {
  icon: {
    url: config.iconJs,
  }
}
// 基本link
const baseLink = {
  icon: {
    url: config.iconCss
  },
}

function getScriptsTemplate(scripts = baseScripts) {
  const keys = Object.keys(scripts)
  return keys.map(key => `<script src="${scripts[key].url}" ${scripts[key].ext ? scripts[key].ext : ''}></script>`).join('')
}

function getCssTemplate(links = baseLink) {
  const keys = Object.keys(links)
  return keys.map(key => ` <link  type="text/css"  href="${links[key].url}" rel="stylesheet">`).join('')
}

module.exports = {
  baseScripts,
  baseLink,
  getScriptsTemplate,
  getCssTemplate
}
