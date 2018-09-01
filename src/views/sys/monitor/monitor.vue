<style lang="less">
@import "./monitor.less";
</style>

<template>
  <div>
    <Row>
      <Col>
      <Card>
        <Row>
          <Form ref="searchForm" inline :label-width="70" class="search-form" @keydown.enter.native="handleGo">
            <Form-item label="链接地址" prop="url">
              <Input type="text" v-model="url" placeholder="http://" clearable style="width: 350px" />
            </Form-item>
            <Form-item style="margin-left:-50px;">
              <Button @click="handleGo" type="primary" icon="ios-send" style="margin-right:5px">前往</Button>
              <Button @click="handleOpen" icon="md-open">新窗口中打开</Button>
            </Form-item>
          </Form>
        </Row>
        <Divider style="margin-top:-10px;margin-bottom:0px;"/>
        <Row>
          <iframe id="frame" :src="go" frameborder="0" width="100%" height="525px" scrolling="auto"></iframe>
        </Row>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "monitor",
  data() {
    return {
      go: "",
      url: "",
      html: ""
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
    $route(to, from) {
      this.initUrl();
    }
  },
  created() {
    this.initUrl();
  }
};
</script>

<style>
</style>
