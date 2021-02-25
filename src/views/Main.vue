<style lang="less">
@import "./main.less";
</style>

<template>
  <div class="main" :class="{ 'main-hide-text': shrink }">
    <!-- 左侧菜单 -->
    <div
      :class="`sidebar-menu-content side-bar-menu-theme-${menuTheme}`"
      :style="{
        width: shrink ? '60px' : menuWidth + 'px',
        overflow: shrink ? 'visible' : 'auto',
      }"
    >
      <shrinkable-menu
        :shrink="shrink"
        @on-change="handleSubmenuChange"
        :theme="menuTheme"
        :before-push="beforePush"
        :menu-list="menuList"
      >
        <div slot="top" class="logo-content" v-if="showLogo || fixNav">
          <img
            v-show="
              !shrink && (menuTheme != 'light' || mainTheme == 'darkMode')
            "
            src="@/assets/logo-white.png"
          />
          <img
            v-show="!shrink && menuTheme == 'light' && mainTheme != 'darkMode'"
            src="@/assets/logo-black.png"
          />
          <img v-show="shrink" src="@/assets/logo-min.png" key="min-logo" />
        </div>
      </shrinkable-menu>
    </div>
    <!-- 右上顶部导航条 -->
    <div
      :class="`main-header-content fix-nav-${fixNav}`"
      :style="{
        paddingLeft: navPaddingLeft,
      }"
    >
      <div :class="`main-header header-theme-${navTheme}`">
        <div class="header-left">
          <!-- 固定图标 -->
          <div v-if="fixNav && showLogo" style="width: 220px" class="fix-logo">
            <img
              src="@/assets/logo-black.png"
              v-if="navTheme == 'light' && mainTheme != 'darkMode'"
            />
            <img src="@/assets/logo-white.png" key="max-logo" v-else />
          </div>
          <!-- 收缩图标 -->
          <div
            class="header-navicon-content header-action"
            @click="toggleClick"
            v-if="showFold"
          >
            <Icon
              custom="iconfont icon-menu-unfold"
              size="20"
              v-show="this.shrink"
            />
            <Icon
              custom="iconfont icon-menu-fold"
              size="20"
              v-show="!this.shrink"
            />
          </div>
          <div class="header-middle-content">
            <!-- 顶部菜单 -->
            <div v-if="navType == 1">
              <navMenu
                :theme="navTheme"
                :currNav="currNav"
                :navList="navList"
                @on-click="selectNav"
                :sliceNum="sliceNum"
                :showIcon="showNavMenuIcon"
              />
            </div>
            <!-- 下拉菜单 -->
            <div v-if="navType == 2">
              <navApp
                currType="tabs"
                placement="bottom-start"
                :currNavTitle="currNavTitle"
                :currNav="currNav"
                :navList="navList"
                :type="navShowType"
                :theme="navTheme"
                @on-click="selectNav"
              />
            </div>
            <!-- 面包导航 -->
            <div class="main-breadcrumb" v-if="navType == 3">
              <breadcrumb-nav :theme="navTheme" :currentPath="currentPath" />
            </div>
          </div>
        </div>
        <!-- 顶部右侧按钮 -->
        <div class="header-right-content">
          <search :theme="navTheme" :type="searchType" v-if="showSearch" />
          <navApp
            :currNav="currNav"
            :navList="navList"
            :type="navShowType"
            @on-click="selectNav"
            v-if="navType == 3"
          />
          <full-screen v-model="isFullScreen" @on-change="fullscreenChange" />
          <language />
          <message-tip />
          <user />
          <theme />
        </div>
      </div>
    </div>
    <!-- Tags 标签 -->
    <div
      class="nav-tags"
      :style="{
        paddingLeft: shrink ? '60px' : menuWidth + 'px',
      }"
    >
      <tags-page-opened :pageTagsList="pageTagsList" v-if="showTags" />
    </div>
    <!-- 页面部分 -->
    <div
      class="single-page-content"
      :style="{
        left: shrink ? '60px' : menuWidth + 'px',
        top: showTags ? '100px' : '60px',
      }"
    >
      <div class="single-page">
        <keep-alive :include="cachePage">
          <router-view />
        </keep-alive>
      </div>
      <!-- 页面页脚 -->
      <div class="main-page-footer-content" v-if="showFooter">
        <Footer class="main-page-footer" />
      </div>
    </div>
    <!-- 全局加载动画 -->
    <circleLoading class="loading-position" v-show="loading" />
  </div>
</template>

<script>
import shrinkableMenu from "./main-components/shrinkable-menu/shrinkable-menu.vue";
import tagsPageOpened from "./main-components/tags-page-opened.vue";
import breadcrumbNav from "./main-components/breadcrumb-nav.vue";
import navMenu from "./main-components/navMenu.vue";
import navApp from "./main-components/navApp.vue";
import search from "./main-components/search.vue";
import fullScreen from "./main-components/fullscreen.vue";
import language from "./main-components/language.vue";
import messageTip from "./main-components/message-tip.vue";
import user from "./main-components/user.vue";
import Footer from "./main-components/footer.vue";
import theme from "./main-components/theme.vue";
import circleLoading from "@/views/my-components/xboot/circle-loading.vue";

import util from "@/libs/util.js";

export default {
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    navMenu,
    navApp,
    search,
    fullScreen,
    language,
    messageTip,
    user,
    Footer,
    theme,
    circleLoading,
  },
  data() {
    return {
      navPaddingLeft: this.menuWidth,
      searchType: "input",
      shrink: false,
      sliceNum: 3,
      currNav: "",
      isFullScreen: false,
    };
  },
  computed: {
    // 主题
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
    // 应用
    loading() {
      return this.$store.state.app.loading;
    },
    navList() {
      return this.$store.state.app.navList;
    },
    currNavTitle() {
      return this.$store.state.app.currNavTitle;
    },
    menuList() {
      return this.$store.state.app.menuList;
    },
    pageTagsList() {
      return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
    },
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    },
    cachePage() {
      return this.$store.state.app.cachePage;
    },
    lang() {
      return this.$store.state.app.lang;
    },
  },
  methods: {
    init() {
      this.changeFixNav();
      // 菜单
      let pathArr = util.setCurrentPath(this, this.$route.name);
      this.checkTag(this.$route.name);
      let currWidth = document.body.clientWidth;
      if (currWidth <= 1200) {
        this.sliceNum = 2;
      }
    },
    getCurrNav() {
      // 读取选中顶部菜单名
      let currNav = this.getStore("currNav");
      if (currNav) {
        this.currNav = currNav;
      } else {
        // 默认第一个
        if (this.navList && this.navList.length > 0) {
          this.currNav = this.navList[0].name;
        }
      }
    },
    selectNav(name) {
      let flag = false;
      this.navList.forEach((e) => {
        if (e.name == name && e.isMenu == false) {
          flag = true;
          if (e.description == "direct") {
            window.location.href = e.url;
          } else if (e.description == "window") {
            window.open(e.url);
          } else if (e.description == "route") {
            this.$router.push({
              name: e.url,
            });
          }
        }
      });
      if (flag) {
        // 第三方站外链接 不作其他操作
        return;
      }
      // 缓存当前顶部菜单名
      this.currNav = name;
      this.setStore("currNav", name);
      this.$store.commit("setCurrNav", name);
      // 点击顶部菜单 回到首页
      if (this.$route.name != "home_index") {
        this.$router.push({
          name: "home_index",
        });
      }
      util.initRouter(this);
    },
    toggleClick() {
      this.shrink = !this.shrink;
      this.changeFixNav();
    },
    changeFixNav() {
      if (this.fixNav) {
        this.navPaddingLeft = "0px";
      } else {
        this.navPaddingLeft = this.shrink ? "60px" : this.menuWidth + "px";
      }
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some((item) => {
        if (item.name == name) {
          return true;
        }
      });
      if (!openpageHasTag) {
        //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(
          this,
          name,
          this.$route.params || {},
          this.$route.query || {}
        );
      }
    },
    handleSubmenuChange(val) {
      // console.log(val)
    },
    beforePush(name) {
      // console.log(name)
      return true;
    },
    fullscreenChange(isFullScreen) {
      // console.log(isFullScreen);
    },
    resize() {
      let currWidth = document.body.clientWidth;
      if (currWidth <= 1200 && currWidth > 900) {
        this.sliceNum = 2;
        this.shrink = true;
      } else if (currWidth <= 900) {
        this.sliceNum = 1;
        this.shrink = true;
      } else {
        this.sliceNum = 3;
        this.shrink = false;
      }
      if (currWidth < 1325 && currWidth > 1200) {
        this.searchType = "icon";
      } else if (currWidth < 1000 && currWidth > 900) {
        this.searchType = "icon";
      } else if (currWidth < 835) {
        this.searchType = "icon";
      } else {
        this.searchType = "input";
      }
      this.changeFixNav();
    },
  },
  watch: {
    $route(to) {
      this.$store.commit("setCurrentPageName", to.name);
      let pathArr = util.setCurrentPath(this, to.name);
      this.checkTag(to.name);
    },
    lang() {
      util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
    },
    fixNav() {
      this.changeFixNav();
    },
    menuWidth() {
      this.changeFixNav();
    },
    navList() {
      setTimeout(() => {
        this.getCurrNav();
      }, 100);
    },
  },
  created() {
    // 显示打开的页面的列表
    this.$store.commit("setOpenedList");
    this.init();
    this.resize();
    window.addEventListener("resize", () => {
      this.resize();
    });
    if (this.navList && this.navList.length > 0) {
      this.getCurrNav();
    }
  },
};
</script>
