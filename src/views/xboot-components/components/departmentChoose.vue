<template>
  <div>
    <Divider class="component-blue" orientation="left">部门级联选择</Divider>
    <department-choose
      style="width: 300px"
      @on-change="handleSelectDep"
      ref="dep"
    ></department-choose>
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
import departmentChoose from "@/views/my-components/xboot/department-choose";
export default {
  components: {
    departmentChoose,
  },
  data() {
    return {
      props: props,
      events: events,
      methods: methods,
      data1: [
        {
          name: "size",
          desc: "选择框大小，可选值为large、small、default或者不设置",
          type: "String",
          value: "default",
        },
        {
          name: "placeholder",
          desc: "提示文字",
          type: "String",
          value: "点击选择部门",
        },
        {
          name: "filterable",
          desc: "是否支持搜索",
          type: "Boolean",
          value: "true",
        },
        {
          name: "clearable",
          desc: "请选择或输入搜索部门",
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
      ],
      data2: [
        {
          name: "on-change",
          type: "返回点击部门ID",
          value: "value（点击部门ID）",
        },
        {
          name: "on-visible-change",
          type: "展开和关闭弹窗时触发",
          value: "显示状态，Boolean",
        },
      ],
      data3: [
        {
          name: "clearSelect",
          type: "清空已选数据",
          value: "无",
        },
      ],
    };
  },
  methods: {
    handleSelectDep(v) {
      if (v) {
        this.$Message.info(`所选部门ID为 ${v}`);
      }
    },
  },
  mounted() {},
};
</script>