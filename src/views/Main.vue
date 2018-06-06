<style lang="less">
@import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <scroll-bar ref="scrollBar">
                <shrinkable-menu 
                    :shrink="shrink"
                    @on-change="handleSubmenuChange"
                    :theme="menuTheme" 
                    :before-push="beforePush"
                    :open-names="openedSubmenuArr"
                    :menu-list="menuList">
                    <div slot="top" class="logo-con">
                        <img v-show="!shrink"  src="../images/logo.png" key="max-logo" />
                        <img v-show="shrink" src="../images/logo-min.png" key="min-logo" />
                    </div>
                </shrinkable-menu>
            </scroll-bar>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                    <Dropdown @on-click="handleLanDropdown" class="options">
                      <Icon type="earth" :size="21" class="language"></Icon>
                      <DropdownMenu  slot="list">
                        <DropdownItem name="zh-CN">中文</DropdownItem>
                        <DropdownItem name="en-US">English</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <lock-screen></lock-screen>
                    <message-tip v-model="mesCount"></message-tip>
                    
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ username }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownSpace">{{ $t('userCenter') }}</DropdownItem>
                                    <DropdownItem name="changePass">{{ $t('changePass') }}</DropdownItem>
                                    <DropdownItem name="loginout" divided>{{ $t('logout') }}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatarPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
import shrinkableMenu from "./main-components/shrinkable-menu/shrinkable-menu.vue";
import tagsPageOpened from "./main-components/tags-page-opened.vue";
import breadcrumbNav from "./main-components/breadcrumb-nav.vue";
import fullScreen from "./main-components/fullscreen.vue";
import lockScreen from "./main-components/lockscreen/lockscreen.vue";
import messageTip from "./main-components/message-tip.vue";
import Cookies from "js-cookie";
import util from "@/libs/util.js";
import scrollBar from "@/views/my-components/scroll-bar/vue-scroller-bars";
import axios from "axios";

export default {
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    fullScreen,
    lockScreen,
    messageTip,
    scrollBar
  },
  data() {
    return {
      shrink: false,
      username: "",
      isFullScreen: false,
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr
    };
  },
  computed: {
    menuList() {
      return this.$store.state.app.menuList;
    },
    pageTagsList() {
      return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
    },
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    },
    avatarPath() {
      return localStorage.avatorImgPath;
    },
    cachePage() {
      return this.$store.state.app.cachePage;
    },
    lang() {
      return this.$store.state.app.lang;
    },
    menuTheme() {
      return this.$store.state.app.menuTheme;
    },
    mesCount() {
      return this.$store.state.app.messageCount;
    }
  },
  methods: {
    init() {
      let pathArr = util.setCurrentPath(this, this.$route.name);
      // this.$store.commit("updateMenulist");
      if (pathArr.length >= 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      let userInfo = JSON.parse(Cookies.get("userInfo"));
      this.username = userInfo.username;
      let messageCount = 3;
      this.messageCount = messageCount.toString();
      this.checkTag(this.$route.name);
      this.$store.commit("setMessageCount", 3);
    },
    toggleClick() {
      this.shrink = !this.shrink;
    },
    handleLanDropdown(name) {
      localStorage.lang = name;
      this.$store.commit("switchLang", name);
    },
    handleClickUserDropdown(name) {
      if (name === "ownSpace") {
        util.openNewPage(this, "ownspace_index");
        this.$router.push({
          name: "ownspace_index"
        });
      } else if (name === "changePass") {
        util.openNewPage(this, "change_pass");
        this.$router.push({
          name: "change_pass"
        });
      } else if (name === "loginout") {
        // 退出登录
        this.$store.commit("logout", this);
        this.$store.commit("clearOpenedSubmenu");
        // 强制刷新页面 重新加载router
        location.reload();
      }
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
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
    scrollBarResize() {
      this.$refs.scrollBar.resize();
    }
  },
  watch: {
    $route(to) {
      this.$store.commit("setCurrentPageName", to.name);
      let pathArr = util.setCurrentPath(this, to.name);
      if (pathArr.length > 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      this.checkTag(to.name);
      localStorage.currentPageName = to.name;
    },
    lang() {
      util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
    },
    openedSubmenuArr() {
      setTimeout(() => {
        this.scrollBarResize();
      }, 300);
    }
  },
  mounted() {
    this.init();
    window.addEventListener("resize", this.scrollBarResize);
  },
  created() {
    // 显示打开的页面的列表
    this.$store.commit("setOpenedList");
  },
  dispatch() {
    window.removeEventListener("resize", this.scrollBarResize);
  }
};
</script>
