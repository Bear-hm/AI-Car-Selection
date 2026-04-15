const env = require('../config/env')
const { buildRecommendationPrompt } = require('./promptBuilder')

function buildFallbackRecommendation({ topCars }) {
  const topCar = topCars[0]
  const secondCar = topCars[1]

  if (!topCar) {
    return {
      mode: 'fallback',
      summary: '暂时没有匹配到合适的车型，建议放宽预算或车型偏好后再试一次。',
      highlights: [],
      cautions: [],
      compare: '',
      nextQuestions: ['你是否愿意放宽预算范围？']
    }
  }

  return {
    mode: 'fallback',
    summary: `当前优先推荐 ${topCar.brand} ${topCar.name}，它在你的核心条件上匹配度最高，尤其体现在 ${topCar.reasons.slice(0, 2).join('、')}。`,
    highlights: topCar.reasons.slice(0, 3),
    cautions: topCar.cautions.slice(0, 3),
    compare: secondCar
      ? `${topCar.name} 更偏向主推荐，${secondCar.name} 可以作为风格或预算取向不同的备选。`
      : `${topCar.name} 是当前最稳妥的一台候选车。`,
    nextQuestions: [
      '你是否更想看空间、智能或后期成本的详细对比？',
      '你是否接受略微超预算的升级备选？'
    ]
  }
}

async function callOpenAiCompatibleApi({ messages }) {
  const response = await fetch(`${env.openAiBaseUrl.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.openAiApiKey}`
    },
    body: JSON.stringify({
      model: env.openAiModel,
      temperature: 0.4,
      response_format: { type: 'json_object' },
      messages
    })
  })

  if (!response.ok) {
    throw new Error(`LLM request failed with status ${response.status}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content

  if (!content) {
    throw new Error('LLM response content is empty')
  }

  return JSON.parse(content)
}

async function generateRecommendation(payload) {
  if (!env.useLlm || !env.openAiApiKey) {
    return buildFallbackRecommendation(payload)
  }

  const prompt = buildRecommendationPrompt(payload)

  try {
    const result = await callOpenAiCompatibleApi({
      messages: [
        { role: 'system', content: prompt.system },
        { role: 'user', content: prompt.userPrompt }
      ]
    })

    return {
      mode: 'llm',
      summary: result.summary || '',
      highlights: result.highlights || [],
      cautions: result.cautions || [],
      compare: result.compare || '',
      nextQuestions: result.nextQuestions || []
    }
  } catch (error) {
    return {
      ...buildFallbackRecommendation(payload),
      mode: 'fallback_after_llm_error',
      error: error.message
    }
  }
}

module.exports = {
  generateRecommendation
}
