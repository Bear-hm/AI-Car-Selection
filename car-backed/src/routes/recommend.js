const express = require('express')
const { getHealth, postRecommend } = require('../controllers/recommendController')

const router = express.Router()

router.get('/health', getHealth)
router.post('/recommend', postRecommend)

module.exports = router
