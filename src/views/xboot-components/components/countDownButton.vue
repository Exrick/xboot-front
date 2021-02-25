<template>
  <div>
    <Divider class="component-blue" orientation="left">倒计时按钮</Divider>
    <count-down-button countTime="10" />
    <h3 class="component-article">提示</h3>
    你可以将 <code>autoCountDown</code> 属性设置为
    <code>false</code>，即可手动调用开始倒计时方法
    <code>startCountDown()</code
    >，用于验证手机号或发送短信成功后开始倒计时等场景。
    <h3 class="component-article">props</h3>
    <Table
      :columns="props"
      :data="data1"
      border
      size="small"
      width="1000"
    ></Table>
    <h3 class="component-article">events</h3>
    <Table
      :columns="events"
      :data="data2"
      border
      size="small"
      width="1000"
    ></Table>
    <h3 class="component-article">methods</h3>
    <Table
      :columns="methods"
      :data="data3"
      border
      size="small"
      width="1000"
    ></Table>
  </div>
</template>
<script>
import { props, events, methods } from "./columns";
import countDownButton from "@/views/my-components/xboot/count-down-button";
export default {
  components: {
    countDownButton,
  },
  data() {
    return {
      props: props,
      events: events,
      methods: methods,
      data1: [
        {
          name: "text",
          desc: "按钮默认文本",
          type: "String",
          value: "提交",
        },
        {
          name: "autoCountDown",
          desc: "点击后即自动开始倒计时，设置为false后可手动触发倒计时",
          type: "Boolean",
          value: "true",
        },
        {
          name: "countTime",
          desc: "倒计时时间，单位：秒",
          type: "Number",
          value: "60",
        },
        {
          name: "suffixText",
          desc: "倒计时中文本后缀，如'60秒后重试'，其中‘秒后重试’可自定义",
          type: "String",
          value: "秒后重试",
        },
        {
          name: "type",
          desc:
            "按钮类型，可选值为 default、primary、dashed、text、info、success、warning、error或者不设置",
          type: "String",
          value: "default",
        },
        {
          name: "ghost",
          desc: "幽灵属性，使按钮背景透明",
          type: "Boolean",
          value: "false",
        },
        {
          name: "size",
          desc: "按钮大小，可选值为large、small、default或者不设置",
          type: "String",
          value: "default",
        },
        {
          name: "shape",
          desc: "按钮形状，可选值为circle或者不设置",
          type: "String",
          value: "-",
        },
        {
          name: "long",
          desc: "开启后，按钮的长度为100%",
          type: "Boolean",
          value: "false",
        },
        {
          name: "disabled",
          desc: "设置按钮为禁用状态",
          type: "Boolean",
          value: "false",
        },
        {
          name: "loading",
          desc: "设置按钮为加载中状态",
          type: "Boolean",
          value: "false",
        },
        {
          name: "icon",
          desc: "设置按钮的图标类型",
          type: "String",
          value: "-",
        },
      ],
      data2: [
        {
          name: "on-click",
          type: "用户点击事件",
          value: "无",
        },
      ],
      data3: [
        {
          name: "startCountDown",
          type: "当autoCountDown设置为false时生效，手动开启倒计时",
          value: "无",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>