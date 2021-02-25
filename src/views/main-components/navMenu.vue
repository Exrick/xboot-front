<template>
  <div style="display: inline-block">
    <Menu
      :theme="theme"
      mode="horizontal"
      :active-name="currNav"
      @on-select="selectNav"
    >
      <MenuItem
        v-for="(item, i) in navList.slice(0, sliceNum)"
        :key="i"
        :name="item.name"
      >
        <XIcon :type="item.icon" v-if="showIcon" />
        {{ item.title }}
      </MenuItem>
      <Submenu name="sub" v-if="navList.length > sliceNum">
        <template slot="title">更多</template>
        <MenuItem
          v-for="(item, i) in navList.slice(sliceNum, navList.length)"
          :key="i"
          :name="item.name"
        >
          <XIcon :type="item.icon" v-if="showIcon" />
          {{ item.title }}
        </MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
import apps from "./apps";
export default {
  name: "nav-app",
  components: {
    apps,
  },
  props: {
    navList: Array,
    currNav: String,
    showIcon: {
      type: Boolean,
      default: true,
    },
    sliceNum: {
      type: Number,
      default: 3,
    },
    theme: {
      type: String,
      default: "light",
    },
  },
  data() {
    return {};
  },
  methods: {
    init() {},
    selectNav(v) {
      this.$emit("on-click", v);
    },
  },
  mounted() {
    this.init();
  },
  watch: {},
};
</script>

<style lang="less">
</style>