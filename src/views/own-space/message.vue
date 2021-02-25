<template>
  <div>
    <div class="item">
      <div>
        <div class="title">系统消息</div>
        <div class="desc">系统消息将以站内信的形式通知</div>
      </div>
      <div>
        <i-switch
          v-model="messageOpen"
          @on-change="changeMessage"
          :true-value="1"
          :false-value="0"
        >
          <span slot="open">开</span>
          <span slot="close">关</span>
        </i-switch>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "message",
  data() {
    return {
      messageOpen: 1,
    };
  },
  methods: {
    init() {
      let messageOpen = this.getStore("messageOpen");
      if (
        messageOpen != "" &&
        messageOpen != undefined &&
        messageOpen != null
      ) {
        this.messageOpen = Number(messageOpen);
      } else {
        this.setStore("messageOpen", 1);
      }
    },
    changeMessage(v) {
      this.setStore("messageOpen", v);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
