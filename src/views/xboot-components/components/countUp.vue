<template>
  <div>
    <Divider class="component-blue" orientation="left">计数组件</Divider>
    <countUp :endVal="value" :duration="3" ref="count" />
    <Button @click="start" style="margin-right: 10px">开始计数</Button>
    <Button @click="update">更新值</Button>

    <h3 class="component-article">props</h3>
    <Table
      :columns="props"
      :data="data1"
      border
      size="small"
      width="1000"
    ></Table>
  </div>
</template>
<script>
import { props, events, methods } from "./columns";
import countUp from "@/views/my-components/widget/countUp";
export default {
  components: {
    countUp,
  },
  data() {
    return {
      value: 123456,
      props: props,
      events: events,
      methods: methods,
      data1: [
        {
          name: "id",
          desc:
            "绑定计数器的id，当同时使用两个及以上该组件时，需设定不同的id值加以区分",
          type: "String",
          value: "countUp",
        },
        {
          name: "prefix",
          desc: "计数数字前缀字符",
          type: "String",
          value: "-",
        },
        {
          name: "endVal",
          desc: "动画计数结束数字",
          type: "Number",
          value: "-",
        },
        {
          name: "suffix",
          desc: "计数数字后缀字符",
          type: "String",
          value: "-",
        },
        {
          name: "delay",
          desc: "计数延时开始，单位毫秒",
          type: "Number",
          value: "0",
        },
        {
          name: "decimalPlaces",
          desc: "计数数字小数位数",
          type: "Number",
          value: "0",
        },
        {
          name: "duration",
          desc: "计数数字动画持续时间，单位秒，默认2秒",
          type: "Number",
          value: "2",
        },
        {
          name: "options",
          desc:
            "动画计数数更多参数，详见开源组件countUp.js文档 https://github.com/inorganik/CountUp.js",
          type: "Object",
          value:
            '{ startVal: 0, useEasing: true, useGrouping: true, separator: ",", decimal: "." }',
        },
        {
          name: "color",
          desc: "计数数字颜色",
          type: "String",
          value: "#3f4255",
        },
        {
          name: "countSize",
          desc: "计数数字大小，需带单位，如24px",
          type: "String",
          value: "18px",
        },
        {
          name: "countWeight",
          desc: "计数数字字体粗细样式，font-weight值",
          type: "Number",
          value: "500",
        },
      ],
    };
  },
  methods: {
    start() {
      this.$refs.count.start();
    },
    update() {
      this.value = 654321;
    },
  },
  mounted() {},
};
</script>
<style lang="less">
.n-m-r-0 {
  margin-right: 0 !important;
}
</style>