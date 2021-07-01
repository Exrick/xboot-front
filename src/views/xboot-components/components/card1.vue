<template>
  <div>
    <Divider class="component-blue" orientation="left">卡片1</Divider>
    <Row :gutter="20" class="n-m-r-0">
      <Col :sm="24" :md="24" :lg="8" :style="{ marginBottom: '10px' }">
        <card
          id="card1"
          icon="ios-stats"
          iconColor="#975ee4"
          :endVal="123456"
          title="Icon演示"
        />
      </Col>
      <Col :sm="24" :md="24" :lg="8" :style="{ marginBottom: '10px' }">
        <card
          id="card2"
          :backgroundImage="
            'url(' + require('@/assets/dashboard/circle.svg') + ')'
          "
          :image="require('@/assets/dashboard/fee.png')"
          width="30"
          height="30"
          :endVal="123456"
          title="图片演示"
        />
      </Col>
      <Col :sm="24" :md="24" :lg="8" :style="{ marginBottom: '10px' }">
        <card
          id="card3"
          :backgroundImage="
            'url(' + require('@/assets/dashboard/balloon.svg') + ')'
          "
          icon="logo-bitcoin"
          :endVal="1234.56"
          prefix="$"
          :duration="5"
          :decimalPlaces="2"
          title="计数配置演示"
      /></Col>
    </Row>
    <Row :gutter="20" class="n-m-r-0">
      <Col :sm="24" :md="24" :lg="8" :style="{ marginBottom: '10px' }">
        <card
          id="card4"
          cardHeight="80px"
          icon="ios-stats"
          iconColor="#ff9900"
          iconSize="20"
          countColor="#2d8cf0"
          countSize="20px"
          :endVal="123456"
          title="大小颜色演示"
          titleSize="16px"
          titleColor="#17233d"
        />
      </Col>
      <Col :sm="24" :md="24" :lg="8" :style="{ marginBottom: '10px' }">
        <card
          id="card5"
          countColor="#fff"
          :endVal="12.34"
          :decimalPlaces="2"
          suffix="%"
          backgroundColor="#5cadff"
          icon="ios-analytics"
          iconColor="#fff"
          titleColor="#fff"
          title="背景色演示"
          :bordered="false"
        />
      </Col>
      <Col :sm="24" :md="24" :lg="8" :style="{ marginBottom: '10px' }">
        <card
          id="card6"
          countColor="#fff"
          :endVal="123456"
          backgroundColor="#c5c8ce"
          icon="ios-analytics"
          iconColor="#fff"
          titleColor="#fff"
          title="背景色演示"
          :bordered="false"
      /></Col>
    </Row>

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
import card from "@/views/my-components/widget/card1";
export default {
  components: {
    card,
  },
  data() {
    return {
      props: props,
      events: events,
      methods: methods,
      data1: [
        {
          name: "id",
          desc:
            "卡片中绑定计数器的id，当同时使用两个及以上该组件时，需设定不同的id值加以区分",
          type: "String",
          value: "-",
        },
        {
          name: "cardHeight",
          desc: "卡片高度，需带单位，如100px",
          type: "String",
          value: "102px",
        },
        {
          name: "backgroundColor",
          desc: "卡片背景颜色样式",
          type: "String",
          value: "-",
        },
        {
          name: "backgroundImage",
          desc:
            "卡片背景图片样式（右上角），如'url(' + require('图片链接.png') + ')'",
          type: "String",
          value: "-",
        },
        {
          name: "bordered",
          desc: "是否显示卡片边框",
          type: "Boolan",
          value: "true",
        },
        {
          name: "icon",
          desc: "卡片上方图标（与图片属性image二选一配置）",
          type: "String",
          value: "-",
        },
        {
          name: "iconSize",
          desc: "卡片上方图标大小",
          type: "Number | String",
          value: "26",
        },
        {
          name: "iconColor",
          desc: "卡片上方图标颜色",
          type: "String",
          value: "#478ef9",
        },
        {
          name: "image",
          desc: "卡片上方图标图片（与图标属性icon二选一配置）",
          type: "String",
          value: 'require("@/assets/dashboard/empty.png")',
        },
        {
          name: "width",
          desc: "卡片上方图标图片宽度，需带单位，如26px",
          type: "String",
          value: "26px",
        },
        {
          name: "height",
          desc: "卡片上方图标图片高度，需带单位，如26px",
          type: "String",
          value: "26px",
        },
        {
          name: "prefix",
          desc: "计数数字前缀字符",
          type: "String",
          value: "-",
        },
        {
          name: "endVal",
          desc: "动画计数数字",
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
          desc: "动画计数数更多参数，详见开源组件countUp.js文档 https://github.com/inorganik/CountUp.js",
          type: "Object",
          value:
            '{ startVal: 0, useEasing: true, useGrouping: true, separator: ",", decimal: "." }',
        },
        {
          name: "countColor",
          desc: "计数数字颜色",
          type: "String",
          value: "#3f4255",
        },
        {
          name: "countSize",
          desc: "计数数字大小，需带单位，如24px",
          type: "String",
          value: "24px",
        },
        {
          name: "countWeight",
          desc: "计数数字字体粗细样式，font-weight值",
          type: "Number",
          value: "600",
        },
        {
          name: "title",
          desc: "卡片下方描述文字",
          type: "String",
          value: "-",
        },
        {
          name: "titleColor",
          desc: "卡片下方描述文字颜色",
          type: "String",
          value: "#b5b5c5",
        },
        {
          name: "titleSize",
          desc: "卡片下方描述文字大小，需带单位，如24px",
          type: "String",
          value: "12px",
        },
        {
          name: "titleWeight",
          desc: "计数数字字体粗细样式，font-weight值",
          type: "Number",
          value: "500",
        },
      ],
    };
  },
  methods: {
  },
  mounted() {},
};
</script>
<style lang="less">
.n-m-r-0 {
  margin-right: 0 !important;
}
</style>