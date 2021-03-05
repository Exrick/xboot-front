<template>
  <div class="update-log">
    <div class="title">更新日志</div>
    <Alert type="warning" show-icon
      >说明：大部分组件为包含真实数据接口的封装，方便大家直接使用</Alert
    >
    <Timeline class="timeline">
      <TimelineItem>
        <div class="version">20210305【3.3.3】</div>
        <ul type="circle">
          <li>用户选择相关组件新增mask-style、class-name等属性以便自定义Drawer弹窗层级</li>
          <li>修复文件上传单个为空判断BUG</li>
          <li>wangEditor更新至v4.6.8</li>
        </ul>
      </TimelineItem>
      <TimelineItem>
        <div class="version">20210225【3.3.2】</div>
        <ul type="circle">
          <li>新增基于Mapbox的地图选点组件</li>
          <li>优化富文本编辑器组件编辑代码界面，支持全屏</li>
          <li>代码编辑器组件新增layout方法自动重新布局编辑器宽度，新增showThemeChange是否显示主题切换开关属性配置</li>
        </ul>
      </TimelineItem>
      <TimelineItem>
        <div class="version">20210205【3.3.1】</div>
        <ul type="circle">
          <li>修复部门树组件设置空值不生效BUG</li>
          <li>修复文件上传/下载组件多文件上传回调BUG</li>
          <li>减少用户抽屉选择宽度</li>
          <li>wangEditor更新至4.6.6</li>
        </ul>
      </TimelineItem>
      <TimelineItem>
        <div class="version">20210128【3.3】</div>
        <ul type="circle">
          <li>
            图标选择输入框新增Tab分类选择，新增自定义扩展图标、自定义输入或上传图片
          </li>
          <li>
            新增扩展图标组件XIcon，兼容Ionicons、iconfont、图片链接URL、Base64
          </li>
          <li>自定义列表选择说明文档新增数据结构说明</li>
          <li>用户抽屉选择组件支持v-model用法，可搜索条件增加</li>
          <li>
            用户搜索选择升级为用户搜索+抽屉选择，可配置是否显示抽屉选择按钮
          </li>
          <li>图片上传缩略图组件默认关闭多图上传</li>
          <li>文件上传/下载组件重构，支持选择多文件上传</li>
          <li>
            wangEditor更新至4.6.5，支持视频上传，新增z-index、height和图片视频上传开关属性配置
          </li>
          <li>
            多个组件增加多个属性配置，让开发者自义定更多属性，如按钮大小颜色文字图标等
          </li>
          <li>
            【废弃】即将废弃移除封装的Quill富文本组件，请使用wangEditor组件
          </li>
        </ul>
      </TimelineItem>
    </Timeline>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="less">
.update-log {
  .title {
    font-size: 26px;
    font-weight: 400;
    margin: 0 0 12px 0;
  }
  .timeline {
    margin-top: 20px;
    .version {
      font-size: 20px;
      font-weight: 400;
      margin-bottom: 5px;
    }
    ul {
      margin-left: 22px;
    }
    li {
      margin-bottom: 5px;
    }
  }
  .ivu-timeline-item-content {
    top: -9px;
  }
}
</style>