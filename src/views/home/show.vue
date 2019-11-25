<style lang="less">
</style>

<template>
  <div>
    <Card>
      <Row>
        <Form
          ref="searchForm"
          inline
          :label-width="70"
         
          @keydown.enter.native="handleGo"
        >
          <Form-item label="链接地址" prop="url">
            <Input type="text" v-model="url" placeholder="http://" clearable style="width: 350px" />
          </Form-item>
          <Form-item style="margin-left:-50px;">
            <Button @click="handleGo" type="primary" icon="ios-send" style="margin-right:5px">前往</Button>
            <Button @click="handleOpen" icon="md-open">新窗口中打开</Button>
          </Form-item>
        </Form>
      </Row>
      <Divider style="margin-top:-10px;margin-bottom:0px;" />
      <Row>
        <div style="position:relative;">
          <iframe
            id="iframe"
            :src="go"
            frameborder="0"
            width="100%"
            :height="height"
            scrolling="auto"
          ></iframe>
          <Spin fix size="large" v-if="loading"></Spin>
        </div>
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  name: "show",
  data() {
    return {
      loading: false,
      go: "",
      url: "",
      html: "",
      height: "525px"
    };
  },
  computed: {
    currNav() {
      return this.$store.state.app.currNav;
    }
  },
  methods: {
    initUrl() {
      let url;
      if (this.currNav == "doc") {
        url = "https://www.kancloud.cn/exrick/xboot/content";
      } else if (this.currNav == "xboot-show") {
        url = "http://xb.exrick.cn";
      } else if (this.currNav == "xpay") {
        url = "http://xpay.exrick.cn";
      } else if (this.currNav == "xmall") {
        url = "http://xmall.exrick.cn";
      }
      if (url) {
        this.url = url;
        this.go = url;
      }
    },
    handleGo() {
      let url = this.url;
      this.go = this.url;
    },
    handleOpen() {
      window.open(this.url);
    }
  },
  watch: {
    currNav(v, oldV) {
      this.initUrl();
    }
  },
  mounted() {
    // 计算高度
    let height = document.documentElement.clientHeight;
    this.height = Number(height - 217) + "px";
    this.initUrl();
  }
};
</script>
