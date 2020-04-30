<template>
  <div id="main" class="app-main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  /* overflow: hidden; */
}

.app-main {
  width: 100%;
  height: 100%;
}

.br button {
  margin-right: 8px;
}

.operation button {
  margin-right: 8px;
}

.ivu-btn-text:focus {
  box-shadow: none !important;
}

.ivu-tag {
  cursor: pointer;
}

.block-tool .ivu-tooltip,
.block-tool .ivu-tooltip-rel {
  display: block;
}

.block-pop .ivu-poptip,
.block-pop .ivu-poptip-rel {
  display: block;
}
</style>
