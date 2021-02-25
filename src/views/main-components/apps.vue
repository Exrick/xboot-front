<template>
  <div class="nav-app">
    <div
      :class="{
        'nav-item': currNav != item.name,
        'nav-item active': currNav == item.name,
      }"
      v-for="(item, i) in navList"
      :key="i"
      :name="item.name"
      @click="selectNav(item.name)"
    >
      <XIcon :type="item.icon" size="24"></XIcon>
      <div class="nav-title-wrap">
        <div class="nav-title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "apps",
  props: {
    navList: Array,
    currNav: String,
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
.nav-app {
  padding: 3px 8px;
  min-height: 94px;
  width: 320px;
  display: flex;
  flex-wrap: wrap;
  .nav-item {
    width: 101.33px;
    height: 94px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s ease-in-out;
    padding: 15px 0 9px;
    color: #515a6e;
    .nav-title-wrap {
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      .nav-title {
        font-size: 13px;
        width: 90px;
        text-align: center;
        margin-top: 9px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    &:hover {
      color: #2d8cf0;
      border-color: #eff2f7;
      .nav-title-wrap {
        .nav-title {
          overflow: visible;
          text-overflow: unset;
          white-space: unset;
        }
      }
    }
  }
  .active {
    background: #f0faff;
    color: #2d8cf0;
  }
}
</style>