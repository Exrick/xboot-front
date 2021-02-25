<template>
  <div>
    <Divider class="component-blue" orientation="left">地图选点组件</Divider>
    <Alert type="info" show-icon>
      基于
      <a href="https://docs.mapbox.com/mapbox-gl-js/api/" target="_blank"
        >Mapbox GL JS</a
      >
      封装，已配置好中文、属性配置等。为何不选择国内地图产品？-
      国内产品针对非公众项目时需进行商用授权：
      <a href="https://developer.amap.com/upgrade#business" target="_blank"
        >高德</a
      >、
      <a href="http://lbsyun.baidu.com/cashier/auth" target="_blank">百度</a>、
      <a href="https://lbs.qq.com/dev/console/authorization" target="_blank"
        >腾讯</a
      >。 Mapbox按量付费，支持全球国际化地图，每月有一定<a
        href="https://www.mapbox.com/pricing"
        target="_blank"
        >免费额度</a
      >
    </Alert>
    <Map v-model="data" style="width: 400px" />
    <h3 class="component-article">基础用法</h3>
    基本用法，使用<code>v-model</code>实现数据的双向绑定。单页面同时使用两个及以上该组件时，需设定不同的id值加以区分。
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
import Map from "@/views/my-components/xboot/map";
export default {
  components: {
    Map,
  },
  data() {
    return {
      data: "",
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
          name: "id",
          desc:
            "地图组件的id值，用于绑定地图，当同时使用两个及以上该组件时，需设定不同的id值加以区分",
          type: "String",
          value: "map",
        },
        {
          name: "showInput",
          desc: "是否显示输入框",
          type: "Boolean",
          value: "true",
        },
        {
          name: "width",
          desc: "默认地图选点弹框宽度，单位px",
          type: "Number",
          value: "900",
        },
        {
          name: "decimal",
          desc: "坐标精确的小数点位数（0~14位）",
          type: "Number",
          value: "6",
        },
        {
          name: "draggable",
          desc: "标记点是否支持拖拽",
          type: "Boolean",
          value: "true",
        },
        {
          name: "style",
          desc:
            "地图默认样式，详见 https://docs.mapbox.com/mapbox-gl-js/api/map",
          type: "String",
          value: "mapbox://styles/mapbox/streets-v11",
        },
        {
          name: "center",
          desc: "地图默认中心点经纬度，默认经纬度坐标为北京",
          type: "Array",
          value: "[116.35, 39.85]",
        },
        {
          name: "zoom",
          desc: "地图默认缩放级别，0~24",
          type: "Number",
          value: "9",
        },
        {
          name: "pitch",
          desc: "地图的初始俯仰角（倾斜度），0-85度",
          type: "Number",
          value: "0",
        },
        {
          name: "compact",
          desc: "右下角版权信息是否仅显示图标，设为false后自适应界面大小显示",
          type: "Boolean",
          value: "true",
        },
        {
          name: "customAttribution",
          desc: "自定义额外的版权属性信息",
          type: "String",
          value: "空",
        },
        {
          name: "searchable",
          desc: "地图右上角是否显示搜索栏",
          type: "Boolean",
          value: "true",
        },
        {
          name: "changeStyle",
          desc: "地图右上角是否显示切换地图样式按钮",
          type: "Boolean",
          value: "true",
        },
        {
          name: "navigation",
          desc: "地图右上角是否显示缩放及罗盘导航",
          type: "Boolean",
          value: "true",
        },
        {
          name: "locate",
          desc: "地图右上角是否显示定位按钮",
          type: "Boolean",
          value: "true",
        },
        {
          name: "fullscreen",
          desc: "地图右上角是否显示全屏按钮",
          type: "Boolean",
          value: "false",
        },
        {
          name: "building3D",
          desc: "地图中建筑是否显示3D效果",
          type: "Boolean",
          value: "true",
        },
        {
          name: "clearable",
          desc: "输入框是否支持清空",
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
          value: "输入坐标或选择地点",
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
          name: "text",
          desc: "选择按钮文字",
          type: "Number",
          value: "地图选点",
        },
        {
          name: "icon",
          desc: "设置选择按钮图标",
          type: "String",
          value: "md-locate",
        },
      ],
      data2: [
        {
          name: "on-change",
          type: "返回用户在输入框输入编辑或选点后提交的经纬度坐标",
          value: "value",
        },
        {
          name: "on-click",
          type: "返回用户在点击后的经纬度坐标",
          value: "value",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>