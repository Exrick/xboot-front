<template>
  <div>
    <Divider class="component-blue" orientation="left">部门树选择</Divider>
    <department-tree-choose
      multiple
      style="width: 400px"
      @on-change="handleSelectDepTree"
      ref="depTree"
    ></department-tree-choose>
    <br />
    {{ selectDeps }}
    <h3 class="component-article">样式冲突</h3>
    在 <code>FormItem</code> 中使用时，建议在该标签上加上
    <code>class="form-noheight"</code>。
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
import departmentTreeChoose from "@/views/my-components/xboot/department-tree-choose";
export default {
  components: {
    departmentTreeChoose,
  },
  data() {
    return {
      props: props,
      events: events,
      methods: methods,
      selectDeps: [],
      data1: [
        {
          name: "text",
          desc: "选择部门按钮文字",
          type: "String",
          value: "选择用户",
        },
        {
          name: "icon",
          desc: "选择部门按钮图标",
          type: "String",
          value: "md-person-add",
        },
        {
          name: "placeholder",
          desc: "提示文字",
          type: "String",
          value: "点击选择部门",
        },
        {
          name: "multiple",
          desc: "是否选开启多选，默认false不开启",
          type: "Boolean",
          value: "false",
        },
        {
          name: "clearable",
          desc: "是否显示清空按钮",
          type: "Boolean",
          value: "true",
        },
        {
          name: "disabled",
          desc: "是否禁用",
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
          name: "shape",
          desc: "按钮形状，可选值为circle或者不设置",
          type: "String",
          value: "-",
        },
        {
          name: "prefix",
          desc: "输入框头部图标",
          type: "String",
          value: "-",
        },
        {
          name: "suffix",
          desc: "输入框尾部图标",
          type: "String",
          value: "-",
        },
      ],
      data2: [
        {
          name: "on-change",
          type: "返回选择部门id字符串(非多选)或数组(开启多选)",
          value:
            '选择部门id字符串或数组Array，仅包含部门id，例如"1"(非多选)或["1","2","3"](开启多选)',
        },
        {
          name: "on-clear",
          type: "开启clearable时可用，点击清空按钮时触发",
          value: "无",
        },
      ],
      data3: [
        {
          name: "setData",
          type: "设置已选部门数据（回显使用）",
          value:
            "第一个参数为部门id字符串(非多选)或数组Array(开启多选)，第二个参数为部门标题（String）",
        },
      ],
    };
  },
  methods: {
    handleSelectDepTree(v) {
      this.selectDeps = v;
    },
  },
  mounted() {},
};
</script>