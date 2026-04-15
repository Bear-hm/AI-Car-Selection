const fs = require('fs')
const path = require('path')

const cache = new Map()

function loadJson(relativePath) {
  const filePath = path.resolve(__dirname, '..', relativePath)

  if (!cache.has(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf8')
    cache.set(filePath, JSON.parse(raw))
  }

  return cache.get(filePath)
}

function clearJsonCache() {
  cache.clear()
}

module.exports = {
  loadJson,
  clearJsonCache
}
