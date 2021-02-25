<style lang="less">
@import "../styles/menu.less";
</style>
<template>
  <div>
    <Menu
      ref="sideMenu"
      accordion
      :active-name="$route.name"
      :open-names="openNames"
      :theme="theme"
      width="auto"
      @on-select="changeMenu"
    >
      <template v-for="item in menuList">
        <!-- 如果是一级菜单并设置了不一直显示 -->
        <template v-if="item.level == '1' && !item.showAlways">
          <MenuItem
            v-if="item.children.length <= 1"
            :name="item.children[0].name"
            :key="'menuitem' + item.name"
          >
            <XIcon
              :type="item.children[0].icon || item.icon"
              :size="iconSize"
              :key="'menuicon' + item.name"
            ></XIcon>
            <span class="content-text" :key="'title' + item.name">{{
              itemTitle(item.children[0])
            }}</span>
          </MenuItem>
          <Submenu
            v-if="item.children.length > 1"
            :name="item.name"
            :key="item.name"
          >
            <template slot="title">
              <XIcon :type="item.icon" :size="iconSize"></XIcon>
              <span class="content-text">{{ itemTitle(item) }}</span>
            </template>
            <template v-for="child in item.children">
              <MenuItem :name="child.name" :key="'menuitem' + child.name">
                <XIcon
                  :type="child.icon"
                  :size="iconSize"
                  :key="'icon' + child.name"
                ></XIcon>
                <span class="content-text" :key="'title' + child.name">{{
                  itemTitle(child)
                }}</span>
              </MenuItem>
            </template>
          </Submenu>
        </template>
        <template v-else>
          <Submenu :name="item.name" :key="item.name">
            <template slot="title">
              <XIcon :type="item.icon" :size="iconSize"></XIcon>
              <span class="content-text">{{ itemTitle(item) }}</span>
            </template>
            <template v-for="child in item.children">
              <MenuItem :name="child.name" :key="'menuitem' + child.name">
                <XIcon
                  :type="child.icon"
                  :size="iconSize"
                  :key="'icon' + child.name"
                ></XIcon>
                <span class="content-text" :key="'title' + child.name">{{
                  itemTitle(child)
                }}</span>
              </MenuItem>
            </template>
          </Submenu>
        </template>
      </template>
    </Menu>
  </div>
</template>

<script>
export default {
  name: "sidebarMenu",
  data() {
    return {};
  },
  props: {
    menuList: Array,
    iconSize: Number,
    theme: {
      type: String,
      default: "darkblue",
    },
    openNames: {
      type: Array,
    },
  },
  methods: {
    changeMenu(active) {
      this.$emit("on-change", active);
    },
    handleSelect(name) {
      this.$emit("on-select", name);
    },
    itemTitle(item) {
      if (typeof item.title == "object") {
        return this.$t(item.title.i18n);
      } else {
        return item.title;
      }
    },
    getOpenedNamesByActiveName(name) {
      return this.$route.matched
        .map((item) => item.name)
        .filter((item) => item !== name);
    },
  },
  updated() {
    this.$nextTick(() => {
      if (this.$refs.sideMenu) {
        this.$refs.sideMenu.updateOpened();
      }
    });
  },
};
</script>
