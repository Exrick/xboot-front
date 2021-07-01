<template>
  <div>
    <Divider class="component-blue" orientation="left">扩展图标XIcon</Divider>
    <div style="font-size: 12px; margin-bottom: 10px">Ionicons：</div>
    <XIcon type="md-ionic" size="26" />
    <div style="font-size: 12px; margin: 10px 0">iconfont：</div>
    <XIcon type="iconfont icon-github" size="26" />
    <div style="font-size: 12px; margin: 10px 0">URL：</div>
    <XIcon type="https://ooo.0o0.ooo/2019/04/28/5cc5a71a6e3b6.png" size="30" />
    <div style="font-size: 12px; margin: 10px 0">Base64：</div>
    <XIcon :type="base64" size="26" />
    <h3 class="component-article">基础用法</h3>
    基本用法，已全局挂载直接使用即可，兼容Ionicons、iconfont、图片链接URL、Base64。<code
      >{{ code }}</code
    >
    <h3 class="component-article">props</h3>
    <Table
      :columns="props"
      :data="data1"
      border
      size="small"
      width="1000"
    ></Table>
  </div>
</template>
<script>
import { props, events, methods } from "./columns";
export default {
  components: {},
  data() {
    return {
      code: '<XIcon type="图标名/URL/Base64" />',
      base64:
        "data:image/png;base64,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",
      props: props,
      events: events,
      methods: methods,
      data1: [
        {
          name: "type",
          desc: "Ionicons或iconfont图标的名称/图片链接URL/Base64",
          type: "String",
          value: "-",
        },
        {
          name: "size",
          desc: "图标的大小，单位是 px",
          type: "Number | String",
          value: "-",
        },
        {
          name: "color",
          desc: "图标的颜色（当传入图片时无效）",
          type: "String",
          value: "-",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>