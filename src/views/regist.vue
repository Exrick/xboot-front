<template>
    <Row type="flex" justify="center" align="middle" class="regist" @keydown.enter="submitRegist">
        <Col :xs="{span:22}" style="width: 368px;">
            <Row class="header">
                <img src="../images/xboot.png" width="220px"/>
                <div class="description">X-Boot 是很不错的Web前后端分离架构脚手架</div>
            </Row>

            <Alert type="error" show-icon v-if="error">{{errorMsg}}</Alert>

            <Row class="regist-form">
                <Form ref="registForm" :model="form" :rules="rules" class="form">
                    <span class="regist-title">
                        注册
                    </span>
                    <FormItem prop="username">
                        <Input v-model="form.username" size="large" clearable placeholder="请输入用户名"/>
                    </FormItem>
                    <FormItem prop="password">
                        <Poptip placement="right" width="250">
                            <Input type="password" v-model="form.password" @on-change="strengthChange" size="large" clearable placeholder="请输入密码"/>
                            <div v-bind:class="tipStyle" slot="content">
                              <span class="words">强度 : {{strength}}</span>
                              <Slider v-model="strengthValue" :step="33" style="width:95%"></Slider>
                              请至少输入 6 个字符。请不要使<br>用容易被猜到的密码。
                            </div>
                        </Poptip>
                    </FormItem>
                    <FormItem prop="confirmPass">
                        <Input type="password" v-model="form.confirmPass" size="large" clearable placeholder="请再次输入确认密码"/>
                    </FormItem>
                    <FormItem prop="mobile">
                        <Input v-model="form.mobile" size="large" clearable placeholder="请输入手机号">
                          <Select v-model="select" slot="prepend" style="width: 70px">
                            <Option value="86">+86</Option>
                          </Select>
                        </Input>
                    </FormItem>
                    <FormItem prop="verifyCode" :error="errorCode">
                         <Row type="flex" justify="space-between" class="code-row-bg">
                            <Input v-model="form.verifyCode" size="large" clearable  placeholder="请输入短信验证码(随意输入即可)" :maxlength="maxLength" class="input-verify"/>
                            <Button size="large" @click="sendVerify" v-if="!sended" class="send-verify">获取验证码</Button>
                            <Button size="large" disabled v-if="sended" class="count-verify">{{countButton}}</Button>
                        </Row>
                    </FormItem>
                    <FormItem prop="verify">
                         <Row type="flex" justify="space-between" class="code-row-bg">
                            <Input v-model="form.verify" size="large" clearable  placeholder="请输入验证码" :maxlength="maxLength" class="input-verify"/>
                            <img :src="verifyCodeImg" style="width:100px;cursor:pointer" @click="getVerifyCode">
                        </Row>
                    </FormItem>
                </Form>
            
                <Row type="flex" justify="space-between" class="code-row-bg">
                    <Button class="regist-btn" type="primary" size="large" :loading="loading" @click="submitRegist">
                        <span v-if="!loading">注册</span>
                        <span v-else>注册中...</span>
                    </Button>
                    <router-link to="/login"><a class="to-login">使用已有账号登录</a></router-link>
                </Row>
            </Row>

            <Row class="foot">
                <Row type="flex" justify="space-around" class="code-row-bg help">
                    <a class="item">帮助</a>
                    <a class="item">隐私</a>
                    <a class="item">条款</a>
                </Row>
                <Row type="flex" justify="center" class="code-row-bg copyright">
                    Copyright © 2018 <a href="http://exrick.cn" target="_blank" style="margin:0 5px;">Exrick</a> Presents
                </Row>
            </Row>
        </Col>
    </Row>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度不得小于6位"));
      } else {
        callback();
      }
    };
    const validateConfirmPass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度不得小于6位"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    const validateMobile = (rule, value, callback) => {
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!reg.test(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    return {
      captchaId: "",
      verifyCodeImg: "",
      error: false,
      errorMsg: "",
      loading: false,
      sended: false,
      count: 60,
      countButton: "60 s",
      maxLength: 4,
      tipStyle: "password-tip-weak",
      strength: "太短",
      select: "86",
      strengthValue: 33,
      errorCode: "",
      form: {
        username: "",
        password: "",
        confirmPass: "",
        mobile: "",
        verifyCode: "",
        verify: ""
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { validator: validatePassword, trigger: "blur" }
        ],
        confirmPass: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: validateConfirmPass, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: validateMobile, trigger: "blur" }
        ],
        verify: [{ required: true, message: "验证码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    showErrorMsg(msg) {
      this.error = true;
      this.errorMsg = msg;
    },
    strengthChange() {
      let length = this.form.password.length;
      if (length < 6) {
        this.tipStyle = "password-tip-weak";
        this.strength = "太短";
        this.strengthValue = 33;
      } else if (length >= 6 && length < 10) {
        this.tipStyle = "password-tip-middle";
        this.strength = "中";
        this.strengthValue = 66;
      } else {
        this.tipStyle = "password-tip-strong";
        this.strength = "强";
        this.strengthValue = 100;
      }
    },
    sendVerify() {
      this.$refs.registForm.validate(valid => {
        if (valid) {
          this.sended = true;
          this.countDown();
        }
      });
    },
    countDown() {
      let that = this;
      if (this.count === 0) {
        this.sended = false;
        this.count = 60;
        return;
      } else {
        this.countButton = this.count + " s";
        this.count--;
      }
      setTimeout(function() {
        that.countDown();
      }, 1000);
    },
    submitRegist() {
      this.$refs.registForm.validate(valid => {
        if (valid) {
          if (this.form.verifyCode === "") {
            this.errorCode = "验证码不能为空";
            return;
          } else {
            this.errorCode = "";
          }
          this.loading = true;
          this.form.captchaId = this.captchaId;
          this.postRequest("/user/regist", this.form).then(res => {
            this.loading = false;
            if (res.success === true) {
              let query = { username: this.form.username };
              this.$router.push({
                name: "regist-result",
                query: query
              });
            } else {
              this.getVerifyCode();
            }
          });
        }
      });
    },
    getVerifyCode() {
      this.getRequest("/common/captcha/init").then(res => {
        if (res.success === true) {
          this.captchaId = res.result.captchaId;
          this.verifyCodeImg = "/xboot/common/captcha/draw/" + this.captchaId;
        }
      });
    }
  },
  mounted() {
    this.getVerifyCode();
  }
};
</script>

<style lang="less">
@import "./regist.less";
</style>
