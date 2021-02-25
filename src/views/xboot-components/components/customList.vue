<template>
  <div>
    <Divider class="component-blue" orientation="left">自定义列表选择</Divider>
    <div style="font-size: 12px; margin-bottom: 10px">
      获取用户列表示例（请求地址url="/user/getAll"
      指定绑定的value字段valueBind="id" 指定标题字段title="nickname"
      指定备注字段description="username"）：
    </div>
    <code>{{ customList1 }}</code>
    <br />
    <br />
    <div style="font-size: 12px; margin-bottom: 10px">
      获取角色列表示例（请求地址url="/role/getAllList"
      指定绑定的value字段valueBind="name" 指定标题字段title="name"
      指定备注字段description="description"）：
    </div>
    <customList
      v-model="customList2"
      url="/role/getAllList"
      valueBind="name"
      title="name"
      style="width: 300px; display: inline-block; margin-right: 10px"
    />
    {{ customList2 }}
    <br />
    <h3 class="component-article">基础用法</h3>
    基本用法，传入
    <code>请求url</code
    >、<code>绑定值valueBind</code>、<code>标题title</code>、<code>备注description(可选)</code>属性获取指定接口数据，
    使用 <code>v-model</code> 实现数据的双向绑定。
    <h3 class="component-article">数据结构</h3>
    列表接口返回的数据结构需满足XBoot框架的规范，至少包含
    <code>success</code>（成功标志）与 <code>result</code>（数据列表）：
    <code>{ success: true/false, result: [] }</code>
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
import customList from "@/views/my-components/xboot/custom-list";
export default {
  components: {
    customList,
  },
  data() {
    return {
      customList1:
        '<customList v-model="data" url="/user/getAll" valueBind="id" title="nickname" description="username"/>',
      customList2: "",
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
          name: "preUrl",
          desc: "请求地址url前缀，由preUrl+url构成完整请求url",
          type: "String",
          value: "/xboot",
        },
        {
          name: "url",
          desc: "请求地址url，由preUrl+url构成完整请求url",
          type: "String",
          value: "-",
        },
        {
          name: "method",
          desc: "请求方法，如get、post、put、delete等",
          type: "String",
          value: "get",
        },
        {
          name: "auth",
          desc:
            "是否需要认证的请求，设为true后请求头会携带认证使用的accessToken",
          type: "Boolean",
          value: "true",
        },
        {
          name: "valueBind",
          desc: "指定绑定的value字段",
          type: "String",
          value: "id",
        },
        {
          name: "title",
          desc: "指定标题title的字段",
          type: "String",
          value: "title",
        },
        {
          name: "description",
          desc: "指定备注描述description的字段",
          type: "String",
          value: "description",
        },
        {
          name: "size",
          desc: "选择框大小，可选值为large、small、default或者不设置",
          type: "String",
          value: "default",
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
    };
  },
  methods: {},
  mounted() {},
};
</script>