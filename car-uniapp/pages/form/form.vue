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
      <button class="submit-button" :loading="submitting" @click="submitForm">{{ textMap.submitButton }}</button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CarFormPage',
  data() {
    return {
      submitting: false,
      textMap: {
        heroBadge: '智能选车',
        heroNote: '卡片式问卷',
        title: '选车需求表单',
        description: '像填写一份轻问卷一样，逐题选择你的需求，系统会据此给出更合适的车型推荐。',
        progressLabel: '已确认',
        cardTip: '点击每个选项卡片即可完成选择',
        budgetLabel: '预算范围',
        usageLabel: '用途',
        peopleLabel: '人数',
        chargeLabel: '是否有充电条件',
        priorityLabel: '更看重',
        carTypeLabel: '偏好车型',
        energyLabel: '偏好能源',
        budgetHint: '先选定一个大致购车预算区间',
        usageHint: '这台车最常用来做什么',
        peopleHint: '你平时最常见的乘坐人数',
        chargeHint: '这会直接影响新能源车型的可用性',
        priorityHint: '请选一个你现在最在意的方向',
        carTypeHint: '选择你更想要的车身形态',
        energyHint: '选择你更偏好的动力方式',
        question1: '第 1 题',
        question2: '第 2 题',
        question3: '第 3 题',
        question4: '第 4 题',
        question5: '第 5 题',
        question6: '第 6 题',
        question7: '第 7 题',
        submitButton: '开始推荐',
        chargeYes: '有',
        chargeNo: '没有'
      },
      budgetOptions: [
        { label: '10万以下', value: 'under_10' },
        { label: '10-15万', value: '10_15' },
        { label: '15-20万', value: '15_20' },
        { label: '20万以上', value: 'over_20' }
      ],
      usageOptions: [
        { label: '通勤', value: 'commute' },
        { label: '家用', value: 'family' },
        { label: '长途', value: 'travel' },
        { label: '混合', value: 'mixed' }
      ],
      peopleOptions: [
        { label: '1-2人', value: '1_2' },
        { label: '3-4人', value: '3_4' },
        { label: '5人以上', value: '5_plus' }
      ],
      chargeOptions: [
        { label: '有，可以充电', value: true },
        { label: '没有，不太方便充电', value: false }
      ],
      priorityOptions: [
        { label: '省钱', value: 'value' },
        { label: '省油', value: 'fuel_economy' },
        { label: '空间', value: 'space' },
        { label: '智能', value: 'smart' }
      ],
      carTypeOptions: [
        { label: '轿车', value: 'sedan' },
        { label: 'SUV', value: 'suv' },
        { label: '无所谓', value: 'any' }
      ],
      energyOptions: [
        { label: '燃油', value: 'fuel' },
        { label: '混动', value: 'hybrid' },
        { label: '纯电', value: 'electric' },
        { label: '无所谓', value: 'any' }
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
    async submitForm() {
      if (this.submitting) return
      this.submitting = true

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

      try {
        uni.showLoading({ title: 'AI 推荐中...', mask: true })

        // uni.request async 模式实际返回 { statusCode, data }，类型声明不完整需做断言
        interface RequestResponse {
          statusCode: number
          data: { success: boolean; data: any; message?: string }
        }
        const response = (await uni.request({
          url: 'http://localhost:3000/api/recommend',
          method: 'POST',
          header: { 'Content-Type': 'application/json' },
          data: { user: submitData, topK: 3 }
        })) as RequestResponse

        uni.hideLoading()

        if (response.statusCode === 200 && response.data.success) {
          uni.setStorageSync('carRecommendResult', response.data.data)
          uni.navigateTo({ url: '/pages/result/result' })
        } else {
          uni.showToast({
            title: response.data?.message || '推荐失败',
            icon: 'none'
          })
        }
      } catch (e) {
        uni.hideLoading()
        uni.showToast({
          title: '无法连接后端服务，请确认后端已启动',
          icon: 'none',
          duration: 3000
        })
      } finally {
        this.submitting = false
      }
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
