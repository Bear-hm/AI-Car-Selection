<template>
  <view class="page">
    <view class="page-header">
      <view class="header-top">
        <text class="header-title">推荐结果</text>
        <text class="header-subtitle">{{ formData?.budgetLabel }} · {{ formData?.usageLabel }}</text>
      </view>
    </view>

    <scroll-view scroll-y class="content-scroll">

      <!-- AI 智能解读 -->
      <view v-if="aiData" class="ai-summary-card">
        <view class="ai-summary-header">
          <text class="ai-summary-icon">AI</text>
          <text class="ai-summary-title">智能解读</text>
          <view v-if="aiData.mode" class="ai-mode-tag">
            <text class="ai-mode-text">{{ aiData.mode === 'llm' ? '大模型生成' : '规则生成' }}</text>
          </view>
        </view>
        <text class="ai-summary-text">{{ aiData.summary }}</text>

        <!-- 亮点 -->
        <view v-if="aiData.highlights?.length" class="ai-section">
          <text class="ai-section-title">亮点</text>
          <view class="ai-tag-list">
            <text v-for="(item, i) in aiData.highlights" :key="i" class="ai-tag ai-tag--highlight">{{ item }}</text>
          </view>
        </view>

        <!-- 注意事项 -->
        <view v-if="aiData.cautions?.length" class="ai-section">
          <text class="ai-section-title">注意</text>
          <view class="ai-tag-list">
            <text v-for="(item, i) in aiData.cautions" :key="i" class="ai-tag ai-tag--caution">{{ item }}</text>
          </view>
        </view>

        <!-- 车型对比 -->
        <view v-if="aiData.compare" class="ai-section">
          <text class="ai-section-title">对比参考</text>
          <text class="ai-compare-text">{{ aiData.compare }}</text>
        </view>
      </view>

      <!-- 推荐车型列表 -->
      <view v-if="topCars.length" class="car-section">
        <view class="car-section-head">
          <text class="car-section-title">为你推荐</text>
          <text class="car-section-tip">按匹配度排序</text>
        </view>

        <view class="car-list">
          <view
            v-for="(car, index) in topCars"
            :key="car.id"
            class="car-card"
            :class="{ 'car-card--top': index === 0 }"
          >
            <text class="score-badge">{{ car.score }}{{ textMap.scoreUnit }}</text>
            <view class="top-badge" :class="'top-badge--' + (index + 1)">TOP {{ index + 1 }}</view>

            <view class="car-main">
              <view class="car-left">
                <text class="car-brand">{{ car.brand }}</text>
                <view class="car-title-row">
                  <text class="car-name">{{ car.name }}</text>
                  <text class="car-price">{{ car.priceMin }}-{{ car.priceMax }}万</text>
                </view>

                <view class="tag-row">
                  <text class="car-tag car-tag--recommend">{{ car.matchText }}</text>
                </view>

                <view v-if="car.insight" class="car-insight">
                  <text class="car-insight-text">{{ car.insight }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 无数据 -->
      <view v-if="!topCars.length && !aiData" class="empty-card">
        <text class="empty-text">{{ textMap.empty }}</text>
        <button class="retry-button" @click="goBack">返回修改</button>
      </view>

    </scroll-view>
  </view>
</template>

<script>
export default {
  name: 'CarResultPage',
  data() {
    return {
      formData: null,
      topCars: [],
      aiData: null,
      textMap: {
        scoreUnit: '分',
        empty: '暂无推荐结果，请返回重新填写。'
      }
    }
  },
  onShow() {
    this.loadResult()
  },
  methods: {
    loadResult() {
      const result = uni.getStorageSync('carRecommendResult')

      if (!result) {
        this.topCars = []
        this.aiData = null
        this.formData = null
        return
      }

      this.formData = result.user || null
      this.topCars = result.topCars || []
      this.aiData = result.ai || null
    },
    goBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style>
page {
  background-color: #f5f7fa;
}

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  padding-top: calc(var(--status-bar-height) + 18rpx);
  padding-bottom: 24rpx;
  padding-left: 32rpx;
  padding-right: 32rpx;
  background: linear-gradient(180deg, #eff6ff 0%, #f5f7fa 100%);
  box-shadow: 0 4rpx 20rpx rgba(15, 23, 42, 0.06);
}

.header-top {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.header-title {
  font-size: 44rpx;
  font-weight: 700;
  color: #0f172a;
}

.header-subtitle {
  font-size: 26rpx;
  color: #64748b;
}

.content-scroll {
  flex: 1;
  margin-top: calc(var(--status-bar-height) + 18rpx + 44rpx + 24rpx + 24rpx);
  padding: 24rpx 24rpx 60rpx;
  box-sizing: border-box;
}

/* AI 智能解读卡片 */
.ai-summary-card {
  padding: 32rpx 28rpx;
  border-radius: 28rpx;
  background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #2563eb 100%);
  box-shadow: 0 20rpx 48rpx rgba(37, 99, 235, 0.2);
  margin-bottom: 28rpx;
}

.ai-summary-header {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 20rpx;
}

.ai-summary-icon {
  padding: 6rpx 14rpx;
  border-radius: 8rpx;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 20rpx;
  font-weight: 700;
}

.ai-summary-title {
  color: #ffffff;
  font-size: 30rpx;
  font-weight: 700;
}

.ai-mode-tag {
  margin-left: auto;
  padding: 6rpx 14rpx;
  border-radius: 8rpx;
  background: rgba(255, 255, 255, 0.15);
}

.ai-mode-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 20rpx;
}

.ai-summary-text {
  display: block;
  color: #ffffff;
  font-size: 28rpx;
  line-height: 1.8;
}

.ai-section {
  margin-top: 24rpx;
  padding-top: 24rpx;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.ai-section-title {
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 22rpx;
  font-weight: 600;
  margin-bottom: 14rpx;
  letter-spacing: 1rpx;
}

.ai-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}

.ai-tag {
  padding: 8rpx 18rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
  font-weight: 500;
  line-height: 1.4;
}

.ai-tag--highlight {
  background: rgba(16, 185, 129, 0.25);
  color: #6ee7b7;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.ai-tag--caution {
  background: rgba(251, 191, 36, 0.25);
  color: #fde68a;
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.ai-compare-text {
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-size: 26rpx;
  line-height: 1.7;
}

/* 车型列表 */
.car-section {
  margin-top: 8rpx;
}

.car-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rpx 20rpx;
}

.car-section-title {
  font-size: 36rpx;
  font-weight: 700;
  color: #111827;
}

.car-section-tip {
  font-size: 22rpx;
  color: #94a3b8;
}

.car-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.car-card {
  position: relative;
  padding: 32rpx 28rpx;
  border-radius: 24rpx;
  background-color: #ffffff;
  box-shadow: 0 14rpx 36rpx rgba(15, 23, 42, 0.08);
  overflow: hidden;
}

.car-card--top {
  box-shadow: 0 18rpx 42rpx rgba(37, 99, 235, 0.12);
  border: 1px solid rgba(37, 99, 235, 0.1);
}

.top-badge {
  position: absolute;
  top: 0;
  right: 28rpx;
  padding: 10rpx 18rpx;
  border-radius: 0 0 18rpx 18rpx;
  color: #ffffff;
  font-size: 20rpx;
  font-weight: 700;
  letter-spacing: 1rpx;
}

.top-badge--1 {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
}

.top-badge--2 {
  background: linear-gradient(135deg, #10b981, #059669);
}

.top-badge--3 {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.car-main {
  display: block;
  padding-top: 20rpx;
}

.car-left {
  min-width: 0;
}

.car-brand {
  display: block;
  font-size: 22rpx;
  line-height: 1.4;
  color: #94a3b8;
}

.car-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
  margin-top: 8rpx;
}

.car-name {
  flex: 1;
  font-size: 38rpx;
  font-weight: 700;
  line-height: 1.3;
  color: #0f172a;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 22rpx;
}

.car-tag {
  padding: 8rpx 18rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
  line-height: 1.4;
  font-weight: 600;
}

.car-tag--recommend {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.car-insight {
  margin-top: 22rpx;
  padding: 20rpx 24rpx;
  border-radius: 16rpx;
  background-color: #f8fafc;
  border-left: 4rpx solid #2563eb;
}

.car-insight-text {
  display: block;
  color: #475569;
  font-size: 26rpx;
  line-height: 1.8;
}

.score-badge {
  position: absolute;
  top: 0;
  left: 28rpx;
  padding: 10rpx 16rpx;
  border-radius: 0 0 16rpx 16rpx;
  background-color: #dbeafe;
  font-size: 20rpx;
  font-weight: 600;
  color: #1d4ed8;
}

.car-price {
  flex-shrink: 0;
  font-size: 34rpx;
  line-height: 1.3;
  font-weight: 700;
  text-align: right;
  color: #2563eb;
}

/* 空状态 */
.empty-card {
  padding: 80rpx 40rpx;
  border-radius: 24rpx;
  background-color: #ffffff;
  box-shadow: 0 14rpx 36rpx rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #64748b;
  line-height: 1.7;
  text-align: center;
}

.retry-button {
  padding: 20rpx 48rpx;
  border-radius: 999rpx;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  font-size: 28rpx;
  font-weight: 600;
  box-shadow: 0 12rpx 24rpx rgba(37, 99, 235, 0.2);
}

.retry-button::after {
  border: none;
}
</style>
