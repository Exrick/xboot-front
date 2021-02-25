<template>
  <div class="lang-icon">
    <Dropdown transfer @on-click="langChange">
      <Icon type="md-globe" size="26" />
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
  name: "langSwitch",
  data() {
    return {
      currLang: "zh-CN",
    };
  },
  methods: {
    langChange(v) {
      this.currLang = v;
      this.$i18n.locale = v;
      this.$store.commit("switchLang", v);
    },
  },
  mounted() {
    if (localStorage.lang) {
      this.currLang = localStorage.lang;
    }
  },
};
</script>

<style lang="less">
.lang-icon {
  position: fixed;
  top: 2vh;
  right: 1.5vw;
  cursor: pointer;
}
.lan-logo-content {
  display: flex;
  align-items: center;
  .country-logo {
    width: 15px;
    margin-right: 8px;
  }
}
</style>
