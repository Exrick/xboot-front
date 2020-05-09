<template>
  <div class="foot">
    <Row type="flex" justify="space-around" class="help">
      <a class="item" href="https://github.com/Exrick/x-boot" target="_blank">{{ $t('help') }}</a>
      <a class="item" href="https://github.com/Exrick/x-boot" target="_blank">{{ $t('privacy') }}</a>
      <a class="item" href="https://github.com/Exrick/x-boot" target="_blank">{{ $t('terms') }}</a>
    </Row>
    <Row type="flex" justify="center" class="copyright">
      Copyright © 2018 - Present
      <a
        href="http://exrick.cn"
        target="_blank"
        style="margin:0 5px;"
      >Exrick</a>
      {{ $t('rights') }}
    </Row>
  </div>
</template>

<script>
export default {
  name: "footer"
};
</script>

<style lang="less">
.foot {
  width: 100%;
  margin-top: 10vh;
  margin-bottom: 3vh;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  .help {
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
