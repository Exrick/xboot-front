<template>
  <div
    ref="scrollCon"
    @DOMMouseScroll="handlescroll"
    @mousewheel="handlescroll"
    class="tags-scroll-content"
  >
    <div
      ref="scrollBody"
      class="tags-scroll-body"
      :style="{ left: tagBodyLeft + 'px' }"
    >
      <transition-group name="taglist-moving-animation">
        <Tag
          type="dot"
          v-for="item in pageTagsList"
          ref="tagsPageOpened"
          :key="item.name"
          :name="item.name"
          @on-close="closePage"
          @click.native="linkTo(item)"
          :closable="item.name == 'home_index' ? false : true"
          :color="
            item.children
              ? item.children[0].name == currentPageName
                ? 'primary'
                : 'default'
              : item.name == currentPageName
              ? 'primary'
              : 'default'
          "
          >{{ itemTitle(item) }}</Tag
        >
      </transition-group>
    </div>
    <div class="close-tag-content">
      <Dropdown
        transfer
        trigger="hover"
        @on-click="handleTagsOption"
        placement="bottom-end"
        transfer-class-name="close-tag-dropdown"
      >
        <div class="icon-content">
          <Icon type="ios-arrow-down" size="16" />
        </div>
        <DropdownMenu slot="list">
          <DropdownItem name="clearAll">{{ $t("closeAll") }}</DropdownItem>
          <DropdownItem name="clearOthers">{{
            $t("closeOthers")
          }}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "tagsPageOpened",
  data() {
    return {
      currentPageName: this.$route.name,
      tagBodyLeft: 0,
      paddingRight: 40,
      refsTag: [],
      tagsCount: 1,
    };
  },
  props: {
    pageTagsList: Array,
    beforePush: {
      type: Function,
      default: (item) => {
        return true;
      },
    },
  },
  computed: {
    title() {
      return this.$store.state.app.currentTitle;
    },
    tagsList() {
      return this.$store.state.app.pageOpenedList;
    },
  },
  methods: {
    itemTitle(item) {
      if (typeof item.title == "object") {
        return this.$t(item.title.i18n);
      } else {
        return item.title;
      }
    },
    closePage(event, name) {
      let pageOpenedList = this.$store.state.app.pageOpenedList;
      let lastPageObj = pageOpenedList[0];
      if (this.currentPageName == name) {
        let len = pageOpenedList.length;
        for (let i = 1; i < len; i++) {
          if (pageOpenedList[i].name == name) {
            if (i < len - 1) {
              lastPageObj = pageOpenedList[i + 1];
            } else {
              lastPageObj = pageOpenedList[i - 1];
            }
            break;
          }
        }
      } else {
        let tagWidth = event.target.parentNode.offsetWidth;
        this.tagBodyLeft = Math.min(this.tagBodyLeft + tagWidth, 0);
      }
      this.$store.commit("removeTag", name);
      this.$store.commit("closePage", name);
      pageOpenedList = this.$store.state.app.pageOpenedList;
      localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
      if (this.currentPageName == name) {
        this.linkTo(lastPageObj);
      }
    },
    linkTo(item) {
      if (this.$route.name == item.name) {
        return;
      }
      let routerObj = {};
      routerObj.name = item.name;
      if (item.argu) {
        routerObj.params = item.argu;
      }
      if (item.query) {
        routerObj.query = item.query;
      }
      if (this.beforePush(item)) {
        this.$router.push(routerObj);
      }
    },
    handlescroll(e) {
      var type = e.type;
      let delta = 0;
      if (type == "DOMMouseScroll" || type == "mousewheel") {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      let left = 0;
      if (delta > 0) {
        left = Math.min(0, this.tagBodyLeft + delta);
      } else {
        if (
          this.$refs.scrollCon.offsetWidth - 100 <
          this.$refs.scrollBody.offsetWidth
        ) {
          if (
            this.tagBodyLeft <
            -(
              this.$refs.scrollBody.offsetWidth -
              this.$refs.scrollCon.offsetWidth +
              this.paddingRight
            )
          ) {
            left = this.tagBodyLeft;
          } else {
            left = Math.max(
              this.tagBodyLeft + delta,
              this.$refs.scrollCon.offsetWidth -
                this.$refs.scrollBody.offsetWidth -
                this.paddingRight
            );
          }
        } else {
          this.tagBodyLeft = 0;
        }
      }
      this.tagBodyLeft = left;
    },
    handleTagsOption(type) {
      if (type == "clearAll") {
        this.$store.commit("clearAllTags");
        this.$router.push({
          name: "home_index",
        });
      } else {
        this.$store.commit("clearOtherTags", this);
      }
      this.tagBodyLeft = 0;
    },
    moveToView(tag) {
      if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + 10;
      } else if (
        tag.offsetLeft + 10 > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth <
          -this.tagBodyLeft +
            this.$refs.scrollCon.offsetWidth -
            this.paddingRight
      ) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(
          0,
          this.$refs.scrollCon.offsetWidth -
            this.paddingRight -
            tag.offsetWidth -
            tag.offsetLeft -
            20
        );
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(
          tag.offsetLeft -
          (this.$refs.scrollCon.offsetWidth -
            this.paddingRight -
            tag.offsetWidth) +
          20
        );
      }
    },
  },
  mounted() {
    this.refsTag = this.$refs.tagsPageOpened;
    setTimeout(() => {
      this.refsTag.forEach((item, index) => {
        if (this.$route.name == item.name) {
          let tag = this.refsTag[index].$el;
          this.moveToView(tag);
        }
      });
    }, 1); // 这里不设定时器就会有偏移bug
    this.tagsCount = this.tagsList.length;
  },
  watch: {
    $route(to) {
      this.currentPageName = to.name;
      this.$nextTick(() => {
        this.refsTag.forEach((item, index) => {
          if (to.name == item.name) {
            let tag = this.refsTag[index].$el;
            this.moveToView(tag);
          }
        });
      });
      this.tagsCount = this.tagsList.length;
    },
  },
};
</script>

<style lang="less">
.tags-scroll-content {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  z-index: 0;
  overflow: hidden;
  background: #f0f2f5;
  padding-right: 40px;

  .tags-scroll-body {
    position: absolute;
    padding: 2px 10px;
    overflow: visible;
    white-space: nowrap;
    transition: left 0.3s ease;
    // 自定义Tag样式
    .ivu-tag {
      font-size: 14px;
      padding: 0 16px;
      .ivu-icon-ios-close {
        font-size: 16px;
        margin-left: 3px !important;
        margin-right: -5px;
        top: 0px;
      }
      .ivu-tag-text {
        color: #74788d;
        transition: all 0.2s ease-in-out;
      }
      &:hover {
        .ivu-tag-text {
          color: #2d8cf0;
        }
      }
    }
    .ivu-tag-primary .ivu-tag-text {
      color: #2d8cf0;
    }
    .ivu-tag-dot-inner {
      display: none;
    }
  }

  .close-tag-content {
    position: absolute;
    right: 0;
    top: 0;
    .icon-content {
      background: white;
      box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
      z-index: 10;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
.close-tag-dropdown {
  right: 5px !important;
}
</style>
