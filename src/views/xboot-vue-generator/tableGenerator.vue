<template>
  <div class="sorry">
    <img src="@/assets/sorry.png">
    <span class="text">抱歉，请获取完整版</span>
    <Button to="http://xpay.exrick.cn/pay?xboot" target="_blank" type="error" icon="md-paper-plane">立即获取</Button>
  </div>
</template>

<script>
export default {
};
</script>
<style lang="less">
  .sorry{
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .text{
      font-size: 20px;
      margin: 20px 0;
    }
  }
</style>