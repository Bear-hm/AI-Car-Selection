const BUDGET_RANGE_MAP = {
  under_10: { min: 0, max: 10 },
  '10_15': { min: 10, max: 15 },
  '15_20': { min: 15, max: 20 },
  over_20: { min: 20, max: 999 }
}

const USAGE_LABEL_MAP = {
  commute: '通勤',
  family: '家用',
  travel: '长途',
  mixed: '混合'
}

const TYPE_LABEL_MAP = {
  sedan: '轿车',
  suv: 'SUV',
  mpv: 'MPV',
  any: '无所谓'
}

const ENERGY_LABEL_MAP = {
  fuel: '燃油',
  hybrid: '混动',
  electric: '纯电',
  any: '无所谓'
}

const RECOMMEND_LEVEL_MAP = {
  priority: { text: '优先推荐', order: 5 },
  match: { text: '匹配推荐', order: 4 },
  value_pick: { text: '务实推荐', order: 3 },
  weak_pick: { text: '弱推荐', order: 2 },
  candidate: { text: '可参考', order: 1 }
}

const BUDGET_RELATION_ORDER = {
  within: 3,
  below: 2,
  above: 1
}

function getBudgetRange(budgetKey) {
  return BUDGET_RANGE_MAP[budgetKey] || BUDGET_RANGE_MAP.under_10
}

function getBudgetRelation(user, car) {
  const budgetRange = getBudgetRange(user.budgetRange)

  if (car.priceMin <= budgetRange.max && car.priceMax >= budgetRange.min) {
    return { type: 'within', gap: 0 }
  }

  if (car.priceMin > budgetRange.max) {
    return {
      type: 'above',
      gap: Number((car.priceMin - budgetRange.max).toFixed(2))
    }
  }

  return {
    type: 'below',
    gap: Number((budgetRange.min - car.priceMax).toFixed(2))
  }
}

function getUsageLabel(usage) {
  return USAGE_LABEL_MAP[usage] || usage || ''
}

function getTypeLabel(type) {
  return TYPE_LABEL_MAP[type] || type || ''
}

function getEnergyLabel(energy) {
  return ENERGY_LABEL_MAP[energy] || energy || ''
}

function addUnique(target, text) {
  if (text && !target.includes(text)) {
    target.push(text)
  }
}

function scoreBudget(user, car, reasons, cautions) {
  const budgetRelation = getBudgetRelation(user, car)

  if (budgetRelation.type === 'within') {
    addUnique(reasons, '预算内')
    return { score: 30, budgetRelation }
  }

  if (budgetRelation.type === 'above') {
    if (budgetRelation.gap <= 1.5) {
      addUnique(reasons, '价格接近预算上限')
      addUnique(cautions, '略超预算')
      return { score: 18, budgetRelation }
    }

    if (budgetRelation.gap <= 3) {
      addUnique(reasons, '预算略超，可作升级备选')
      addUnique(cautions, '超出预算不多')
      return { score: 10, budgetRelation }
    }

    if (budgetRelation.gap <= 6) {
      addUnique(cautions, '预算压力偏大')
      return { score: 2, budgetRelation }
    }

    addUnique(cautions, '超出预算较多')
    return { score: -10, budgetRelation }
  }

  if (budgetRelation.gap <= 2) {
    addUnique(reasons, '预算友好')
    return { score: 18, budgetRelation }
  }

  if (budgetRelation.gap <= 5) {
    addUnique(reasons, '价格更稳妥')
    return { score: 10, budgetRelation }
  }

  addUnique(reasons, '预算压力更小')
  return { score: 4, budgetRelation }
}

function scoreUsage(user, car, reasons) {
  if (user.usage === 'mixed') {
    if (car.usageTags.length >= 3) {
      addUnique(reasons, '多场景适配')
      return 18
    }

    if (car.usageTags.length >= 2) {
      addUnique(reasons, '场景覆盖较全面')
      return 12
    }

    return 0
  }

  if (!car.usageTags.includes(user.usage)) {
    return 0
  }

  let score = 20
  addUnique(reasons, `${getUsageLabel(user.usage)}场景匹配`)

  if (user.usage === 'commute' && car.advantageTags.includes('fuel_economy')) {
    score += 4
    addUnique(reasons, '通勤成本友好')
  }

  if (user.usage === 'family' && car.spaceLevel >= 4) {
    score += 4
    addUnique(reasons, '家用舒适度更好')
  }

  if (user.usage === 'travel' && car.spaceLevel >= 4) {
    score += 4
    addUnique(reasons, '长途舒适性更好')
  }

  return score
}

function scorePeople(user, car, reasons) {
  if (user.people === '5_plus') {
    if (car.seats >= 7) {
      addUnique(reasons, '多人乘坐更从容')
      return 18
    }

    if (car.seats >= 5) {
      addUnique(reasons, '适合5人以上乘坐')
      return 15
    }

    return -8
  }

  if (user.people === '3_4') {
    if (car.seats >= 5 && car.spaceLevel >= 4) {
      addUnique(reasons, '家用乘坐更宽松')
      return 12
    }

    if (car.seats >= 5) {
      addUnique(reasons, '3-4人乘坐基本合适')
      return 8
    }

    if (car.seats >= 4) {
      return 5
    }

    return 0
  }

  if (car.type === 'sedan') {
    addUnique(reasons, '日常使用更灵活')
    return 6
  }

  if (car.type === 'suv') {
    return 4
  }

  return 1
}

function scoreCharge(user, car, reasons, cautions) {
  if (!user.chargeRequired) {
    if (car.energy === 'electric') {
      addUnique(cautions, '无充电条件，纯电便利性一般')
      return -20
    }

    if (car.chargeRequired) {
      addUnique(cautions, '更依赖充电条件')
      return -8
    }

    addUnique(reasons, '补能更省心')
    return 4
  }

  if (car.chargeRequired) {
    addUnique(reasons, '有充电条件更适配')
    return 5
  }

  return 0
}

function scorePriority(user, car, reasons) {
  let score = 0

  if (user.priority === 'space') {
    if (car.spaceLevel >= 5) {
      score += 12
      addUnique(reasons, '空间表现很强')
    } else if (car.spaceLevel >= 4) {
      score += 10
      addUnique(reasons, '空间表现较好')
    } else if (car.spaceLevel === 3) {
      score += 4
    }

    if (car.advantageTags.includes('space')) {
      score += 4
      addUnique(reasons, '空间取向明显')
    }
  }

  if (user.priority === 'smart') {
    if (car.smartLevel >= 5) {
      score += 12
      addUnique(reasons, '智能配置很强')
    } else if (car.smartLevel >= 4) {
      score += 10
      addUnique(reasons, '智能配置较强')
    } else if (car.smartLevel === 3) {
      score += 4
    }

    if (car.advantageTags.includes('smart')) {
      score += 4
      addUnique(reasons, '智能体验更完整')
    }
  }

  if (user.priority === 'value') {
    if (car.costLevel <= 2) {
      score += 12
      addUnique(reasons, '用车成本更友好')
    } else if (car.costLevel === 3) {
      score += 6
      addUnique(reasons, '成本表现比较均衡')
    } else if (car.costLevel >= 5) {
      score -= 4
    }

    if (car.advantageTags.includes('value')) {
      score += 4
      addUnique(reasons, '性价比较突出')
    }
  }

  if (user.priority === 'fuel_economy') {
    if (car.advantageTags.includes('fuel_economy')) {
      score += 10
      addUnique(reasons, '能耗表现更好')
    }

    if (car.energy === 'hybrid') {
      score += 5
      addUnique(reasons, '混动更适合省油诉求')
    } else if (car.energy === 'electric') {
      score += 3
    }
  }

  return score
}

function scoreTypePreference(user, car, reasons) {
  if (user.carType === 'any') {
    return 0
  }

  if (car.type === user.carType) {
    addUnique(reasons, `符合${getTypeLabel(user.carType)}偏好`)
    return 8
  }

  if (user.carType === 'suv' && car.type === 'mpv') {
    addUnique(reasons, '虽不是SUV，但实用取向接近')
    return 4
  }

  return 0
}

function scoreEnergyPreference(user, car, reasons) {
  if (user.energy === 'any') {
    return 0
  }

  if (car.energy === user.energy) {
    addUnique(reasons, `符合${getEnergyLabel(user.energy)}偏好`)
    return 8
  }

  if (user.energy === 'hybrid' && car.energy === 'electric') {
    addUnique(reasons, '同属新能源方向')
    return 4
  }

  if (user.energy === 'electric' && car.energy === 'hybrid') {
    addUnique(reasons, '新能源取向接近')
    return 3
  }

  return 0
}

function scoreWeakness(user, car, cautions) {
  let score = 0
  const careAboutSpace =
    user.priority === 'space' || user.people !== '1_2' || user.usage === 'family' || user.usage === 'travel'

  if (careAboutSpace && car.weaknessTags.includes('space_small')) {
    score -= 6
    addUnique(cautions, '空间不是主要优势')
  }

  if ((user.priority === 'value' || user.priority === 'fuel_economy') && car.weaknessTags.includes('cost')) {
    score -= 6
    addUnique(cautions, '后期成本相对更高')
  }

  if (user.usage === 'travel' && car.weaknessTags.includes('power')) {
    score -= 3
    addUnique(cautions, '长途动力表现一般')
  }

  return score
}

function getRecommendLevel(score, budgetRelation) {
  if (budgetRelation.type === 'within') {
    if (score >= 72) {
      return 'priority'
    }

    if (score >= 52) {
      return 'match'
    }

    return 'candidate'
  }

  if (budgetRelation.type === 'below') {
    if (score >= 60) {
      return 'value_pick'
    }

    if (score >= 48) {
      return 'match'
    }

    return 'candidate'
  }

  if (budgetRelation.gap <= 1.5 && score >= 55) {
    return 'weak_pick'
  }

  if (budgetRelation.gap <= 3 && score >= 65) {
    return 'weak_pick'
  }

  return 'candidate'
}

function getMatchText(level) {
  return (RECOMMEND_LEVEL_MAP[level] || RECOMMEND_LEVEL_MAP.candidate).text
}

function getRecommendOrder(level) {
  return (RECOMMEND_LEVEL_MAP[level] || RECOMMEND_LEVEL_MAP.candidate).order
}

function scoreCars(user, cars) {
  if (!user || !Array.isArray(cars)) {
    return []
  }

  return cars
    .map(car => {
      const reasons = []
      const cautions = []

      const budgetResult = scoreBudget(user, car, reasons, cautions)
      let score = budgetResult.score

      score += scoreUsage(user, car, reasons)
      score += scorePeople(user, car, reasons)
      score += scoreCharge(user, car, reasons, cautions)
      score += scorePriority(user, car, reasons)
      score += scoreTypePreference(user, car, reasons)
      score += scoreEnergyPreference(user, car, reasons)
      score += scoreWeakness(user, car, cautions)

      const recommendLevel = getRecommendLevel(score, budgetResult.budgetRelation)

      if (!reasons.length) {
        addUnique(reasons, '基础条件接近')
      }

      return {
        ...car,
        score,
        reasons: reasons.slice(0, 4),
        cautions,
        budgetRelation: budgetResult.budgetRelation,
        recommendLevel,
        recommendOrder: getRecommendOrder(recommendLevel),
        matchText: getMatchText(recommendLevel)
      }
    })
    .sort((a, b) => {
      if (b.recommendOrder !== a.recommendOrder) {
        return b.recommendOrder - a.recommendOrder
      }

      if (b.score !== a.score) {
        return b.score - a.score
      }

      if (BUDGET_RELATION_ORDER[b.budgetRelation.type] !== BUDGET_RELATION_ORDER[a.budgetRelation.type]) {
        return BUDGET_RELATION_ORDER[b.budgetRelation.type] - BUDGET_RELATION_ORDER[a.budgetRelation.type]
      }

      if (a.budgetRelation.gap !== b.budgetRelation.gap) {
        return a.budgetRelation.gap - b.budgetRelation.gap
      }

      return a.priceMin - b.priceMin
    })
}

module.exports = {
  scoreCars,
  getUsageLabel,
  getTypeLabel,
  getEnergyLabel
}
