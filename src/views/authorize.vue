<template>
  <div class="authorize">
    <Row
      type="flex"
      justify="center"
      align="middle"
      @keydown.enter.native="submit"
      style="height: 100%"
    >
      <Col class="content" :style="{ width: userInfo ? '450px' : '390px' }">
        <div>
          <div class="logos-wrap">
            <div class="logos">
              <Avatar
                :src="site.logo"
                :style="{ background: '#fff' }"
                size="96"
                class="top site-logo"
              />
              <Icon
                type="ios-checkmark-circle"
                color="#52c41a"
                size="32"
                class="top"
              ></Icon>
              <Avatar
                :src="require('@/assets/logo-min.png')"
                :style="{ background: '#f1f2f5' }"
                size="96"
                class="top"
              />
              <div class="line"></div>
            </div>
            <div class="auth-title">{{ $t("authorize") }} {{ site.name }}</div>
          </div>
          <div v-if="!error && !authLoading && !userInfo">
            <Tabs value="1">
              <TabPane :label="$t('sso')" name="1" icon="md-people">
                <Form ref="loginForm" :model="form" :rules="rules" class="form">
                  <FormItem prop="username">
                    <Input
                      v-model="form.username"
                      prefix="ios-contact"
                      size="large"
                      clearable
                      placeholder="账号/邮箱/手机号"
                      autocomplete="off"
                    />
                  </FormItem>
                  <FormItem prop="password">
                    <Input
                      type="password"
                      v-model="form.password"
                      prefix="ios-lock"
                      size="large"
                      clearable
                      placeholder="请输入密码"
                      autocomplete="off"
                    />
                  </FormItem>
                  <FormItem prop="code">
                    <Row
                      type="flex"
                      justify="space-between"
                      style="align-items: center; overflow: hidden"
                    >
                      <Input
                        v-model="form.code"
                        size="large"
                        clearable
                        placeholder="请输入图片验证码"
                        :maxlength="10"
                        style="width: 67%"
                      />
                      <div
                        class="code-image"
                        style="position: relative; font-size: 12px"
                      >
                        <Spin v-if="loadingCaptcha" fix></Spin>
                        <img
                          :src="captchaImg"
                          @click="getCaptchaImg"
                          alt="加载验证码失败"
                          style="width: 110px; cursor: pointer; display: block"
                        />
                      </div>
                    </Row>
                  </FormItem>
                </Form>
              </TabPane>
            </Tabs>
            <Row>
              <Button
                type="primary"
                size="large"
                :loading="loading"
                @click="submit"
                long
              >
                <span v-if="!loading">{{ $t("authorizeAndSignin") }}</span>
                <span v-else>{{ $t("authorizing") }}</span>
              </Button>
            </Row>
            <Row type="flex" justify="space-between" class="other-thing">
              <router-link to="/reset" class="back">{{
                $t("forgetPass")
              }}</router-link>
              <router-link to="/regist" class="back">
                {{ $t("registerNow") }}
              </router-link>
            </Row>
          </div>
          <div v-if="!error && !authLoading && userInfo">
            <Card dis-hover :padding="0" v-if="!error">
              <div class="auth-card">
                <div class="auth-info-wrap">
                  <div class="auth-detail" style="margin-bottom: 25px">
                    <Avatar
                      :src="userInfo.avatar"
                      :style="{ background: '#fff' }"
                      size="40"
                      class="auth-pic"
                    />
                    <div>
                      <a
                        :href="site.homeUri"
                        target="_blank"
                        class="auth-detail-href"
                        >{{ site.name }}</a
                      >
                      <div class="auth-detail-sub-title">
                        {{ $t("wants") }}
                        <span class="auth-detail-strong">{{
                          userInfo.username
                        }}</span>
                        {{ $t("wants2") }}
                      </div>
                    </div>
                  </div>
                  <div class="auth-detail" style="margin-bottom: 15px">
                    <Icon
                      type="md-person"
                      color="#6a737d"
                      size="40"
                      class="auth-pic"
                    ></Icon>
                    <div>
                      <div class="auth-detail-title">
                        {{ $t("authAquire") }}
                      </div>
                      <div class="auth-detail-sub-title">
                        {{ $t("aquireInfo") }}
                      </div>
                    </div>
                  </div>
                </div>
                <Row class="button-confirm">
                  <Button
                    type="primary"
                    size="large"
                    :loading="loading"
                    @click="confirm"
                    long
                  >
                    <span v-if="!loading">{{ $t("authorize") }}</span>
                    <span v-else>{{ $t("authorizing") }}</span>
                  </Button>
                </Row>
                <Row class="to-wrap">
                  <div>{{ $t("afterAuth") }}</div>
                  <div class="to-strong">{{ site.homeUri }}</div>
                </Row>
              </div>
            </Card>
          </div>
          <div v-if="error && !authLoading" style="margin-top: 15vh">
            <Alert type="error" show-icon>
              {{ title }}
              <span slot="desc">{{ msg }}</span>
            </Alert>
          </div>
          <div v-if="authLoading">
            <RectLoading />
          </div>
        </div>
        <Footer />
      </Col>
      <LangSwitch />
    </Row>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { initCaptcha, drawCodeImage, userInfo } from "@/api/index";
import { siteInfo, authorize, authorized } from "@/api/open";
import Footer from "@/views/main-components/footer";
import LangSwitch from "@/views/main-components/lang-switch";
import RectLoading from "@/views/my-components/xboot/rect-loading";
export default {
  components: {
    LangSwitch,
    Footer,
    RectLoading,
  },
  data() {
    return {
      authLoading: false,
      title: "",
      msg: "",
      error: false,
      loadingCaptcha: true,
      captchaImg: "",
      loading: false,
      userInfo: {},
      site: {
        name: "",
        homeUri: "",
        logo: "",
        autoApprove: false,
      },
      form: {
        username: "",
        password: "",
        code: "",
        client_id: "",
        redirect_uri: "",
        state: "",
        response_type: "",
        captchaId: this.captchaId,
      },
      rules: {
        username: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "change",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    init() {
      let q = this.$route.query;
      if (!q.client_id) {
        this.title = "参数client_id非法";
        this.msg = "The parameter client_id is illegal.";
        this.error = true;
        return;
      }
      if (!q.redirect_uri) {
        this.title = "参数redirect_uri非法";
        this.msg = "The parameter redirect_uri is illegal.";
        this.error = true;
        return;
      }
      if (!q.state) {
        this.title = "参数state非法";
        this.msg = "The parameter state is illegal.";
        this.error = true;
        return;
      }
      this.form.client_id = q.client_id;
      this.form.redirect_uri = q.redirect_uri;
      this.form.state = q.state;
      this.form.responseType = q.responseType;
      this.getSiteInfo(this.form.client_id);
    },
    getSiteInfo(v) {
      siteInfo(v).then((res) => {
        if (res.success) {
          this.site = res.result;
          this.isAuthed();
        } else {
          this.error = true;
          this.title = res.message;
          this.authLoading = false;
        }
      });
    },
    isAuthed() {
      // 判断是否认证过
      let userInfo = Cookies.get("userInfo");
      this.userInfo = userInfo;
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo);
        // 自动授权
        if (this.site.autoApprove) {
          authorized(this.form).then((res) => {
            if (res.success) {
              let url =
                res.result.redirect_uri +
                "?code=" +
                res.result.code +
                "&state=" +
                res.result.state;
              window.location.href = url;
            } else {
              this.authLoading = false;
            }
          });
        } else {
          this.authLoading = false;
        }
      } else {
        this.authLoading = false;
      }
    },
    confirm() {
      this.loading = true;
      authorized(this.form).then((res) => {
        this.loading = false;
        if (res.success) {
          let url =
            res.result.redirect_uri +
            "?code=" +
            res.result.code +
            "&state=" +
            res.result.state;
          window.location.href = url;
        }
      });
    },
    getCaptchaImg() {
      this.loadingCaptcha = true;
      initCaptcha().then((res) => {
        this.loadingCaptcha = false;
        if (res.success) {
          this.form.captchaId = res.result;
          this.captchaImg = drawCodeImage + res.result;
        }
      });
    },
    submit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          authorize(this.form).then((res) => {
            if (res.success) {
              // 存储accessToken
              this.setStore("accessToken", res.result.accessToken);
              let redictInfo = res.result;
              // 获取用户信息
              userInfo().then((res) => {
                if (res.success) {
                  // 避免超过大小限制
                  delete res.result.permissions;
                  let roles = [];
                  res.result.roles.forEach((e) => {
                    roles.push(e.name);
                  });
                  this.setStore("roles", roles);
                  Cookies.set("userInfo", JSON.stringify(res.result), {
                    expires: 7,
                  });
                  this.setStore("userInfo", res.result);
                  this.$store.commit("setUserInfo", res.result);
                  // 跳转
                  let url =
                    redictInfo.redirect_uri +
                    "?code=" +
                    redictInfo.code +
                    "&state=" +
                    redictInfo.state;
                  window.location.href = url;
                } else {
                  this.loading = false;
                  this.getCaptchaImg();
                }
              });
            } else {
              this.loading = false;
              this.getCaptchaImg();
            }
          });
        }
      });
    },
  },
  mounted() {
    this.init();
    this.getCaptchaImg();
  },
};
</script>

<style lang="less">
@import "./authorize.less";
</style>
