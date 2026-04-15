const { buildRecommendation } = require('../services/recommendService')

async function postRecommend(req, res, next) {
  try {
    const user = req.body?.user || req.body
    const topK = req.body?.topK || 3
    const data = await buildRecommendation({ user, topK })

    res.json({
      success: true,
      data
    })
  } catch (error) {
    next(error)
  }
}

function getHealth(req, res) {
  res.json({
    success: true,
    message: 'car-backed is running'
  })
}

module.exports = {
  postRecommend,
  getHealth
}
