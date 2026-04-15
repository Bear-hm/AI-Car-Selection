<template>
  <view class="page">
    <view class="top-progress-shell">
      <view class="top-progress-bar">
        <view class="top-progress-head">
          <text class="top-progress-label">{{ textMap.progressLabel }}</text>
          <text class="top-progress-value">{{ completedCount }}/{{ questionCount }}</text>
        </view>
        <view class="top-progress-track">
          <view class="top-progress-fill" :style="{ width: progressPercent + '%' }"></view>
        </view>
      </view>
    </view>

    <scroll-view scroll-y class="form-area">

      <view class="hero-panel">
        <view class="hero-top">
          <text class="hero-badge">{{ textMap.heroBadge }}</text>
          <text class="hero-note">{{ textMap.heroNote }}</text>
        </view>
        <text class="hero-title">{{ textMap.title }}</text>
        <text class="hero-description">{{ textMap.description }}</text>
      </view>

      <view class="question-list">
        <view class="question-card question-card--intro" style="animation-delay: 0.02s;">
          <text class="card-tip">{{ textMap.cardTip }}</text>
        </view>

        <view class="question-card" style="animation-delay: 0.06s;">
          <view class="question-head">
            <text class="question-index">{{ textMap.question1 }}</text>
            <text class="question-current">{{ budgetOptions[formData.budgetIndex].label }}</text>
          </view>
          <text class="question-title">{{ textMap.budgetLabel }}</text>
          <text class="question-desc">{{ textMap.budgetHint }}</text>

          <view class="choice-list">
            <view
              v-for="(item, index) in budgetOptions"
              :key="item.value"
              class="choice-card"
              :class="{ 'choice-card--active': formData.budgetIndex === index }"
              @click="handleBudgetChange({ detail: { value: index } })"
            >
              <view class="choice-content">
                <text class="choice-title">{{ item.label }}</text>
              </view>
              <view class="choice-dot" :class="{ 'choice-dot--active': formData.budgetIndex === index }">
                <view class="choice-dot-inner"></view>
              </view>
            </view>
          </view>
        </view>

        <view class="question-card" style="animation-delay: 0.10s;">
          <view class="question-head">
            <text class="question-index">{{ textMap.question2 }}</text>
            <text class="question-current">{{ getLabel(usageOptions, formData.usage) }}</text>
          </view>
          <text class="question-title">{{ textMap.usageLabel }}</text>
          <text class="question-desc">{{ textMap.usageHint }}</text>

          <view class="choice-list">
            <view
              v-for="item in usageOptions"
              :key="item.value"
              class="choice-card"
              :class="{ 'choice-card--active': formData.usage === item.value }"
              @click="handleUsageChange({ detail: { value: item.value } })"
            >
              <view class="choice-content">
                <text class="choice-title">{{ item.label }}</text>
              </view>
              <view class="choice-dot" :class="{ 'choice-dot--active': formData.usage === item.value }">
                <view class="choice-dot-inner"></view>
              </view>
            </view>
          </view>
        </view>

        <view class="question-card" style="animation-delay: 0.14s;">
          <view class="question-head">
            <text class="question-index">{{ textMap.question3 }}</text>
            <text class="question-current">{{ getLabel(peopleOptions, formData.people) }}</text>
          </view>
          <text class="question-title">{{ textMap.peopleLabel }}</text>
          <text class="question-desc">{{ textMap.peopleHint }}</text>

          <view class="choice-list">
            <view
              v-for="item in peopleOptions"
              :key="item.value"
              class="choice-card"
              :class="{ 'choice-card--active': formData.people === item.value }"
              @click="handlePeopleChange({ detail: { value: item.value } })"
            >
              <view class="choice-content">
                <text class="choice-title">{{ item.label }}</text>
              </view>
              <view class="choice-dot" :class="{ 'choice-dot--active': formData.people === item.value }">
                <view class="choice-dot-inner"></view>
              </view>
            </view>
          </view>
        </view>

        <view class="question-card" style="animation-delay: 0.18s;">
          <view class="question-head">
            <text class="question-index">{{ textMap.question4 }}</text>
            <text class="question-current">{{ chargeLabel }}</text>
          </view>
          <text class="question-title">{{ textMap.chargeLabel }}</text>
          <text class="question-desc">{{ textMap.chargeHint }}</text>

          <view class="choice-list">
            <view
              v-for="item in chargeOptions"
              :key="item.label"
              class="choice-card"
              :class="{ 'choice-card--active': formData.chargeRequired === item.value }"
              @click="handleChargeChange({ detail: { value: item.value } })"
            >
              <view class="choice-content">
                <text class="choice-title">{{ item.label }}</text>
              </view>
              <view class="choice-dot" :class="{ 'choice-dot--active': formData.chargeRequired === item.value }">
                <view class="choice-dot-inner"></view>
              </view>
            </view>
          </view>
        </view>

        <view class="question-card" style="animation-delay: 0.22s;">
          <view class="question-head">
            <text class="question-index">{{ textMap.question5 }}</text>
            <text class="question-current">{{ getLabel(priorityOptions, formData.priority) }}</text>
          </view>
          <text class="question-title">{{ textMap.priorityLabel }}</text>
          <text class="question-desc">{{ textMap.priorityHint }}</text>

          <view class="choice-list">
            <view
              v-for="item in priorityOptions"
              :key="item.value"
              class="choice-card"
              :class="{ 'choice-card--active': formData.priority === item.value }"
              @click="handlePriorityChange({ detail: { value: item.value } })"
            >
              <view class="choice-content">
                <text class="choice-title">{{ item.label }}</text>
              </view>
              <view class="choice-dot" :class="{ 'choice-dot--active': formData.priority === item.value }">
                <view class="choice-dot-inner"></view>
              </view>
            </view>
          </view>
        </view>

        <view class="question-card" style="animation-delay: 0.26s;">
          <view class="question-head">
            <text class="question-index">{{ textMap.question6 }}</text>
            <text class="question-current">{{ getLabel(carTypeOptions, formData.carType) }}</text>
          </view>
          <text class="question-title">{{ textMap.carTypeLabel }}</text>
          <text class="question-desc">{{ textMap.carTypeHint }}</text>

          <view class="choice-list">
            <view
              v-for="item in carTypeOptions"
              :key="item.value"
              class="choice-card"
              :class="{ 'choice-card--active': formData.carType === item.value }"
              @click="handleCarTypeChange({ detail: { value: item.value } })"
            >
              <view class="choice-content">
                <text class="choice-title">{{ item.label }}</text>
              </view>
              <view class="choice-dot" :class="{ 'choice-dot--active': formData.carType === item.value }">
                <view class="choice-dot-inner"></view>
              </view>
            </view>
          </view>
        </view>

        <view class="question-card" style="animation-delay: 0.30s;">
          <view class="question-head">
            <text class="question-index">{{ textMap.question7 }}</text>
            <text class="question-current">{{ getLabel(energyOptions, formData.energy) }}</text>
          </view>
          <text class="question-title">{{ textMap.energyLabel }}</text>
          <text class="question-desc">{{ textMap.energyHint }}</text>

          <view class="choice-list">
            <view
              v-for="item in energyOptions"
              :key="item.value"
              class="choice-card"
              :class="{ 'choice-card--active': formData.energy === item.value }"
              @click="handleEnergyChange({ detail: { value: item.value } })"
            >
              <view class="choice-content">
                <text class="choice-title">{{ item.label }}</text>
              </view>
              <view class="choice-dot" :class="{ 'choice-dot--active': formData.energy === item.value }">
                <view class="choice-dot-inner"></view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="footer">
      <button class="submit-button" @click="submitForm">{{ textMap.submitButton }}</button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CarFormPage',
  data() {
    return {
      textMap: {
        heroBadge: '\u667a\u80fd\u9009\u8f66',
        heroNote: '\u9898\u5361\u5f0f\u95ee\u5377',
        title: '\u9009\u8f66\u9700\u6c42\u8868\u5355',
        description: '\u50cf\u586b\u5199\u4e00\u4efd\u8f7b\u95ee\u5377\u4e00\u6837\uff0c\u9010\u9898\u9009\u62e9\u4f60\u7684\u9700\u6c42\uff0c\u7cfb\u7edf\u4f1a\u636e\u6b64\u7ed9\u51fa\u66f4\u5408\u9002\u7684\u8f66\u578b\u63a8\u8350\u3002',
        progressLabel: '\u5df2\u786e\u8ba4',
        cardTip: '\u70b9\u51fb\u6bcf\u4e2a\u9009\u9879\u5361\u7247\u5373\u53ef\u5b8c\u6210\u9009\u62e9',
        budgetLabel: '\u9884\u7b97\u8303\u56f4',
        usageLabel: '\u7528\u9014',
        peopleLabel: '\u4eba\u6570',
        chargeLabel: '\u662f\u5426\u6709\u5145\u7535\u6761\u4ef6',
        priorityLabel: '\u66f4\u770b\u91cd',
        carTypeLabel: '\u504f\u597d\u8f66\u578b',
        energyLabel: '\u504f\u597d\u80fd\u6e90',
        budgetHint: '\u5148\u9009\u5b9a\u4e00\u4e2a\u5927\u81f4\u8d2d\u8f66\u9884\u7b97\u533a\u95f4',
        usageHint: '\u8fd9\u53f0\u8f66\u6700\u5e38\u7528\u6765\u505a\u4ec0\u4e48',
        peopleHint: '\u4f60\u5e73\u65f6\u6700\u5e38\u89c1\u7684\u4e58\u5750\u4eba\u6570',
        chargeHint: '\u8fd9\u4f1a\u76f4\u63a5\u5f71\u54cd\u65b0\u80fd\u6e90\u8f66\u578b\u7684\u53ef\u7528\u6027',
        priorityHint: '\u8bf7\u9009\u4e00\u4e2a\u4f60\u73b0\u5728\u6700\u5728\u610f\u7684\u65b9\u5411',
        carTypeHint: '\u9009\u62e9\u4f60\u66f4\u60f3\u8981\u7684\u8f66\u8eab\u5f62\u6001',
        energyHint: '\u9009\u62e9\u4f60\u66f4\u504f\u597d\u7684\u52a8\u529b\u65b9\u5f0f',
        question1: '\u7b2c 1 \u9898',
        question2: '\u7b2c 2 \u9898',
        question3: '\u7b2c 3 \u9898',
        question4: '\u7b2c 4 \u9898',
        question5: '\u7b2c 5 \u9898',
        question6: '\u7b2c 6 \u9898',
        question7: '\u7b2c 7 \u9898',
        submitButton: '\u5f00\u59cb\u63a8\u8350',
        chargeYes: '\u6709',
        chargeNo: '\u6ca1\u6709'
      },
      budgetOptions: [
        { label: '10\u4e07\u4ee5\u4e0b', value: 'under_10' },
        { label: '10-15\u4e07', value: '10_15' },
        { label: '15-20\u4e07', value: '15_20' },
        { label: '20\u4e07\u4ee5\u4e0a', value: 'over_20' }
      ],
      usageOptions: [
        { label: '\u901a\u52e4', value: 'commute' },
        { label: '\u5bb6\u7528', value: 'family' },
        { label: '\u957f\u9014', value: 'travel' },
        { label: '\u6df7\u5408', value: 'mixed' }
      ],
      peopleOptions: [
        { label: '1-2\u4eba', value: '1_2' },
        { label: '3-4\u4eba', value: '3_4' },
        { label: '5\u4eba\u4ee5\u4e0a', value: '5_plus' }
      ],
      chargeOptions: [
        { label: '\u6709\uff0c\u53ef\u4ee5\u5145\u7535', value: true },
        { label: '\u6ca1\u6709\uff0c\u4e0d\u592a\u65b9\u4fbf\u5145\u7535', value: false }
      ],
      priorityOptions: [
        { label: '\u7701\u94b1', value: 'value' },
        { label: '\u7701\u6cb9', value: 'fuel_economy' },
        { label: '\u7a7a\u95f4', value: 'space' },
        { label: '\u667a\u80fd', value: 'smart' }
      ],
      carTypeOptions: [
        { label: '\u8f7f\u8f66', value: 'sedan' },
        { label: 'SUV', value: 'suv' },
        { label: '\u65e0\u6240\u8c13', value: 'any' }
      ],
      energyOptions: [
        { label: '\u71c3\u6cb9', value: 'fuel' },
        { label: '\u6df7\u52a8', value: 'hybrid' },
        { label: '\u7eaf\u7535', value: 'electric' },
        { label: '\u65e0\u6240\u8c13', value: 'any' }
      ],
      touchedMap: {
        budget: false,
        usage: false,
        people: false,
        charge: false,
        priority: false,
        carType: false,
        energy: false
      },
      formData: {
        budgetIndex: 0,
        usage: 'commute',
        people: '1_2',
        chargeRequired: false,
        priority: 'value',
        carType: 'sedan',
        energy: 'fuel'
      }
    }
  },
  computed: {
    budgetLabels() {
      return this.budgetOptions.map(item => item.label)
    },
    questionCount() {
      return 7
    },
    completedCount() {
      return Object.values(this.touchedMap).filter(Boolean).length
    },
    progressPercent() {
      return Math.round((this.completedCount / this.questionCount) * 100)
    },
    chargeLabel() {
      return this.formData.chargeRequired ? this.textMap.chargeYes : this.textMap.chargeNo
    }
  },
  methods: {
    markTouched(field) {
      this.touchedMap[field] = true
    },
    handleBudgetChange(event) {
      this.formData.budgetIndex = Number(event.detail.value)
      this.markTouched('budget')
    },
    handleUsageChange(event) {
      this.formData.usage = event.detail.value
      this.markTouched('usage')
    },
    handlePeopleChange(event) {
      this.formData.people = event.detail.value
      this.markTouched('people')
    },
    handleChargeChange(event) {
      this.formData.chargeRequired = event.detail.value
      this.markTouched('charge')
    },
    handlePriorityChange(event) {
      this.formData.priority = event.detail.value
      this.markTouched('priority')
    },
    handleCarTypeChange(event) {
      this.formData.carType = event.detail.value
      this.markTouched('carType')
    },
    handleEnergyChange(event) {
      this.formData.energy = event.detail.value
      this.markTouched('energy')
    },
    getLabel(options, value) {
      const matchedItem = options.find(item => item.value === value)
      return matchedItem ? matchedItem.label : ''
    },
    submitForm() {
      const selectedBudget = this.budgetOptions[this.formData.budgetIndex]

      const submitData = {
        budgetRange: selectedBudget.value,
        budgetLabel: selectedBudget.label,
        usage: this.formData.usage,
        usageLabel: this.getLabel(this.usageOptions, this.formData.usage),
        people: this.formData.people,
        peopleLabel: this.getLabel(this.peopleOptions, this.formData.people),
        chargeRequired: this.formData.chargeRequired,
        priority: this.formData.priority,
        priorityLabel: this.getLabel(this.priorityOptions, this.formData.priority),
        carType: this.formData.carType,
        carTypeLabel: this.getLabel(this.carTypeOptions, this.formData.carType),
        energy: this.formData.energy,
        energyLabel: this.getLabel(this.energyOptions, this.formData.energy)
      }

      uni.setStorageSync('carFormData', submitData)

      uni.navigateTo({
        url: '/pages/result/result'
      })
    }
  }
}
</script>

<style>
page {
  background:
    radial-gradient(circle at top left, rgba(96, 165, 250, 0.16), transparent 34%),
    linear-gradient(180deg, #f5f8fc 0%, #eef3f9 100%);
}

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.top-progress-shell {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  box-sizing: border-box;
  padding: 18rpx 24rpx 14rpx;
  padding-top: calc(var(--status-bar-height) + 18rpx);
  background: rgba(245, 248, 252, 0.84);
  backdrop-filter: blur(14rpx);
}

.top-progress-bar {
  padding: 18rpx 20rpx 20rpx;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 14rpx 32rpx rgba(15, 23, 42, 0.06);
}

.top-progress-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.top-progress-label {
  font-size: 24rpx;
  color: #64748b;
}

.top-progress-value {
  font-size: 26rpx;
  font-weight: 700;
  color: #2563eb;
}

.top-progress-track {
  height: 10rpx;
  margin-top: 14rpx;
  border-radius: 999rpx;
  background: rgba(148, 163, 184, 0.16);
  overflow: hidden;
}

.top-progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #60a5fa 0%, #2563eb 100%);
  transition: width 0.25s ease;
}

.form-area {
  flex: 1;
  box-sizing: border-box;
  padding: 0 24rpx 188rpx;
}

.hero-panel {
  margin-top: calc(var(--status-bar-height) + 18rpx + 52rpx);
  padding: 26rpx 6rpx 22rpx;
  animation: fade-up 0.45s ease both;
}

.hero-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-badge,
.hero-note,
.question-index,
.question-current,
.card-tip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999rpx;
  font-size: 22rpx;
  letter-spacing: 1rpx;
}

.hero-badge {
  padding: 10rpx 22rpx;
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
  font-weight: 700;
}

.hero-note {
  padding: 10rpx 18rpx;
  background: rgba(255, 255, 255, 0.72);
  color: #5b6472;
}

.hero-title {
  display: block;
  margin-top: 24rpx;
  color: #0f172a;
  font-size: 52rpx;
  font-weight: 700;
  letter-spacing: -1rpx;
}

.hero-description {
  display: block;
  margin-top: 16rpx;
  color: #5b6472;
  font-size: 28rpx;
  line-height: 1.75;
}

.question-list {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
}

.question-card {
  padding: 28rpx 24rpx 24rpx;
  border-radius: 32rpx;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 18rpx 42rpx rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(10rpx);
  animation: fade-up 0.45s ease both;
}

.question-card--intro {
  padding: 18rpx 24rpx;
}

.card-tip {
  padding: 10rpx 18rpx;
  background: rgba(37, 99, 235, 0.08);
  color: #2563eb;
}

.question-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
}

.question-index {
  padding: 10rpx 18rpx;
  background: #eef4ff;
  color: #2563eb;
  font-weight: 700;
}

.question-current {
  max-width: 54%;
  padding: 10rpx 18rpx;
  background: rgba(15, 23, 42, 0.05);
  color: #475569;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.question-title {
  display: block;
  margin-top: 22rpx;
  color: #0f172a;
  font-size: 38rpx;
  font-weight: 700;
}

.question-desc {
  display: block;
  margin-top: 12rpx;
  color: #64748b;
  font-size: 26rpx;
  line-height: 1.7;
}

.choice-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-top: 26rpx;
}

.choice-card {
  padding: 22rpx 22rpx;
  border: 2rpx solid #e6edf5;
  border-radius: 24rpx;
  background: #f8fbff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
  transition: transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease;
}

.choice-card--active {
  border-color: #60a5fa;
  background: #eef5ff;
  box-shadow: 0 14rpx 28rpx rgba(96, 165, 250, 0.16);
}

.choice-card:active {
  transform: scale(0.985);
}

.choice-content {
  flex: 1;
}

.choice-title {
  display: block;
  color: #1e293b;
  font-size: 30rpx;
  font-weight: 600;
}

.choice-dot {
  width: 36rpx;
  height: 36rpx;
  border: 2rpx solid #cbd5e1;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.18s ease, background-color 0.18s ease;
}

.choice-dot-inner {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: transparent;
  transition: background-color 0.18s ease;
}

.choice-dot--active {
  border-color: #2563eb;
  background: rgba(37, 99, 235, 0.08);
}

.choice-dot--active .choice-dot-inner {
  background: #2563eb;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 22rpx 24rpx;
  padding-bottom: calc(22rpx + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(12rpx);
  box-shadow: 0 -16rpx 36rpx rgba(15, 23, 42, 0.08);
}

.submit-button {
  height: 96rpx;
  line-height: 96rpx;
  border-radius: 999rpx;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 700;
  letter-spacing: 1rpx;
  box-shadow: 0 18rpx 36rpx rgba(37, 99, 235, 0.24);
}

.submit-button::after {
  border: none;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(22rpx);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
