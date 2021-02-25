<template>
  <i style="display: inline-block">
    <Icon
      v-if="checkIcon(type) == 'icon'"
      :type="type"
      :size="size"
      :color="color"
    />
    <Icon
      v-if="checkIcon(type) == 'iconfont'"
      :custom="type"
      :size="size"
      :color="color"
    />
    <img
      v-if="checkIcon(type) == 'link'"
      :src="type"
      :width="size + 'px'"
      :height="size + 'px'"
      style="vertical-align: -0.125em"
    />
  </i>
</template>

<script>
export default {
  name: "x-icon",
  props: {
    type: String,
    size: {
      type: [Number, String],
      default: 14,
    },
    color: String,
  },
  data() {
    return {};
  },
  methods: {
    checkIcon(v) {
      if (!v) {
        return "null";
      }
      if (
        v.indexOf("http://") == 0 ||
        v.indexOf("https://") == 0 ||
        v.indexOf(";base64,") > 0
      ) {
        return "link";
      } else if (v.indexOf("iconfont") > -1) {
        return "iconfont";
      } else {
        return "icon";
      }
    },
  },
  watch: {},
  mounted() {},
};
</script>

