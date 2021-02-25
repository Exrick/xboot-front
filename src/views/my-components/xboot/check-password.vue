<template>
  <div>
    <Modal title="身份验证" v-model="passCheckVisible" fullscreen footer-hide>
      <div class="pass-check" @keydown.enter="checkPass">
        <Icon type="md-lock" size="30" style="margin-bottom:10px;"/>
        <div class="title" style="margin-bottom:40px;">密码认证</div>
        <div class="desc">请输入您的密码</div>
        <Input
          autofocus
          v-model="password"
          password
          size="large"
          placeholder="请输入您的密码"
          type="password"
          style="width:300px;margin-bottom:40px;"
        />
        <div style="margin-bottom:60px;">
          <Button size="large" @click="passCheckVisible=false" style="margin-right:20px;">取消</Button>
          <Button
            :loading="loading"
            :disabled="!password"
            @click="checkPass"
            type="primary"
            size="large"
          >提交</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { unlock } from "@/api/index";
export default {
  name: "circleLoading",
  data() {
    return {
      loading: false,
      passCheckVisible: false, // 密码验证
      password: ""
    };
  },
  methods: {
    checkPass() {
      this.loading = true;
      unlock({ password: this.password }).then(res => {
        this.loading = false;
        if (res.success) {
          this.passCheckVisible = false;
          this.$emit("on-success", true);
        }
      });
    },
    show(){
      this.password = "";
      this.passCheckVisible = true;
    }
  }
};
</script>

<style lang="less">
.pass-check {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  .title {
    font-weight: 600;
    font-size: 16px;
    color: #2f3033;
  }
  .desc {
    font-size: 14px;
    line-height: 28px;
    margin: 15px 0;
  }
}
</style>

