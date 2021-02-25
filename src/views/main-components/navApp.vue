<template>
  <div style="display: inline-block">
    <Dropdown @on-click="selectNav" :placement="placement">
      <div class="header-right-icon header-action" v-if="currType == 'icon'">
        <XIcon type="ios-apps" :size="20"></XIcon>
      </div>
      <div
        :class="`single-nav header-action single-nav-theme-${theme} `"
        v-else
      >
        {{ currNavTitle }}
        <XIcon type="ios-arrow-down" class="single-nav-dropdown-icon"></XIcon>
      </div>
      <DropdownMenu slot="list" v-if="type == 'list'">
        <DropdownItem
          v-for="(item, i) in navList"
          :key="i"
          :name="item.name"
          :selected="currNav == item.name"
        >
          <div>
            <XIcon
              :type="item.icon"
              :size="14"
              style="margin: 0 10px 0 0"
            ></XIcon>
            {{ item.title }}
          </div>
        </DropdownItem>
      </DropdownMenu>
      <div slot="list" v-else>
        <apps :currNav="currNav" :navList="navList" @on-click="selectNav" />
      </div>
    </Dropdown>
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
    currNavTitle: String,
    placement: {
      type: String,
      default: "bottom",
    },
    currType: {
      type: String,
      default: "icon",
    },
    type: {
      type: String,
      default: "app",
    },
    theme: {
      type: String,
      default: "darkblue",
    },
  },
  data() {
    return {};
  },
  methods: {
    selectNav(v) {
      this.$emit("on-click", v);
    },
  },
  watch: {},
};
</script>

<style lang="less">
// 单个下拉导航菜单
.single-nav {
  height: 60px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 15px;

  .single-nav-dropdown-icon {
    margin-left: 5px;
    transition: transform 0.2s ease-in-out;
  }
}

.single-nav:hover {
  .single-nav-dropdown-icon {
    transform: rotate(180deg);
  }
}
</style>