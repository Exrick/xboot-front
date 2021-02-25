<template>
  <div style="display: inline-block">
    <Dropdown @on-click="handleLanDropdown">
      <div class="header-right-icon header-action">
        <Icon type="md-globe" :size="20" class="language"></Icon>
      </div>
      <DropdownMenu slot="list">
        <DropdownItem name="zh-CN" :selected="currLang == 'zh-CN'"
          ><div class="lan-logo-content">
            <img src="@/assets/icon/chinese.png" class="country-logo" />简体中文
          </div></DropdownItem
        >
        <DropdownItem name="en-US" :selected="currLang == 'en-US'"
          ><div class="lan-logo-content">
            <img src="@/assets/icon/english.png" class="country-logo" />English
          </div></DropdownItem
        >
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  name: "language",
  props: {},
  data() {
    return {
      currLang: "zh-CN",
    };
  },
  methods: {
    handleLanDropdown(name) {
      this.currLang = name;
      this.$i18n.locale = name;
      this.$store.commit("switchLang", name);
    },
  },
  mounted() {
    if (localStorage.lang) {
      this.currLang = localStorage.lang;
    }
  },
};
</script>

<style lang="less" scoped>
.lan-logo-content {
  display: flex;
  align-items: center;
  .country-logo {
    width: 15px;
    margin-right: 8px;
  }
}
</style>