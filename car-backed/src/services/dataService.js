const { loadJson } = require('../utils/jsonLoader')

function loadCars() {
  return loadJson('data/cars.json')
}

function loadCarKnowledge() {
  return loadJson('data/car_knowledge.json')
}

function loadBuyingGuide() {
  return loadJson('data/buying_guide.json')
}

module.exports = {
  loadCars,
  loadCarKnowledge,
  loadBuyingGuide
}
