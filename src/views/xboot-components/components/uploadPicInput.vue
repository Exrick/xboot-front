<template>
  <div>
    <Divider class="component-blue" orientation="left">图片上传输入框</Divider>
    <upload-pic-input v-model="picUrl" style="width: 400px"></upload-pic-input>
    <h3 class="component-article">基础用法</h3>
    基本用法，使用 <code>v-model</code> 实现数据的双向绑定。
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
  </div>
</template>
<script>
import { props, events, methods } from "./columns";
import uploadPicInput from "@/views/my-components/xboot/upload-pic-input";
export default {
  components: {
    uploadPicInput,
  },
  data() {
    return {
      picUrl: "",
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
          name: "accept",
          desc: "接受上传的文件类型，等同<input>标签的accept属性",
          type: "String",
          value: ".jpg, .jpeg, .png, .gif",
        },
        {
          name: "maxSize",
          desc: "单个文件最大限制大小（单位Mb）",
          type: "Number",
          value: "5",
        },
        {
          name: "size",
          desc: "输入框和按钮尺寸，可选值为large、small、default或者不设置",
          type: "String",
          value: "-",
        },
        {
          name: "placeholder",
          desc: "占位文本",
          type: "String",
          value: "可输入图片链接",
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
          desc: "设置输入框最大输入长度",
          type: "Number",
          value: "-",
        },
        {
          name: "icon",
          desc: "设置上传按钮图标",
          type: "String",
          value: "ios-cloud-upload-outline",
        },
        {
          name: "text",
          desc: "设置上传按钮文字",
          type: "String",
          value: "上传图片",
        },
        {
          name: "previewIcon",
          desc: "设置预览图标",
          type: "String",
          value: "md-eye",
        },
        {
          name: "showUpload",
          desc: "是否显示上传按钮",
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
      ],
      data2: [
        {
          name: "on-change",
          type: "返回完整上传图片路径或用户输入的链接",
          value: "value（输入框文本值）",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>