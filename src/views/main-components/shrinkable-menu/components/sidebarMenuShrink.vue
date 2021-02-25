<template>
  <div>
    <template v-for="(item, index) in menuList">
      <div :class="`shrink-menu-content shrink-menu-icon-${theme}`" :key="index">
        <Dropdown
          v-if="item.children.length != 1"
          placement="right-start"
          :key="index"
          @on-click="changeMenu"
        >
          <div
            class="shrink-icon"
            :class="{ 'active': item.name == openNames[0] }"
          >
            <XIcon :size="20" :type="item.icon"></XIcon>
          </div>
          <DropdownMenu style="width: 200px" slot="list">
            <DropdownItem
              :name="child.name"
              :key="i"
              v-for="(child, i) in item.children"
              :selected="$route.name == child.name"
            >
              <XIcon :type="child.icon"></XIcon>
              <span style="padding-left: 10px">{{ itemTitle(child) }}</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown
          v-else
          placement="right-start"
          :key="index"
          @on-click="changeMenu"
        >
          <Tooltip :content="item.title" placement="right">
            <div
              @click="changeMenu(item.children[0].name)"
              class="shrink-icon"
              :class="{ 'active': item.name == openNames[0] }"
            >
              <XIcon
                :size="20"
                :type="item.children[0].icon || item.icon"
              ></XIcon>
            </div>
          </Tooltip>
        </Dropdown>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "sidebarMenuShrink",
  props: {
    menuList: {
      type: Array,
    },
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
    itemTitle(item) {
      if (typeof item.title == "object") {
        return this.$t(item.title.i18n);
      } else {
        return item.title;
      }
    },
  },
};
</script>
