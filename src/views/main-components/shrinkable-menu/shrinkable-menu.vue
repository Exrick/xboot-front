<style lang="less">
@import "./styles/menu.less";
</style>

<template>
  <div
    :style="{ background: bgColor }"
    :class="`shrinkable-menu ${theme}-menu`"
  >
    <slot name="top"></slot>
    <sidebar-menu
      v-show="!shrink"
      :theme="theme"
      :menu-list="menuList"
      :open-names="openNames"
      @on-change="handleChange"
    ></sidebar-menu>
    <sidebar-menu-shrink
      v-show="shrink"
      :theme="theme"
      :menu-list="menuList"
      :open-names="openNames"
      @on-change="handleChange"
    ></sidebar-menu-shrink>
  </div>
</template>

<script>
import sidebarMenu from "./components/sidebarMenu.vue";
import sidebarMenuShrink from "./components/sidebarMenuShrink.vue";
export default {
  name: "shrinkableMenu",
  components: {
    sidebarMenu,
    sidebarMenuShrink,
  },
  props: {
    shrink: {
      type: Boolean,
      default: false,
    },
    menuList: {
      type: Array,
      required: true,
    },
    theme: {
      type: String,
      default: "darkblue",
    },
    beforePush: {
      type: Function,
    },
  },
  data() {
    return {
      openNames: [],
    };
  },
  computed: {
    bgColor() {
      if (this.theme == "darkblue") {
        return "#17233d";
      } else if (this.theme == "dark") {
        return "#515a6e";
      } else if (this.theme == "black") {
        return "#1f1f1f";
      }
      return "#fff";
    },
  },
  methods: {
    handleChange(name) {
      let willpush = true;
      if (this.beforePush !== undefined) {
        if (!this.beforePush(name)) {
          willpush = false;
        }
      }
      if (name == this.$route.name) {
        willpush = false;
      }
      if (willpush) {
        this.$router.push({
          name: name,
        });
      }
      this.$emit("on-change", name);
    },
  },
  watch: {
    // 监听路由变化
    $route(to, from) {
      this.openNames = [this.$route.matched[0].name];
    },
  },
  mounted() {
    this.openNames = [this.$route.matched[0].name];
  },
};
</script>
