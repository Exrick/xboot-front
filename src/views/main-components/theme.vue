<template>
  <div style="display: inline-block">
    <div @click="visible = true" class="header-right-icon header-action">
      <Icon type="md-more" size="20" />
    </div>

    <Drawer :title="$t('themeTitle')" v-model="visible" width="300">
      <div class="theme-setting">
        <div class="theme-item-content">
          <h3 class="title">{{ $t("wholeSetting") }}</h3>
          <div class="checkbox-content">
            <Tooltip transfer placement="top" :content="$t('lightblue')">
              <div
                class="checkbox-item checkbox-item-primary"
                @click="changeMainTheme('primary')"
              >
                <Icon
                  type="md-checkmark"
                  class="checkbox-select-icon"
                  v-if="mainTheme == 'primary'"
                />
              </div>
            </Tooltip>
            <Tooltip placement="top" :content="$t('white')">
              <div
                class="checkbox-item checkbox-item-light"
                @click="changeMainTheme('light')"
              >
                <Icon
                  type="md-checkmark"
                  class="checkbox-select-icon"
                  v-if="mainTheme == 'light'"
                />
              </div>
            </Tooltip>
            <Tooltip placement="top" :content="$t('topNav')">
              <div
                class="checkbox-item checkbox-item-nav-black checkbox-item-nav"
                @click="changeMainTheme('topNav')"
              >
                <Icon
                  type="md-checkmark"
                  class="checkbox-select-icon"
                  v-if="mainTheme == 'topNav'"
                />
              </div>
            </Tooltip>
            <Tooltip placement="top" :content="$t('darkMode')">
              <div
                class="checkbox-item checkbox-item-darkMode"
                @click="changeMainTheme('darkMode')"
              >
                <Icon
                  type="md-checkmark"
                  class="checkbox-select-icon"
                  color="#177ddc"
                  v-if="mainTheme == 'darkMode'"
                />
              </div>
            </Tooltip>
          </div>
        </div>
        <Divider />
        <div class="theme-item-content">
          <h3 class="title">{{ $t("sideMenu") }}</h3>
          <div class="checkbox-content">
            <Tooltip transfer placement="top" :content="$t('darkblue')">
              <div
                class="checkbox-item checkbox-item-darkblue"
                @click="changeMenuTheme('darkblue')"
              >
                <Icon
                  type="md-checkmark"
                  class="checkbox-select-icon"
                  v-if="menuTheme == 'darkblue'"
                />
              </div>
            </Tooltip>
            <Tooltip placement="top" :content="$t('dark')">
              <div
                class="checkbox-item checkbox-item-black"
                @click="changeMenuTheme('black')"
              >
                <Icon
                  type="md-checkmark"
                  class="checkbox-select-icon"
                  v-if="menuTheme == 'black'"
                />
              </div>
            </Tooltip>
            <Tooltip placement="top" :content="$t('middle')">
              <div
                class="checkbox-item checkbox-item-dark"
                @click="changeMenuTheme('dark')"
              >
                <Icon
                  type="md-checkmark"
                  class="checkbox-select-icon"
                  v-if="menuTheme == 'dark'"
                />
              </div>
            </Tooltip>
            <Tooltip placement="top" :content="$t('white')">
              <div
                class="checkbox-item checkbox-item-side-light"
                @click="changeMenuTheme('light')"
              >
                <Icon
                  type="md-checkmark"
                  class="checkbox-select-icon"
                  v-if="menuTheme == 'light'"
                />
              </div>
            </Tooltip>
          </div>
        </div>
        <div class="theme-item-content">
          <h3 class="title">{{ $t("navMenu") }}</h3>
          <div class="checkbox-content">
            <Tooltip transfer placement="top" :content="$t('darkblue')">
              <div
                class="checkbox-item checkbox-item-nav-darkblue checkbox-item-nav"
                @click="changeNavTheme('darkblue')"
              >
                <Icon
                  type="md-checkmark"
                  class="checkbox-select-icon"
                  v-if="navTheme == 'darkblue'"
                />
              </div>
            </Tooltip>
            <Tooltip placement="top" :content="$t('dark')">
              <div
                class="checkbox-item checkbox-item-nav-black checkbox-item-nav"
                @click="changeNavTheme('black')"
              >
                <Icon
                  type="md-checkmark"
                  class="checkbox-select-icon"
                  v-if="navTheme == 'black'"
                />
              </div>
            </Tooltip>
            <Tooltip placement="top" :content="$t('lightblue')">
              <div
                class="checkbox-item checkbox-item-nav-primary checkbox-item-nav"
                @click="changeNavTheme('primary')"
              >
                <Icon
                  type="md-checkmark"
                  class="checkbox-select-icon"
                  v-if="navTheme == 'primary'"
                />
              </div>
            </Tooltip>
            <Tooltip placement="top" :content="$t('white')">
              <div
                class="checkbox-item checkbox-item-nav-light checkbox-item-nav"
                @click="changeNavTheme('light')"
              >
                <Icon
                  type="md-checkmark"
                  class="checkbox-select-icon"
                  v-if="navTheme == 'light'"
                />
              </div>
            </Tooltip>
          </div>
        </div>
        <Divider />
        <div style="margin-bottom: 24px">
          <h3 class="title">{{ $t("navMode") }}</h3>
          <div class="checkbox-content">
            <Tooltip transfer placement="top" :content="$t('rightTop')">
              <div
                class="checkbox-item checkbox-item-topright checkbox-layout-item"
                @click="changeFixNav(false)"
              >
                <Icon
                  type="md-checkmark"
                  class="checkbox-select-icon"
                  v-if="!fixNav"
                />
              </div>
            </Tooltip>
            <Tooltip placement="top" :content="$t('topFix')">
              <div
                class="checkbox-item checkbox-item-top checkbox-layout-item"
                @click="changeFixNav(true)"
              >
                <Icon
                  type="md-checkmark"
                  class="checkbox-select-icon"
                  v-if="fixNav"
                />
              </div>
            </Tooltip>
          </div>
          <div class="theme-list">
            <div class="theme-list-item">
              <div class="item-title">{{ $t("navType") }}</div>
              <Select
                :value="navType"
                @on-change="changeNavType"
                style="width: 150px"
                size="small"
              >
                <Option value="1">{{ $t("horizontal") }}</Option>
                <Option value="2">{{ $t("singleDrop") }}</Option>
                <Option value="3">{{ $t("iconBreadcrumb") }}</Option>
              </Select>
            </div>
            <div class="theme-list-item" v-if="navType == 1">
              <div class="item-title">{{ $t("showIcon") }}</div>
              <i-switch
                :value="showNavMenuIcon"
                @on-change="changeShowNavMenuIcon"
                size="small"
              />
            </div>
            <div class="theme-list-item" v-if="navType == 2 || navType == 3">
              <div class="item-title">{{ $t("dropMenu") }}</div>
              <Select
                :value="navShowType"
                @on-change="changeNavShowType"
                style="width: 150px"
                size="small"
              >
                <Option value="app">{{ $t("appStyle") }}</Option>
                <Option value="list">{{ $t("listStyle") }}</Option>
              </Select>
            </div>
          </div>
        </div>
        <Divider />
        <div style="margin-bottom: 24px">
          <h3 class="title">{{ $t("contentArea") }}</h3>
          <div class="theme-list">
            <div class="theme-list-item">
              <div class="item-title">{{ $t("enableTags") }}</div>
              <i-switch
                :value="showTags"
                @on-change="changeShowTags"
                size="small"
              />
            </div>
            <div class="theme-list-item">
              <div class="item-title">{{ $t("showFold") }}</div>
              <i-switch
                :value="showFold"
                @on-change="changeShowFold"
                size="small"
              />
            </div>
            <div class="theme-list-item">
              <div class="item-title">{{ $t("showLogo") }}</div>
              <i-switch
                :value="showLogo"
                @on-change="changeShowLogo"
                size="small"
              />
            </div>
            <div class="theme-list-item">
              <div class="item-title">{{ $t("showSearchMenu") }}</div>
              <i-switch
                :value="showSearch"
                @on-change="changeShowSearch"
                size="small"
              />
            </div>
            <div class="theme-list-item">
              <div class="item-title">{{ $t("showFooter") }}</div>
              <i-switch
                :value="showFooter"
                @on-change="changeShowFooter"
                size="small"
              />
            </div>
            <div class="theme-list-item">
              <div class="item-title">{{ $t("sideMenuWidth") }}（px）</div>
              <InputNumber
                :min="0"
                :max="500"
                :value="menuWidth"
                style="width: 100px"
                size="small"
                @on-change="changeMenuWidth"
              />
            </div>
          </div>
        </div>
        <Divider />
        <div style="margin-bottom: 24px">
          <h3 class="title">{{ $t("otherSetting") }}</h3>
          <div class="theme-list">
            <div class="theme-list-item">
              <div class="item-title">{{ $t("weakMode") }}</div>
              <i-switch
                :value="weakMode"
                @on-change="changeWeakMode"
                size="small"
              />
            </div>
          </div>
        </div>
        <Alert type="warning" show-icon>{{ $t("themeInfo") }}</Alert>
      </div>
    </Drawer>
  </div>
</template>

<script>
export default {
  name: "theme",
  props: {},
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    mainTheme() {
      return this.$store.state.theme.theme.mainTheme;
    },
    menuTheme() {
      return this.$store.state.theme.theme.menuTheme;
    },
    navTheme() {
      return this.$store.state.theme.theme.navTheme;
    },
    menuWidth() {
      return this.$store.state.theme.theme.menuWidth;
    },
    fixNav() {
      return this.$store.state.theme.theme.fixNav;
    },
    navType() {
      return this.$store.state.theme.theme.navType;
    },
    showTags() {
      return this.$store.state.theme.theme.showTags;
    },
    showNavMenuIcon() {
      return this.$store.state.theme.theme.showNavMenuIcon;
    },
    navShowType() {
      return this.$store.state.theme.theme.navShowType;
    },
    showFold() {
      return this.$store.state.theme.theme.showFold;
    },
    showLogo() {
      return this.$store.state.theme.theme.showLogo;
    },
    showSearch() {
      return this.$store.state.theme.theme.showSearch;
    },
    showFooter() {
      return this.$store.state.theme.theme.showFooter;
    },
    weakMode() {
      return this.$store.state.theme.theme.weakMode;
    },
  },
  methods: {
    changeMainTheme(v) {
      this.$store.commit("setMainTheme", v);
      if (v == "primary") {
        this.$store.commit("setMenuTheme", "light");
        this.$store.commit("setNavTheme", "primary");
        this.$store.commit("setFixNav", true);
        this.$store.commit("setShowTags", true);
        this.$store.commit("setMenuWidth", 220);
      } else if (v == "light") {
        this.$store.commit("setMenuTheme", "light");
        this.$store.commit("setNavTheme", "light");
        this.$store.commit("setFixNav", false);
        this.$store.commit("setShowTags", true);
        this.$store.commit("setMenuWidth", 220);
      } else if (v == "darkMode") {
        this.$store.commit("setMenuTheme", "light");
        this.$store.commit("setNavTheme", "light");
      } else if (v == "topNav") {
        this.$store.commit("setMenuTheme", "black");
        this.$store.commit("setNavTheme", "black");
        this.$store.commit("setFixNav", true);
        this.$store.commit("setShowTags", false);
        this.$store.commit("setMenuWidth", 0);
      }
    },
    changeMenuTheme(v) {
      this.$store.commit("setMenuTheme", v);
    },
    changeNavTheme(v) {
      this.$store.commit("setNavTheme", v);
    },
    changeFixNav(v) {
      this.$store.commit("setFixNav", v);
    },
    changeNavType(v) {
      this.$store.commit("setNavType", v);
    },
    changeShowNavMenuIcon(v) {
      this.$store.commit("setShowNavMenuIcon", v);
    },
    changeNavShowType(v) {
      this.$store.commit("setNavShowType", v);
    },
    changeNavShowType(v) {
      this.$store.commit("setNavShowType", v);
    },
    changeShowTags(v) {
      this.$store.commit("setShowTags", v);
    },
    changeShowFold(v) {
      this.$store.commit("setShowFold", v);
    },
    changeShowLogo(v) {
      this.$store.commit("setShowLogo", v);
    },
    changeShowSearch(v) {
      this.$store.commit("setShowSearch", v);
    },
    changeShowFooter(v) {
      this.$store.commit("setShowFooter", v);
    },
    changeMenuWidth(v) {
      this.$store.commit("setMenuWidth", v);
    },
    changeWeakMode(v) {
      if (v) {
        this.$store.commit("setMainTheme", "weakMode");
      } else {
        this.$store.commit("setMainTheme", "");
      }
    },
  },
  watch: {},
};
</script>

<style lang="less">
.theme-setting {
  .theme-item-content {
    margin-bottom: 8px;
  }
  .title {
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 22px;
  }
  .checkbox-content {
    display: flex;
    flex-wrap: wrap;
    min-height: 42px;
  }
  .checkbox-item {
    position: relative;
    width: 44px;
    height: 36px;
    margin: 0 16px 16px 0;
    overflow: hidden;
    background-color: #f0f2f5;
    border-radius: 4px;
    box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.18);
    cursor: pointer;
  }
  .checkbox-select-icon {
    position: absolute;
    right: 5px;
    bottom: 2px;
    color: #1890ff;
    font-weight: 700;
    font-size: 16px;
    pointer-events: none;
  }
  .checkbox-item:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 33%;
    height: 100%;
    background-color: #fff;
    content: "";
  }
  .checkbox-item:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 25%;
    background-color: #fff;
    content: "";
  }
  // light
  .checkbox-item-light:before {
    background-color: #fff;
  }
  .checkbox-item-light:after {
    background-color: #fff;
  }
  .checkbox-item-primary:after {
    background-color: #2d8cf0;
  }
  // darkblue
  .checkbox-item-darkblue:before {
    z-index: 1;
    background-color: #002b88;
  }
  // black
  .checkbox-item-black:before {
    z-index: 1;
    background-color: #1f1f1f;
  }
  // dark
  .checkbox-item-dark:before {
    z-index: 1;
    background-color: rgb(81, 90, 110);
  }
  // 暗黑
  .checkbox-item-darkMode {
    background-color: rgba(0, 21, 41, 0.85);
  }
  .checkbox-item-darkMode:before {
    background-color: rgba(0, 21, 41, 0.65);
  }
  .checkbox-item-darkMode:after {
    background-color: rgba(0, 21, 41, 0.85);
  }
  // topright
  .checkbox-item-topright:before {
    z-index: 1;
    background-color: #fff;
  }
  .checkbox-item-topright:after {
    background-color: #001529;
  }
  // top
  .checkbox-item-top:after {
    background-color: #001529;
  }
  // side-light
  .checkbox-item-side-light {
    background-color: #f0f2f5;
  }
  .checkbox-item-side-light:before {
    z-index: 1;
    background-color: #fff;
  }
  .checkbox-item-side-light:after {
    background-color: #f0f2f5;
  }
  // nav
  .checkbox-item-nav:before {
    background-color: #f0f2f5;
  }
  // nav-light
  .checkbox-item-nav-light:after {
    z-index: 1;
    background-color: #fff;
  }
  // nav-darkblue
  .checkbox-item-nav-darkblue:after {
    z-index: 1;
    background-color: #002b88;
  }
  // nav-black
  .checkbox-item-nav-black:after {
    z-index: 1;
    background-color: #1f1f1f;
  }
  // nav-primary
  .checkbox-item-nav-primary:after {
    z-index: 1;
    background-color: #2d8cf0;
  }
  .theme-list {
    display: flex;
    flex-direction: column;
    .theme-list-item {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item-title {
      }
    }
  }
  .ivu-divider-horizontal {
    margin: 16px 0;
  }
  .ivu-alert-with-icon {
    padding: 8px 10px 8px 38px;
  }
}
</style>