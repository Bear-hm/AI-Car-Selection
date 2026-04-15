const { loadCars } = require('./dataService')
const { retrieveContext } = require('./retriever')
const { generateRecommendation } = require('./llmService')
const { scoreCars } = require('./scorer')

const REQUIRED_FIELDS = ['budgetRange', 'usage', 'people', 'chargeRequired', 'priority', 'carType', 'energy']

function validateUser(user) {
  const missingFields = REQUIRED_FIELDS.filter(field => typeof user[field] === 'undefined')

  if (missingFields.length) {
    const error = new Error(`Missing required user fields: ${missingFields.join(', ')}`)
    error.statusCode = 400
    throw error
  }
}

function normalizeUser(user) {
  return {
    budgetRange: user.budgetRange,
    budgetLabel: user.budgetLabel || user.budgetRange,
    usage: user.usage,
    usageLabel: user.usageLabel || user.usage,
    people: user.people,
    peopleLabel: user.peopleLabel || user.people,
    chargeRequired: Boolean(user.chargeRequired),
    priority: user.priority,
    priorityLabel: user.priorityLabel || user.priority,
    carType: user.carType,
    carTypeLabel: user.carTypeLabel || user.carType,
    energy: user.energy,
    energyLabel: user.energyLabel || user.energy
  }
}

function shapeCar(card) {
  return {
    id: card.id,
    brand: card.brand,
    name: card.name,
    priceMin: card.priceMin,
    priceMax: card.priceMax,
    type: card.type,
    energy: card.energy,
    seats: card.seats,
    score: card.score,
    matchText: card.matchText,
    recommendLevel: card.recommendLevel,
    reasons: card.reasons,
    cautions: card.cautions
  }
}

async function buildRecommendation({ user, topK = 3 }) {
  validateUser(user)

  const normalizedUser = normalizeUser(user)
  const cars = loadCars()
  const rankedCars = scoreCars(normalizedUser, cars)
  const candidates = rankedCars.slice(0, 5)
  const topCars = rankedCars.slice(0, Math.max(1, Math.min(Number(topK) || 3, 5)))
  const retrieval = retrieveContext({
    user: normalizedUser,
    candidates
  })

  const ai = await generateRecommendation({
    user: normalizedUser,
    topCars,
    retrieval
  })

  return {
    user: normalizedUser,
    topCars: topCars.map(shapeCar),
    candidates: candidates.map(shapeCar),
    retrieval,
    ai,
    generatedAt: new Date().toISOString()
  }
}

module.exports = {
  buildRecommendation
}
