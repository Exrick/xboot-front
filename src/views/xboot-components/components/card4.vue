<template>
  <div>
    <Divider class="component-blue" orientation="left">卡片4</Divider>
    <Row :gutter="20" class="n-m-r-0">
      <Col :sm="24" :md="24" :lg="8" :style="{ marginBottom: '10px' }">
        <card
          title="会议安排"
          time="3:30PM - 5:20PM"
          description="今天下午记得准时参加3:30开始的会议哦"
        />
      </Col>
      <Col :sm="24" :md="24" :lg="8" :style="{ marginBottom: '10px' }">
        <card
          :backgroundImage="
            'url(' + require('@/assets/dashboard/flower.svg') + ')'
          "
          title="最新公告"
          time="2021年05月27日"
          description="XBoot是很棒的前后端分离一站式快速开发平台"
        />
      </Col>
      <Col :sm="24" :md="24" :lg="8" :style="{ marginBottom: '10px' }">
        <card
          :backgroundImage="
            'url(' + require('@/assets/dashboard/abstract.svg') + ')'
          "
          cardHeight="142px"
          title="全新版本发布"
          time="XBoot 完整版"
          timeSize="14px"
          timeBottom="16px"
          timeColor="#975ee4"
          description="XBoot是很棒的前后端分离一站式快速开发平台，全新版本已发布"
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
import card from "@/views/my-components/widget/card4";
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
          name: "title",
          desc: "卡片上方标题文字",
          type: "String",
          value: "-",
        },
        {
          name: "titleColor",
          desc: "卡片上方标题文字颜色",
          type: "String",
          value: "#b5b5c5",
        },
        {
          name: "titleSize",
          desc: "卡片上方标题文字大小，需带单位，如24px",
          type: "String",
          value: "16px",
        },
        {
          name: "titleWeight",
          desc: "卡片上方标题字体粗细样式，font-weight值",
          type: "Number",
          value: "500",
        },
        {
          name: "time",
          desc: "卡片中部文字",
          type: "String",
          value: "-",
        },
        {
          name: "timeColor",
          desc: "卡片中部文字颜色",
          type: "String",
          value: "#1bc5bd",
        },
        {
          name: "timeSize",
          desc: "卡片中部文字大小，需带单位，如24px",
          type: "String",
          value: "12px",
        },
        {
          name: "timeWeight",
          desc: "卡片中部字体粗细样式，font-weight值",
          type: "Number",
          value: "500",
        },
        {
          name: "timeBottom",
          desc: "卡片中部文字下边距margin-bottom值，需带单位，如24px",
          type: "String",
          value: "10px",
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
          value: "16px",
        },
        {
          name: "descriptionWeight",
          desc: "卡片下方描述文字字体粗细样式，font-weight值",
          type: "Number",
          value: "600",
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