<template>
  <div>
    <Divider class="component-blue" orientation="left">图标选择输入框</Divider>
    <icon-choose
      v-model="icon"
      showCustom
      showInput
      style="width: 400px"
    ></icon-choose>
    <h3 class="component-article">基础用法</h3>
    基本用法，使用 <code>v-model</code> 实现数据的双向绑定。
    <h3 class="component-article">提示</h3>
    使用iconfont或自定义图片链接建议配合<code>XIcon</code>组件一起使用。扩展图标信息添加见
    <code>src/libs/icon.js</code>
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
import iconChoose from "@/views/my-components/xboot/icon-choose";
export default {
  components: {
    iconChoose,
  },
  data() {
    return {
      icon: "",
      props: props,
      events: events,
      methods: methods,
      data2: [
        {
          name: "on-change",
          type: "返回用户选择的图标名或用户输入的图标文本",
          value: "value（输入框文本值）",
        },
      ],
      data1: [
        {
          name: "value",
          desc: "绑定的值，可使用 v-model 双向绑定",
          type: "String",
          value: "空",
        },
        {
          name: "showCustom",
          desc: "是否显示扩展iconfont图标Tab（建议配合XIcon组件使用）",
          type: "Boolean",
          value: "false",
        },
        {
          name: "showInput",
          desc: "是否显示自定义输入或上传图标Tab（建议配合XIcon组件使用）",
          type: "Boolean",
          value: "false",
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
          desc: "大小，可选值为large、small、default或者不设置",
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
          name: "placeholder",
          desc: "占位文本",
          type: "String",
          value: "输入图标名或选择图标",
        },
        {
          name: "disabled",
          desc: "设置输入框和选择按钮为禁用状态",
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
          desc: "设置输入框最大输入长度",
          type: "Number",
          value: "-",
        },
        {
          name: "icon",
          desc: "设置上传按钮图标",
          type: "String",
          value: "md-ionic",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>