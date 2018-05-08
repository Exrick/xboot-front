<style lang="less">
@import "../../styles/common.less";
@import "./access.less";
</style>

<template>
    <div class="access">
        <Row>
            <Col span="8">
                <Card>
                    <p slot="title">
                        <Icon type="android-contact"></Icon>
                        当前用户
                    </p>
                    <div class="access-user-con access-current-user-con">
                        <img :src="avatarPath" alt="">
                        <p>当前用户权限值(多个以数组显示):<b>{{ accessCode }}</b></p>
                    </div>
                </Card>
            </Col>
            <Col span="16" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="android-contacts"></Icon>
                        不同权限用户的不同菜单
                    </p>
                    <div class="access-user-con access-change-access-con">
                        <Col span="8">
                            <Row type="flex" justify="center" align="middle" class="access-change-access-con-row">
                                <i-switch :value="switchValue" @on-change="changeAccess" size="large"></i-switch>
                            </Row>
                        </Col>
                        <Col span="16" class="padding-left-10">
                            <Row type="flex" justify="center" align="middle" class="access-change-access-con-row">
                                <p>您可以通过左侧的开关来切换当前用户的权限值，然后观察左侧菜单栏的变化，如果当前用户的权限值包含<b> 0 </b>，则左侧菜单栏会显示‘权限测试页’这一项。</p>
                            </Row>
                        </Col>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import util from "@/libs/util.js";
import axios from "axios";
export default {
  name: "access_index",
  data() {
    return {
      accessCode: "",
      switchValue: false
    };
  },
  computed: {
    avatarPath() {
      return localStorage.avatorImgPath;
    }
  },
  methods: {
    init() {
      let access = JSON.parse(Cookies.get("access"));
      if (access !== null && access !== "" && access.length === 1) {
        // 单个数组
        this.accessCode = access[0];
      } else {
        this.accessCode = access;
      }
      if (this.accessCode == "0") {
        this.switchValue = false;
      } else {
        this.switchValue = true;
      }
    },
    changeAccess(res) {
      if (res) {
        this.accessCode = 1;
        Cookies.set("access", 1);
      } else {
        this.accessCode = 0;
        Cookies.set("access", 0);
      }
      let constRoutes = [];
      // 读取缓存
      let routes = localStorage.accessMenus;
      if (routes !== "" && routes !== null && routes !== undefined) {
        routes = JSON.parse(routes);
        util.initRouterNode(constRoutes, routes);
        // 刷新界面菜单
        this.$store.commit(
          "updateMenulist",
          constRoutes.filter(item => item.children.length > 0)
        );
      } else {
        // 加载菜单
        axios.get("/menu/getAllList").then(res => {
          let menuData = res.result;
          util.initRouterNode(constRoutes, menuData);
          // 刷新界面菜单
          this.$store.commit(
            "updateMenulist",
            constRoutes.filter(item => item.children.length > 0)
          );
          // 缓存
          localStorage.accessMenus = JSON.stringify(res.result);
        });
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>

</style>
