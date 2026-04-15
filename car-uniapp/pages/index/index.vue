<template>
  <view class="page">
    <view class="card">
      <text class="tag">智能推荐</text>
      <text class="title">智能选车助手</text>
      <text class="description">
        根据你的预算、用途和偏好，智能推荐适合你的车型
      </text>
      <button class="start-button" @click="goToForm">开始选车</button>

      <!-- <button class="debug-button" :loading="loading" @click="testApi">测试接口</button> -->
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    goToForm() {
      uni.navigateTo({
        url: '/pages/form/form'
      })
    }
    // async testApi() {
    //   this.loading = true
    //   const sampleUser = {
    //     budgetRange: '10_15',
    //     budgetLabel: '10-15万',
    //     usage: 'family',
    //     usageLabel: '家用',
    //     people: '3_4',
    //     peopleLabel: '3-4人',
    //     chargeRequired: true,
    //     priority: 'space',
    //     priorityLabel: '空间',
    //     carType: 'suv',
    //     carTypeLabel: 'SUV',
    //     energy: 'hybrid',
    //     energyLabel: '混动'
    //   }
    //   try {
    //     const response = await uni.request({
    //       url: 'http://localhost:3000/api/recommend',
    //       method: 'POST',
    //       header: { 'Content-Type': 'application/json' },
    //       data: { user: sampleUser, topK: 3 }
    //     })
    //     console.log('API 返回:', response.data)
    //   } catch (e) {
    //     console.error('请求失败:', e)
    //   } finally {
    //     this.loading = false
    //   }
    // }
  }
}
</script>

<style>
page {
  background: linear-gradient(180deg, #f4f7fb 0%, #eef2f7 100%);
}

.page {
  min-height: 100vh;
  padding: 40rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  width: 100%;
  padding: 72rpx 48rpx;
  border-radius: 32rpx;
  background-color: #ffffff;
  box-shadow: 0 24rpx 60rpx rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.tag {
  padding: 10rpx 24rpx;
  border-radius: 999rpx;
  background-color: #eef4ff;
  color: #3b6ff2;
  font-size: 24rpx;
  font-weight: 600;
}

.title {
  margin-top: 28rpx;
  color: #1f2937;
  font-size: 52rpx;
  font-weight: 700;
}

.description {
  margin-top: 24rpx;
  color: #5b6472;
  font-size: 30rpx;
  line-height: 1.7;
}

.start-button {
  width: 100%;
  margin-top: 64rpx;
  border-radius: 999rpx;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 600;
  height: 96rpx;
  line-height: 96rpx;
  box-shadow: 0 16rpx 32rpx rgba(37, 99, 235, 0.22);
}

.start-button::after {
  border: none;
}

/* .debug-button {
  width: 100%;
  margin-top: 32rpx;
  border-radius: 999rpx;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 600;
  height: 96rpx;
  line-height: 96rpx;
  box-shadow: 0 16rpx 32rpx rgba(16, 185, 129, 0.22);
}

.debug-button::after {
  border: none;
} */
</style>
