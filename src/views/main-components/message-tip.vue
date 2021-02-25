<template>
  <div style="display: inline-block" class="message-content">
    <Dropdown trigger="click" placement="bottom-end">
      <div style="display: inline-block">
        <div class="header-right-icon header-action">
          <Badge :count="messageCount">
            <Icon type="md-notifications" :size="20" style="margin-top: 3px" />
          </Badge>
        </div>
      </div>
      <div slot="list" class="message-tip">
        <div class="title-content">
          <div class="title">{{ $t("Notifications") }}</div>
          <a class="mark" v-if="messageList.length > 0" @click="markAll">{{
            $t("markAll")
          }}</a>
          <a class="mark" v-else @click="getData">{{ $t("refresh") }}</a>
        </div>
        <div class="mes-list">
          <div v-if="messageList.length == 0" class="empty-message">
            <Icon type="ios-mail-open-outline" size="70" color="#e4e4e4" />
            <p>{{ $t("noNewMes") }}</p>
          </div>
          <div v-else>
            <!-- 消息列表 -->
          </div>
          <Spin fix v-if="loading" />
        </div>
        <a class="show-more" @click="showMessage">
          <Icon
            type="ios-arrow-dropright-circle"
            size="16"
            style="margin: 0 5px 2px 0"
          />{{ $t("showMore") }}
        </a>
      </div>
    </Dropdown>
  </div>
</template>

<script>
import util from "@/libs/util.js";
import Cookies from "js-cookie";
export default {
  name: "messageTip",
  props: {},
  data() {
    return {
      loading: false,
      userId: "",
      messageList: [],
      client: null,
    };
  },
  computed: {
    messageCount() {
      return this.$store.state.app.messageCount;
    },
  },
  methods: {
    init() {
      let userInfo = JSON.parse(Cookies.get("userInfo"));
      this.userId = userInfo.id;
      this.getData();
    },
    getData() {
      // 读取未读消息
    },
    showMessage() {
      util.openNewPage(this, "message_index");
      if (this.$route.name == "message_index") {
        return;
      }
      this.$router.push({
        name: "message_index",
      });
    },
    messageDetail(v) {},
    markAll() {
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="less">
.message-content .ivu-select-dropdown {
  padding: 0;
}
.message-tip {
  display: flex;
  flex-direction: column;
  width: 320px;
  .title-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    .title {
      color: #515a6e;
      font-size: 16px;
      font-weight: 500;
    }
    .mark {
      font-size: 12px;
    }
  }
  .empty-message {
    height: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #a7a7a7;
    p {
      margin-top: 10px;
    }
  }
  .mes-list {
    position: relative;
    display: flex;
    flex-direction: column;
    max-height: 261px;
    overflow: auto;
  }
  .mes-list::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .mes-list::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 2px #d1d1d1;
    background: #e4e4e4;
  }
  .show-more {
    border-top: 1px solid #eff2f7;
    padding: 16px;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
}
</style>