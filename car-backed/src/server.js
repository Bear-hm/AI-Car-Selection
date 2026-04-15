const app = require('./app')
const env = require('./config/env')
const { buildRecommendation } = require('./services/recommendService')

async function runCheck() {
  const sampleUser = {
    budgetRange: '10_15',
    budgetLabel: '10-15万',
    usage: 'family',
    usageLabel: '家用',
    people: '3_4',
    peopleLabel: '3-4人',
    chargeRequired: true,
    priority: 'space',
    priorityLabel: '空间',
    carType: 'suv',
    carTypeLabel: 'SUV',
    energy: 'hybrid',
    energyLabel: '混动'
  }

  const result = await buildRecommendation({
    user: sampleUser,
    topK: 3
  })

  console.log(`[check] backend ready, top1: ${result.topCars[0]?.brand || 'N/A'} ${result.topCars[0]?.name || ''}`)
}

async function bootstrap() {
  if (process.argv.includes('--check')) {
    await runCheck()
    process.exit(0)
  }

  app.listen(env.port, () => {
    console.log(`car-backed listening on http://localhost:${env.port}`)
  })
}

bootstrap().catch(error => {
  console.error(error)
  process.exit(1)
})
