<template>
  <div>
    <Divider class="component-blue" orientation="left">用户搜索+抽屉选择</Divider>
    <div style="font-size: 12px; margin-bottom: 10px">
      显示按钮
    </div>
    <user-select
      v-model="users1"
      multiple
      ref="userSelect"
      style="width: 400px; display: inline-block; margin-right: 10px"
    />{{ users1 }}
    <br />
    <br />
    <div style="font-size: 12px; margin-bottom: 10px">
      不显示按钮
    </div>
    <user-select
      v-model="users2"
      multiple
      :showButton="false"
      ref="userSelect"
      style="width: 400px; display: inline-block; margin-right: 10px"
    />{{ users2 }}
    <br />
    <br />
    <Button @click="setUserData">setData()赋值演示</Button>
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
import userSelect from "@/views/my-components/xboot/user-select";
export default {
  components: {
    userSelect,
  },
  data() {
    return {
      users1: [],
      users2: [],
      props: props,
      events: events,
      methods: methods,
      data1: [
        {
          name: "showButton",
          desc: "是否显示选择用户按钮",
          type: "Boolean",
          value: "true",
        },
        {
          name: "drawerTransfer",
          desc: "是否将抽屉放置于 body 内",
          type: "Boolean",
          value: "true",
        },
        {
          name: "mask-style",
          desc: "遮罩层样式，可改变遮罩层级，如 :mask-style=\"{ zIndex: 1003}\"",
          type: "Object",
          value: "-",
        },
        {
          name: "class-name",
          desc: "设置抽屉容器 .ivu-drawer-wrap 的类名，可自定义类改变抽屉层级，如 :mask-name=\"ivu-drawer-wrap-1\"",
          type: "String",
          value: "-",
        },
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
          desc: "选择框默认文字",
          type: "String",
          value: "请选择",
        },
        {
          name: "notFoundText",
          desc: "当下拉列表为空时显示的内容",
          type: "String",
          value: "无匹配数据",
        },
        {
          name: "labelInValue",
          desc:
            "在返回选项时，是否将 label 和 value 一并返回，默认只返回 value",
          type: "Boolean",
          value: "false",
        },
        {
          name: "placement",
          desc:
            "弹窗的展开方向，可选值为 top、bottom、top-start、bottom-start、top-end、bottom-end",
          type: "String",
          value: "bottom-start",
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
          name: "filterable",
          desc: "是否支持搜索",
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
          name: "transferClassName",
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
          name: "maxTagCount",
          desc: "多选时最多显示多少个 tag",
          type: "Number",
          value: "-",
        },
        {
          name: "maxTagPlaceholder",
          desc: "隐藏 tag 时显示的内容，参数是剩余项数量",
          type: "Function",
          value: "-",
        },
        {
          name: "clearable",
          desc: "是否可以清空选项，只在单选时有效",
          type: "Boolean",
          value: "true",
        },
      ],
      data2: [
        {
          name: "on-change",
          type:
            "选中的Option变化时触发，默认返回 value，如需返回 label，详见 label-in-value 属性",
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
      data3: [
        {
          name: "setData",
          type: "设置已选用户数据（回显使用）",
          value:
            '单个用户对象或用户数组，需包含用户id、nickname和username，例如 [{"id":"1", nickname: "昵称", "username":"账号"}]',
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
  methods: {
    setUserData() {
      this.$refs.userSelect.setData([
        {
          id: "682265633886208",
          nickname: "管理员",
          username: "admin",
        },
      ]);
    },
  },
  mounted() {},
};
</script>