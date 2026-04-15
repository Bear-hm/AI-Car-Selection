<template>
  <view class="page">
    <view class="content-card">
      <view v-if="formData" class="recommend-card">
        <view class="section-head">
          <text class="section-title">{{ textMap.recommendTitle }}</text>
          <text class="section-tip">{{ textMap.recommendTip }}</text>
        </view>

        <view v-if="recommendedCars.length" class="car-list">
          <view
            v-for="(car, index) in recommendedCars"
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
                  <text class="car-price">{{ car.priceText }}</text>
                </view>

                <view class="tag-row">
                  <text class="car-tag car-tag--recommend">{{ car.matchText }}</text>
                  <text class="car-tag car-tag--scene">{{ formData.usageLabel }}</text>
                  <text class="car-tag car-tag--neutral">{{ formData.priorityLabel }}</text>
                  <text class="car-tag car-tag--neutral">{{ car.typeLabel }}</text>
                </view>

                <text class="car-reason">
                  {{ textMap.reasonLabel }}{{ car.reasonText }}
                </text>
              </view>
            </view>
          </view>
        </view>

        <view v-else class="empty-card">
          <text class="empty-text">{{ textMap.noCar }}</text>
        </view>
      </view>

      <view v-else class="empty-card">
        <text class="empty-text">{{ textMap.empty }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import carsData from '../../data/cars.json'
import { getCarEnergyLabel, getCarTypeLabel, scoreCars } from '../../utils/scorer'

export default {
  name: 'CarResultPage',
  data() {
    return {
      formData: null,
      recommendedCars: [],
      textMap: {
        empty: '\u6682\u672a\u83b7\u53d6\u5230\u9009\u8f66\u9700\u6c42\uff0c\u8bf7\u5148\u8fd4\u56de\u586b\u5199\u8868\u5355\u3002',
        recommendTitle: '\u63a8\u8350\u8f66\u578b',
        recommendTip: '\u9884\u7b97\u5185\u8f66\u578b\u4f1a\u4f18\u5148\u63a8\u8350\uff0c\u9884\u7b97\u7565\u8d85\u4f46\u6574\u4f53\u5408\u9002\u7684\u8f66\u578b\u4f1a\u4f5c\u4e3a\u5f31\u63a8\u8350\u51fa\u73b0',
        reasonLabel: '\u63a8\u8350\u7406\u7531\uff1a',
        scoreUnit: '\u5206',
        noCar: '\u6682\u65f6\u6ca1\u6709\u627e\u5230\u5408\u9002\u7684\u8f66\u578b\uff0c\u4f60\u53ef\u4ee5\u8fd4\u56de\u8c03\u6574\u4e00\u4e0b\u7b5b\u9009\u6761\u4ef6\u3002'
      }
    }
  },
  onShow() {
    this.loadResult()
  },
  methods: {
    loadResult() {
      const storedData = uni.getStorageSync('carFormData')
      this.formData = storedData && Object.keys(storedData).length ? storedData : null

      if (!this.formData) {
        this.recommendedCars = []
        return
      }

      this.recommendedCars = scoreCars(this.formData, carsData)
        .map(car => ({
          ...car,
          priceText: car.priceMin + '-' + car.priceMax + '\u4e07',
          typeLabel: getCarTypeLabel(car.type),
          energyLabel: getCarEnergyLabel(car.energy),
          seatsText: car.seats + '\u5ea7',
          reasonText: this.buildReasonText(car)
        }))
        .slice(0, 3)
    },
    buildReasonText(car) {
      const keywordParts: string[] = []

      if (car.reasons && car.reasons.length) {
        keywordParts.push(...car.reasons)
      }

      keywordParts.push(car.typeLabel)
      keywordParts.push(car.energyLabel)
      keywordParts.push(car.seatsText)

      const uniqueParts = keywordParts.filter((item, index) => item && keywordParts.indexOf(item) === index)
      return uniqueParts.join(' / ')
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
  padding: 28rpx 24rpx 40rpx;
  box-sizing: border-box;
}

.content-card {
  padding: 0;
}

.recommend-card,
.empty-card {
  margin-top: 0;
}

.recommend-card {
  padding: 0;
}

.section-head {
  padding: 12rpx 10rpx 24rpx;
  margin-bottom: 12rpx;
}

.section-title {
  display: block;
  font-size: 40rpx;
  font-weight: 700;
  color: #111827;
}

.section-tip {
  display: block;
  margin-top: 12rpx;
  font-size: 24rpx;
  line-height: 1.6;
  color: #6b7280;
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

.car-tag--scene {
  background-color: #dcfce7;
  color: #15803d;
}

.car-tag--neutral {
  background-color: #f1f5f9;
  color: #475569;
}

.car-reason {
  display: block;
  margin-top: 22rpx;
  font-size: 24rpx;
  line-height: 1.7;
  color: #64748b;
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

.empty-card {
  padding: 32rpx 24rpx;
  border-radius: 24rpx;
  background-color: #ffffff;
  box-shadow: 0 14rpx 36rpx rgba(15, 23, 42, 0.08);
}

.empty-text {
  font-size: 28rpx;
  color: #64748b;
  line-height: 1.7;
}
</style>
