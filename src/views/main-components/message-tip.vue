<template>
  <div class="message-con">
    <Tooltip placement="bottom">
      <Badge :count="value">
        <Icon type="md-notifications" :size="22" @click="showMessage" />
      </Badge>
      <div slot="content">
        <p v-if="value > 0">有 {{ value }} 条未读消息</p>
        <p v-else>无未读消息</p>
      </div>
    </Tooltip>
  </div>
</template>

<script>
import util from "@/libs/util.js";
export default {
  name: "messageTip",
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    showMessage() {
      util.openNewPage(this, "message_index");
      this.$router.push({
        name: "message_index",
      });
    },
  },
};
</script>