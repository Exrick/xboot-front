<template>
  <div class="foot">
    <Row type="flex" justify="space-around" class="foot-item">
      <a
        class="item"
        href="https://www.kancloud.cn/exrick/xboot/1009234"
        target="_blank"
        >{{ $t("docs") }}</a
      >
      <a class="item" href="https://github.com/Exrick/x-boot" target="_blank">
        <Icon custom="iconfont icon-github" size="16" />
      </a>
      <a class="item" href="http://xpay.exrick.cn/pay?xboot" target="_blank">{{
        $t("fullVersion")
      }}</a>
    </Row>
    <Row type="flex" justify="center" class="copyright">
      Copyright © 2018 - Present
      <a href="http://exrick.cn" target="_blank" style="margin: 0 5px"
        >Exrick</a
      >
      {{ $t("rights") }}
    </Row>
  </div>
</template>

<script>
export default {
  name: "xboot-footer",
};
</script>

<style lang="less">
.foot {
  width: 100%;
  margin: 48px 0 24px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  .foot-item {
    margin: 0 auto;
    margin-bottom: 1vh;
    width: 60%;
    .item {
      color: rgba(0, 0, 0, 0.45);
    }
    :hover {
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
</style>
