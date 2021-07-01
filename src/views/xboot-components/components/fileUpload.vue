<template>
  <div>
    <Divider class="component-blue" orientation="left">文件上传/下载</Divider>
    <file-upload
      multi
      :limit="5"
      v-model="fileInfo"
      style="width: 400px"
    ></file-upload>
    <br />
    {{ fileInfo }}
    <h3 class="component-article">基础用法</h3>
    基本用法，使用
    <code>v-model</code>
    实现数据的双向绑定。<br />绑定值为单个对象或数组（取决于是否选开启多个文件上传）：<code
      >{url: 完整下载链接, name: 文件名, size: 文件大小(单位字节，非必须)}</code
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
  </div>
</template>
<script>
import { props, events, methods } from "./columns";
import fileUpload from "@/views/my-components/xboot/file-upload";
export default {
  components: {
    fileUpload,
  },
  data() {
    return {
      fileInfo: [
        {
          name: "img.png",
          url: "https://ooo.0o0.ooo/2019/04/28/5cc5a71a6e3b6.png",
        },
        {
          name: "video.mp4",
          size: 51 * 1024 * 1024,
          url: "https://ooo.0o0.ooo/2021/01/16/VuODA1yUSCeXzFM.png",
        },
      ],
      props: props,
      events: events,
      methods: methods,
      data1: [
        {
          name: "value",
          desc:
            "绑定的对象Object或数组Array，可使用 v-model 双向绑定。默认单个上传时只接受单个对象，多个上传时只接受数组",
          type: "Object | Array",
          value: "-",
        },
        {
          name: "multi",
          desc: "是否选开启多个文件上传，默认false",
          type: "Boolean",
          value: "false",
        },
        {
          name: "accept",
          desc: "接受上传的文件类型，等同<input>标签的accept属性",
          type: "String",
          value: "空",
        },
        {
          name: "maxSize",
          desc: "单个文件最大限制大小（单位Mb）",
          type: "Number",
          value: "5",
        },
        {
          name: "limit",
          desc:
            "限制上传文件数量，开启多个上传multiple设为true时生效，默认限制10个",
          type: "Number",
          value: "10",
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
          value: "上传文件",
        },
        {
          name: "showUpload",
          desc: "是否显示上传按钮（仅允许用户下载时使用）",
          type: "Boolean",
          value: "true",
        },
        {
          name: "noDataText",
          desc: "不显示上传按钮时若没有文件显示的文字",
          type: "String",
          value: "暂无数据",
        },
        {
          name: "showTip",
          desc: "当文件大小较大时是否显示提示框提醒用户",
          type: "Boolean",
          value: "true",
        },
        {
          name: "tipSize",
          desc: "当文件超过多少MB时显示文件大小较大提示框（单位：MB）",
          type: "Number",
          value: "50",
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
          name: "disabled",
          desc: "设置输入框和上传按钮为禁用状态",
          type: "Boolean",
          value: "false",
        },
      ],
      data2: [
        {
          name: "on-change",
          type: "返回上传成功文件对象信息",
          value:
            "默认单个文件上传时返回单个文件对象Object：{url: 完整下载链接, name: 文件名, size: 文件大小(单位字节)}；" +
            "当开启多个上传时，返回多个文件对象数组Array：[{url: 完整下载链接, name: 文件名, size: 文件大小(单位字节)}]",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>