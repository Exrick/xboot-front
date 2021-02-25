<style lang="less">
@import "./own-space.less";
</style>

<template>
  <div class="own-space">
    <Card>
      <div class="own-wrap">
        <div style="width: 240px">
          <Menu :active-name="activeName" theme="light" @on-select="changeMenu">
            <MenuItem name="基本信息">基本信息</MenuItem>
            <MenuItem name="安全设置">安全设置</MenuItem>
            <MenuItem name="第三方账号绑定">第三方账号绑定</MenuItem>
            <MenuItem name="消息通知">消息通知</MenuItem>
          </Menu>
        </div>
        <div style="padding: 8px 40px; width: 100%">
          <div class="title">{{ currMenu }}</div>
          <div v-show="currMenu == '基本信息'">
            <user @on-success="updateUserInfo" />
          </div>
          <div v-show="currMenu == '安全设置'">
            <security @on-success="updateUserInfo" />
          </div>
          <div v-show="currMenu == '第三方账号绑定'">
            <social />
          </div>
          <div v-show="currMenu == '消息通知'">
            <message />
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { userInfo } from "@/api/index";
import user from "./user";
import security from "./security";
import social from "./social";
import message from "./message";
export default {
  components: {
    user,
    security,
    social,
    message,
  },
  name: "ownspace_index",
  data() {
    return {
      activeName: "基本信息",
      currMenu: "基本信息",
    };
  },
  methods: {
    init() {},
    changeMenu(v) {
      this.currMenu = v;
    },
    updateUserInfo() {
      // 更新用户信息
      userInfo().then((res) => {
        if (res.success) {
          // 避免超过大小限制
          delete res.result.permissions;
          delete res.result.roles;
          if (this.getStore("saveLogin")) {
            // 保存7天
            Cookies.set("userInfo", JSON.stringify(res.result), {
              expires: 7,
            });
          } else {
            Cookies.set("userInfo", JSON.stringify(res.result));
          }
          this.setStore("userInfo", res.result);
        }
      });
    },
  },
  mounted() {
    let type = this.$route.query.type;
    if (type == "social") {
      this.activeName = "第三方账号绑定";
      this.currMenu = "第三方账号绑定";
    }
    this.init();
  },
};
</script>
