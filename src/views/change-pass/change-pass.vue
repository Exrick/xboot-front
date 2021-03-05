<style lang="less">
@import "@/styles/drawer-common.less";
</style>

<template>
  <div>
    <Drawer
      title="修改密码"
      v-model="visible"
      width="450"
      draggable
      :mask-closable="false"
    >
      <div>
        <Form
          ref="form"
          :model="form"
          label-position="top"
          :rules="formValidate"
        >
          <FormItem label="原密码" prop="oldPass">
            <Input
              type="password"
              password
              v-model="form.oldPass"
              placeholder="请输入现在使用的密码"
            />
          </FormItem>
          <FormItem label="新密码" prop="newPass">
            <SetPassword
              placeholder="请输入新密码，长度为6-20个字符"
              v-model="form.newPass"
              @on-change="changeInputPass"
            />
          </FormItem>
          <FormItem label="确认新密码" prop="rePass">
            <Input
              type="password"
              password
              v-model="form.rePass"
              placeholder="请再次输入新密码"
            />
          </FormItem>
        </Form>
        <div class="drawer-footer br">
          <Button type="primary" :loading="submitLoading" @click="submit"
            >提交</Button
          >
          <Button @click="visible = false">取消</Button>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script>
import SetPassword from "@/views/my-components/xboot/set-password";
import { changePass } from "@/api/index";
export default {
  name: "change-pass",
  components: {
    SetPassword,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const valideRePassword = (rule, value, callback) => {
      if (value !== this.form.newPass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      visible: this.value,
      maxHeight: 510,
      submitLoading: false,
      form: {
        oldPass: "",
        newPass: "",
        rePass: "",
      },
      strength: "",
      formValidate: {
        oldPass: [
          {
            required: true,
            message: "请输入原密码",
            trigger: "change",
          },
        ],
        newPass: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "change",
          },
          {
            min: 6,
            message: "请至少输入6个字符",
            trigger: "blur",
          },
          {
            max: 32,
            message: "最多输入32个字符",
            trigger: "change",
          },
        ],
        rePass: [
          {
            required: true,
            message: "请再次输入新密码",
            trigger: "change",
          },
          {
            validator: valideRePassword,
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    changeInputPass(v, grade, strength) {
      this.strength = strength;
    },
    submit() {
      let params = {
        password: this.form.oldPass,
        newPass: this.form.newPass,
        passStrength: this.strength,
      };
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          changePass(params).then((res) => {
            this.submitLoading = false;
            if (res.success) {
              this.visible = false;
              this.$Modal.success({
                title: "修改密码成功",
                content: "修改密码成功，请保管好您的新账号密码",
              });
            }
          });
        }
      });
    },
    setCurrentValue(value) {
      if (value === this.visible) {
        return;
      }
      this.visible = value;
    },
  },
  watch: {
    value(val) {
      this.setCurrentValue(val);
    },
    visible(value) {
      this.$emit("input", value);
    },
  },
  mounted() {
    this.maxHeight = Number(document.documentElement.clientHeight - 121) + "px";
  },
};
</script>
