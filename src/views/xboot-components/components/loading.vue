<template>
  <div>
    <Divider class="component-blue" orientation="left"
      >全局Loading加载动画</Divider
    >
    <Button @click="showLoading">显示右上角加载动画</Button>
    <Button @click="closeLoading" style="margin-left: 5px"
      >关闭右上角加载动画</Button
    >
    <h3 class="component-article">使用方式</h3>
    修改全局Vuex即可，开启：
    <code>this.$store.commit("setLoading", true)</code> 关闭：
    <code>this.$store.commit("setLoading", false)</code>
    <Divider class="component-blue" orientation="left"
      >iView官方 LoadingBar加载进度条</Divider
    >
    <Button @click="start">开始加载</Button>
    <Button @click="finish" style="margin-left: 5px">结束加载</Button>
    <Button @click="error" style="margin-left: 5px">错误</Button>
    <h3 class="component-article">说明</h3>
    如果你觉得上方XBoot提供的动画不明显，你还可以使用iView官方自带的顶部
    <a href="https://www.iviewui.com/components/loading-bar" target="_blank"
      >LoadingBar组件</a
    >
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    showLoading() {
      this.$store.commit("setLoading", true);
    },
    closeLoading() {
      this.$store.commit("setLoading", false);
    },
    start() {
      this.$Loading.start();
    },
    finish() {
      this.$Loading.finish();
    },
    error() {
      this.$Loading.error();
    },
  },
  mounted() {},
};
</script>