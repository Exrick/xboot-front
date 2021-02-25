<template>
  <div>
    <Divider class="component-blue" orientation="left">用户抽屉选择</Divider>
    <user-choose
      v-model="selectUsers"
      text="点我选择用户"
      ref="userChoose"
    ></user-choose>
    <br />
    {{ selectUsers }}
    <h3 class="component-article">基础用法</h3>
    基本用法，使用
    <code>v-model</code>
    实现数据的双向绑定。<br />绑定值为用户对象数组，需包含用户id、nickname和username：<code
      >[{id: ID, username: 账号, nickname: 昵称}]</code
    >
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
import userChoose from "@/views/my-components/xboot/user-choose";
export default {
  components: {
    userChoose,
  },
  data() {
    return {
      selectUsers: [],
      props: props,
      events: events,
      methods: methods,
      data1: [
        {
          name: "text",
          desc: "选择用户按钮文字",
          type: "String",
          value: "选择用户",
        },
        {
          name: "icon",
          desc: "选择用户按钮图标",
          type: "String",
          value: "md-person-add",
        },
        {
          name: "showClear",
          desc: "选择用户后按钮旁显示清空已选按钮",
          type: "Boolean",
          value: "true",
        },
        {
          name: "type",
          desc:
            "按钮类型，可选值为 default、primary、dashed、text、info、success、warning、error或者不设置",
          type: "String",
          value: "default",
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
      ],
      data2: [
        {
          name: "on-change",
          type: "返回选择用户数组",
          value:
            '选择用户数组Array，包含用户id、nickname和username，例如 [{"id":"1","username":"账号","nickname": "昵称"}]',
        },
      ],
      data3: [
        {
          name: "setData",
          type: "设置已选用户数据（回显使用）",
          value:
            '用户数组，需包含用户id、nickname和username，例如 [{"id":"1","username":"账号","nickname": "昵称"}]',
        },
        {
          name: "clearData",
          type: "清空数据",
          value:
            '无',
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>