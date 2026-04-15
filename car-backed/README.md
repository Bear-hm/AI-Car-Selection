# car-backed

Node/Express backend skeleton for the car recommendation project.

## Features

- `POST /api/recommend` recommendation endpoint
- rule-based scorer for candidate recall
- local lightweight RAG retriever
- AI-ready prompt builder and LLM fallback service
- local JSON knowledge base

## Quick Start

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env` and fill the values if you want to enable the LLM call.

```env
PORT=3000
USE_LLM=false
OPENAI_API_KEY=
OPENAI_BASE_URL=
OPENAI_MODEL=
```

## API

### Health

```http
GET /api/health
```

### Recommend

```http
POST /api/recommend
Content-Type: application/json
```

```json
{
  "user": {
    "budgetRange": "10_15",
    "budgetLabel": "10-15万",
    "usage": "family",
    "usageLabel": "家用",
    "people": "3_4",
    "peopleLabel": "3-4人",
    "chargeRequired": true,
    "priority": "space",
    "priorityLabel": "空间",
    "carType": "suv",
    "carTypeLabel": "SUV",
    "energy": "hybrid",
    "energyLabel": "混动"
  },
  "topK": 3
}
```
