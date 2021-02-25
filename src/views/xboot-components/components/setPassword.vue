<template>
  <div>
    <Divider class="component-blue" orientation="left"
      >密码强度提示输入框</Divider
    >
    <setPassword v-model="password" style="width: 300px" />
    <h3 class="component-article">基础用法</h3>
    基本用法，使用 <code>v-model</code> 实现数据的双向绑定。
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
  </div>
</template>
<script>
import { props, events, methods } from "./columns";
import setPassword from "@/views/my-components/xboot/set-password";
export default {
  components: {
    setPassword,
  },
  data() {
    return {
      password: "",
      props: props,
      events: events,
      methods: methods,
      data1: [
        {
          name: "value",
          desc: "绑定的值，可使用 v-model 双向绑定",
          type: "String",
          value: "空",
        },
        {
          name: "size",
          desc: "输入框尺寸，可选值为large、small、default或者不设置",
          type: "String",
          value: "-",
        },
        {
          name: "placeholder",
          desc: "占位文本",
          type: "String",
          value: "请输入密码，长度为6-20个字符",
        },
        {
          name: "disabled",
          desc: "设置输入框和上传按钮为禁用状态",
          type: "Boolean",
          value: "false",
        },
        {
          name: "readonly",
          desc: "设置输入框为只读",
          type: "Boolean",
          value: "false",
        },
        {
          name: "maxlength",
          desc: "设置输入框最大输入长度，默认20",
          type: "Number",
          value: "20",
        },
      ],
      data2: [
        {
          name: "on-change",
          type:
            "强度等级得分0-5，包含数字、小写字母、大写字母、特殊字符、长度≥10各累加1分，≤1分强度为弱、2-4分强度为中、5分强度为强",
          value:
            "第一个参数为返回用户输入的内容，第二个参数为强度等级得分0-5，第三个参数为强度汉字",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>