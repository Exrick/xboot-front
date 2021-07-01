<template>
  <div>
    <Divider class="component-blue" orientation="left">卡片3</Divider>
    <Row :gutter="20" class="n-m-r-0">
      <Col :sm="24" :md="24" :lg="8" :style="{ marginBottom: '10px' }">
        <card
          title="应用中心"
          description="销量统计，用户统计，日活分析"
          :image="require('@/assets/icon/app.png')"
          width="34px"
          height="34px"
        />
      </Col>
      <Col :sm="24" :md="24" :lg="8" :style="{ marginBottom: '10px' }">
        <card
          :backgroundImage="
            'url(' + require('@/assets/dashboard/balloon.svg') + ')'
          "
          icon="md-cart"
          title="购物车"
          description="销量统计，用户统计，日活分析"
        />
      </Col>
      <Col :sm="24" :md="24" :lg="8" :style="{ marginBottom: '10px' }">
        <card
          :bordered="false"
          backgroundColor="#8851fc"
          icon="logo-bitcoin"
          iconColor="#fff"
          title="数字货币"
          titleColor="#fff"
          description="销量统计，用户统计，日活分析"
          descriptionColor="#fff"
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
import card from "@/views/my-components/widget/card3";
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
          value: "36",
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
          value: "30px",
        },
        {
          name: "height",
          desc: "卡片上方图标图片高度，需带单位，如26px",
          type: "String",
          value: "30px",
        },
        {
          name: "title",
          desc: "卡片中部标题文字",
          type: "String",
          value: "-",
        },
        {
          name: "titleColor",
          desc: "卡片中部标题文字颜色",
          type: "String",
          value: "#3f4255",
        },
        {
          name: "titleSize",
          desc: "卡片中部标题文字大小，需带单位，如24px",
          type: "String",
          value: "18px",
        },
        {
          name: "titleWeight",
          desc: "卡片中部标题字体粗细样式，font-weight值",
          type: "Number",
          value: "600",
        },
        {
          name: "titleBottom",
          desc: "卡片中部文字下边距margin-bottom值，需带单位，如24px",
          type: "String",
          value: "0px",
        },
        {
          name: "description",
          desc: "卡片下方描述文字",
          type: "String",
          value: "-",
        },
        {
          name: "descriptionColor",
          desc: "卡片下方描述文字颜色",
          type: "String",
          value: "#3f4255",
        },
        {
          name: "descriptionSize",
          desc: "卡片下方描述文字大小，需带单位，如24px",
          type: "String",
          value: "12px",
        },
        {
          name: "descriptionWeight",
          desc: "卡片下方描述文字字体粗细样式，font-weight值",
          type: "Number",
          value: "500",
        },
        {
          name: "descriptionBottom",
          desc: "卡片下方描述文字下边距margin-bottom值，需带单位，如24px",
          type: "String",
          value: "0px",
        },
      ],
    };
  },
  methods: {
    showCheckPass() {
      this.$refs.checkPass.show();
    },
    checkSuccess() {
      this.$Message.success("验证成功");
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