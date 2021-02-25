<template>
  <div>
    <Divider class="component-blue" orientation="left">图片上传缩略图</Divider>
    <upload-pic-thumb multiple v-model="picUrls"></upload-pic-thumb>
    <br />
    <upload-pic-thumb
      v-model="picUrls"
      multiple
      height="100px"
      width="100px"
    ></upload-pic-thumb>
    <br />
    {{ picUrls }}
    <h3 class="component-article">提示</h3>
    可拖拽实现交换图片顺序。可自定义图片框长和宽。
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
import uploadPicThumb from "@/views/my-components/xboot/upload-pic-thumb";
export default {
  components: {
    uploadPicThumb,
  },
  data() {
    return {
      props: props,
      events: events,
      methods: methods,
      picUrls: [
        "https://ooo.0o0.ooo/2019/04/28/5cc5a71a6e3b6.png",
        "https://i.loli.net/2021/01/16/VuODA1yUSCeXzFM.png",
      ],
      data1: [
        {
          name: "value",
          desc:
            "绑定的值，可使用 v-model 双向绑定。单张上传时只接受String，多张上传时只接受Array",
          type: "String | Array",
          value: "空",
        },
        {
          name: "multiple",
          desc: "是否选开启多张上传，默认true开启，设为false仅限制一张",
          type: "Boolean",
          value: "false",
        },
        {
          name: "limit",
          desc:
            "限制上传数量，开启多张上传multiple设为true时生效，默认限制10张",
          type: "Number",
          value: "10",
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
          name: "draggable",
          desc: "是否开启拖拽交换图片顺序（仅开启多张上传时有效）",
          type: "Boolean",
          value: "true",
        },
        {
          name: "width",
          desc: "每个图片框的长度，需带单位如60px",
          type: "String",
          value: "60px",
        },
        {
          name: "height",
          desc: "每个图片框的高度，需带单位如60px",
          type: "String",
          value: "60px",
        },
        {
          name: "preview",
          desc: "是否开启预览模式，开启后仅支持预览，无法上传",
          type: "Boolean",
          value: "false",
        },
      ],
      data2: [
        {
          name: "on-change",
          type: "返回上传成功图片链接",
          value:
            "当开启多张上传时，返回图片链接数组，如['http://1.png','http://2.png']；限制单张时返回单个图片链接，如'http://3.png'",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>