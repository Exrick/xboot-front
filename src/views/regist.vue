<template>
  <div class="regist">
    <Row type="flex" justify="center" align="middle" @keydown.enter.native="submitRegist">
      <Col style="width: 368px;">
        <Header />
        <Row>
          <Form ref="registForm" :model="form" :rules="rules" class="form">
            <span class="regist-title">注册</span>
            <FormItem prop="username">
              <Input
                v-model="form.username"
                :maxlength="30"
                size="large"
                clearable
                placeholder="请输入用户名"
              />
            </FormItem>
            <FormItem prop="password">
              <SetPassword size="large" v-model="form.password" @on-change="changeInputPass" />
            </FormItem>
            <FormItem prop="confirmPass">
              <Input
                type="password"
                :maxlength="20"
                v-model="form.confirmPass"
                size="large"
                clearable
                placeholder="请再次输入确认密码"
              />
            </FormItem>
            <FormItem prop="mobile">
              <Input v-model="form.mobile" size="large" clearable placeholder="请输入手机号">
                <Select v-model="select" slot="prepend" style="width: 70px">
                  <Option value="86">+86</Option>
                </Select>
              </Input>
            </FormItem>
            <FormItem prop="code" :error="errorCode">
              <Row type="flex" justify="space-between">
                <Input
                  v-model="form.code"
                  size="large"
                  clearable
                  placeholder="请输入短信验证码"
                  :maxlength="10"
                  class="input-verify"
                />
                <CountDownButton
                  ref="countDown"
                  @on-click="sendSmsCode"
                  :autoCountDown="false"
                  size="large"
                  :loading="sending"
                  :text="getSms"
                />
              </Row>
            </FormItem>
          </Form>
          <Row type="flex" justify="space-between">
            <Button
              class="regist-btn"
              type="primary"
              size="large"
              :loading="loading"
              @click="submitRegist"
            >
              <span v-if="!loading">注册</span>
              <span v-else>注册中...</span>
            </Button>
            <router-link to="/login">
              <a class="to-login">使用已有账号登录</a>
            </router-link>
          </Row>
        </Row>
        <Footer />
      </Col>
      <LangSwitch />
    </Row>
  </div>
</template>

<script>
import { regist } from "@/api/index";
import { validateMobile, validatePassword } from "@/libs/validate";
import Header from "@/views/main-components/header";
import Footer from "@/views/main-components/footer";
import LangSwitch from "@/views/main-components/lang-switch";
import CountDownButton from "@/views/my-components/xboot/count-down-button";
import SetPassword from "@/views/my-components/xboot/set-password";
export default {
  components: {
    CountDownButton,
    LangSwitch,
    SetPassword,
    Header,
    Footer
  },
  data() {
    const validateConfirmPass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度不得小于6位"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      getSms: "获取验证码",
      error: false,
      loading: false,
      sending: false,
      select: "86",
      errorCode: "",
      form: {
        username: "",
        password: "",
        confirmPass: "",
        mobile: "",
        code: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            validator: validatePassword,
            trigger: "blur"
          }
        ],
        confirmPass: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur"
          },
          {
            validator: validateConfirmPass,
            trigger: "blur"
          }
        ],
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          },
          {
            validator: validateMobile,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    initVaptcha() {},
    sendSmsCode() {
      this.$Modal.info({
        title: "抱歉，请获取完整版",
        content: "支付链接: http://xpay.exrick.cn/pay?xboot"
      });
    },
    changeInputPass(v, grade, strength) {
      this.form.passStrength = strength;
    },
    submitRegist() {
      this.$refs.registForm.validate(valid => {
        if (valid) {
          if (!this.form.code) {
            this.errorCode = "验证码不能为空";
            return;
          } else {
            this.errorCode = "";
          }
          this.loading = true;
          regist(this.form).then(res => {
            this.loading = false;
            if (res.success) {
              let query = {
                username: this.form.username
              };
              this.$router.push({
                name: "regist-result",
                query: query
              });
            }
          });
        }
      });
    }
  },
  mounted() {
    this.initVaptcha();
  }
};
</script>

<style lang="less">
@import "./regist.less";
</style>
