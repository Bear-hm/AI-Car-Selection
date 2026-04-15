function buildUserProfileText(user) {
  return [
    `预算: ${user.budgetLabel || user.budgetRange}`,
    `用途: ${user.usageLabel || user.usage}`,
    `人数: ${user.peopleLabel || user.people}`,
    `充电条件: ${user.chargeRequired ? '有' : '无'}`,
    `更看重: ${user.priorityLabel || user.priority}`,
    `偏好车型: ${user.carTypeLabel || user.carType}`,
    `偏好能源: ${user.energyLabel || user.energy}`
  ].join('\n')
}

function buildCarText(cars) {
  return cars
    .map((car, index) => {
      const lines = [
        `候选${index + 1}: ${car.brand} ${car.name}`,
        `价格: ${car.priceMin}-${car.priceMax}万`,
        `推荐等级: ${car.matchText}`,
        `推荐分: ${car.score}`,
        `加分原因: ${car.reasons.join(' / ') || '无'}`,
        `注意事项: ${car.cautions.join(' / ') || '无'}`
      ]

      return lines.join('\n')
    })
    .join('\n\n')
}

function buildKnowledgeText(retrieval) {
  const guideText = retrieval.guideSnippets.map((item, index) => `${index + 1}. ${item}`).join('\n')

  const carText = retrieval.carSnippets
    .map(item => {
      return [
        `${item.brand} ${item.name}`,
        `概述: ${item.overview || '无'}`,
        `适合人群: ${(item.fitUsers || []).join(' / ') || '无'}`,
        `不太适合: ${(item.notFitUsers || []).join(' / ') || '无'}`,
        `亮点: ${(item.highlights || []).join(' / ') || '无'}`,
        `提醒: ${(item.cautions || []).join(' / ') || '无'}`
      ].join('\n')
    })
    .join('\n\n')

  return `购车知识:\n${guideText}\n\n车型知识:\n${carText}`
}

function buildRecommendationPrompt({ user, topCars, retrieval }) {
  const system = [
    '你是一名中文汽车选购顾问。',
    '请基于给定的候选车型和知识片段输出结构化推荐。',
    '不要编造不存在的车型参数。',
    '回答应简洁、专业、适合直接返回给前端页面展示。'
  ].join(' ')

  const userPrompt = [
    '用户画像:',
    buildUserProfileText(user),
    '',
    '候选车型:',
    buildCarText(topCars),
    '',
    buildKnowledgeText(retrieval),
    '',
    '请输出 JSON，对象字段必须包含:',
    'summary, highlights, cautions, compare, carInsights',
    '',
    'carInsights 为数组，数组第 N 项对应候选第 N 辆车的个性化解读。',
    '每条解读应包含 2-3 句话，从用户画像出发说明为何推荐这台车，结合知识片段提及 1-2 个具体优点，并指出 1 个需要注意的点。'
  ].join('\n')

  return {
    system,
    userPrompt
  }
}

module.exports = {
  buildRecommendationPrompt
}
