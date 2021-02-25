<template>
  <div>
    <Divider class="component-blue" orientation="left"
      >身份验证全屏弹框</Divider
    >
    <Button @click="showCheckPass">开始验证</Button>
    <h3 class="component-article">events</h3>
    <Table
      :columns="events"
      :data="data1"
      border
      size="small"
      width="1000"
    ></Table>
    <h3 class="component-article">methods</h3>
    <Table
      :columns="methods"
      :data="data2"
      border
      size="small"
      width="1000"
    ></Table>

    <check-password ref="checkPass" @on-success="checkSuccess" />
  </div>
</template>
<script>
import { props, events, methods } from "./columns";
import checkPassword from "@/views/my-components/xboot/check-password";
export default {
  components: {
    checkPassword,
  },
  data() {
    return {
      props: props,
      events: events,
      methods: methods,
      data1: [
        {
          name: "on-success",
          type: "仅当验证密码正确触发回调",
          value: "true",
        },
      ],
      data2: [
        {
          name: "show",
          type: "显示密码验证组件",
          value: "无",
        },
      ],
    };
  },
  methods: {
    showCheckPass() {
      this.$refs.checkPass.show();
    },
    checkSuccess() {
      this.$Message.success("验证成功");
    },
  },
  mounted() {},
};
</script>