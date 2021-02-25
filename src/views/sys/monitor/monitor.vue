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
          <FormItem label="链接地址" prop="url">
            <Input
              type="text"
              v-model="url"
              placeholder="http://"
              clearable
              style="width: 350px"
            />
          </FormItem>
          <FormItem style="margin-left: -50px">
            <Button
              @click="handleGo"
              type="primary"
              icon="ios-send"
              style="margin-right: 5px"
              >前往</Button
            >
            <Button @click="handleOpen" icon="md-open">新窗口中打开</Button>
          </FormItem>
        </Form>
      </Row>
      <Divider style="margin-top: -10px; margin-bottom: 0px" />
      <div style="position: relative">
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
    </Card>
  </div>
</template>

<script>
export default {
  name: "monitor",
  data() {
    return {
      loading: false,
      go: "",
      url: "",
      html: "",
      height: "525px",
    };
  },
  computed: {},
  methods: {
    initUrl() {
      let url = this.$route.meta.url;
      if (url !== null && url !== undefined) {
        this.url = url;
        this.go = url;
        // window.open(this.go);
        this.loading = true;
        let that = this;
        // 判断iframe是否加载完毕
        let iframe = document.getElementById("iframe");
        if (iframe.attachEvent) {
          iframe.attachEvent("onload", function () {
            //iframe加载完成后你需要进行的操作
            that.loading = false;
          });
        } else {
          iframe.onload = function () {
            //iframe加载完成后你需要进行的操作
            that.loading = false;
          };
        }
      }
    },
    handleGo() {
      let url = this.url;
      this.go = this.url;
    },
    handleOpen() {
      window.open(this.url);
    },
  },
  watch: {
    $route(to, from) {
      this.initUrl();
    },
  },
  mounted() {
    // 计算高度
    let height = document.documentElement.clientHeight;
    this.height = Number(height - 217) + "px";
    this.initUrl();
  },
};
</script>