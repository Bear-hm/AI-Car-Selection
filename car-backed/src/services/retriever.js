const { loadBuyingGuide, loadCarKnowledge } = require('./dataService')

function buildGuideSnippets(user) {
  const guide = loadBuyingGuide()
  const snippets = []

  if (guide.budget[user.budgetRange]) {
    snippets.push(...guide.budget[user.budgetRange])
  }

  if (guide.usage[user.usage]) {
    snippets.push(...guide.usage[user.usage])
  }

  if (guide.priority[user.priority]) {
    snippets.push(...guide.priority[user.priority])
  }

  if (user.chargeRequired) {
    snippets.push(...guide.charge.withCharge)
  } else {
    snippets.push(...guide.charge.withoutCharge)
  }

  if (guide.people[user.people]) {
    snippets.push(...guide.people[user.people])
  }

  return snippets.slice(0, 6)
}

function retrieveContext({ user, candidates }) {
  const knowledge = loadCarKnowledge()
  const knowledgeMap = new Map(knowledge.map(item => [item.id, item]))

  const carSnippets = candidates.slice(0, 5).map(car => {
    const knowledgeItem = knowledgeMap.get(car.id) || {}

    return {
      id: car.id,
      brand: car.brand,
      name: car.name,
      overview: knowledgeItem.overview || '',
      fitUsers: knowledgeItem.fitUsers || [],
      notFitUsers: knowledgeItem.notFitUsers || [],
      highlights: knowledgeItem.highlights || [],
      cautions: knowledgeItem.cautions || [],
      scenarioNotes: knowledgeItem.scenarioNotes || {}
    }
  })

  return {
    guideSnippets: buildGuideSnippets(user),
    carSnippets
  }
}

module.exports = {
  retrieveContext
}
