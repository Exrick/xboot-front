<template>
  <div>
    <Divider class="component-blue" orientation="left">数组字典组件</Divider>
    <dict dict="sex" transfer style="width: 300px" />
    <br />
    <dict dict="permission_type" transfer style="width: 300px" />
    <h3 class="component-article">基础用法</h3>
    基本用法，传入 <code>dict</code>属性获取指定的数据字典类型， 使用
    <code>v-model</code> 实现数据的双向绑定。
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
import dict from "@/views/my-components/xboot/dict";
export default {
  components: {
    dict,
  },
  data() {
    return {
      props: props,
      events: events,
      methods: methods,
      data1: [
        {
          name: "dict",
          desc: "获取指定类型的数据字典【必须填入】",
          type: "String",
          value: "空",
        },
        {
          name: "value",
          desc:
            "绑定的值，可使用 v-model 双向绑定。单选时只接受 String 或 Number，多选时只接受 Array",
          type: "String | Number | Array",
          value: "空",
        },
        {
          name: "multiple",
          desc: "是否支持多选",
          type: "Boolean",
          value: "false",
        },
        {
          name: "disabled",
          desc: "是否禁用",
          type: "Boolean",
          value: "false",
        },
        {
          name: "clearable",
          desc: "是否可以清空选项，只在单选时有效",
          type: "Boolean",
          value: "true",
        },
        {
          name: "filterable",
          desc: "是否支持搜索",
          type: "Boolean",
          value: "false",
        },
        {
          name: "size",
          desc: "选择框大小，可选值为large、small、default或者不填",
          type: "String",
          value: "-",
        },
        {
          name: "placeholder",
          desc: "选择框默认文字",
          type: "String",
          value: "请选择",
        },
        {
          name: "placement",
          desc:
            "弹窗的展开方向，可选值为 top、bottom、top-start、bottom-start、top-end、bottom-end",
          type: "String",
          value: "bottom-start",
        },
        {
          name: "transfer",
          desc:
            "是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果",
          type: "Boolean",
          value: "false",
        },
        {
          name: "transfer-class-name",
          desc: "开启 transfer 时，给浮层添加额外的 class 名称",
          type: "String",
          value: "-",
        },
        {
          name: "prefix",
          desc: "在 Select 内显示图标",
          type: "String",
          value: "-",
        },
        {
          name: "max-tag-count",
          desc: "多选时最多显示多少个 tag",
          type: "Number",
          value: "-",
        },
        {
          name: "max-tag-placeholder",
          desc: "隐藏 tag 时显示的内容，参数是剩余项数量",
          type: "Function",
          value: "-",
        },
      ],
      data2: [
        {
          name: "on-change",
          type: "选中的Option变化时触发，默认返回 value",
          value: "当前选中项",
        },
        {
          name: "on-query-change",
          type: "搜索词改变时触发",
          value: "query",
        },
        {
          name: "on-clear",
          type: "点击清空按钮时触发",
          value: "无",
        },
        {
          name: "on-open-change",
          type: "下拉框展开或收起时触发",
          value: "true / false",
        },
        {
          name: "on-select",
          type: "选择项目时触发",
          value: "当前选中项",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>