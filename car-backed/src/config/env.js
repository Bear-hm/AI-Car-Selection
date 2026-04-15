const path = require('path')
const dotenv = require('dotenv')

dotenv.config({
  path: path.resolve(__dirname, '../../.env')
})

module.exports = {
  port: Number(process.env.PORT || 3000),
  useLlm: String(process.env.USE_LLM || 'false').toLowerCase() === 'true',
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  openAiBaseUrl: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
  openAiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini'
}
