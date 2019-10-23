<style lang="less">
@import "./change-pass.less";
</style>

<template>
  <div>
    <Card class="change-pass">
      <p slot="title">
        <Icon type="key"></Icon>修改密码
      </p>
      <div>
        <Form
          ref="editPasswordForm"
          :model="editPasswordForm"
          :label-width="100"
          label-position="right"
          :rules="passwordValidate"
          style="width:450px"
        >
          <FormItem label="原密码" prop="oldPass">
            <Input type="password" v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码"></Input>
          </FormItem>
          <FormItem label="新密码" prop="newPass">
            <SetPassword v-model="editPasswordForm.newPass" @on-change="changeInputPass" />
          </FormItem>
          <FormItem label="确认新密码" prop="rePass">
            <Input type="password" v-model="editPasswordForm.rePass" placeholder="请再次输入新密码"></Input>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              style="width: 100px;margin-right:5px"
              :loading="savePassLoading"
              @click="saveEditPass"
            >保存</Button>
            <Button @click="cancelEditPass">取消</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>

<script>
import SetPassword from "@/views/my-components/xboot/set-password";
import { changePass } from "@/api/index";
export default {
  name: "change_pass",
  components: {
    SetPassword
  },
  data() {
    const valideRePassword = (rule, value, callback) => {
      if (value !== this.editPasswordForm.newPass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      savePassLoading: false,
      editPasswordForm: {
        oldPass: "",
        newPass: "",
        rePass: ""
      },
      strength: "",
      passwordValidate: {
        oldPass: [
          {
            required: true,
            message: "请输入原密码",
            trigger: "blur"
          }
        ],
        newPass: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur"
          },
          {
            min: 6,
            message: "请至少输入6个字符",
            trigger: "blur"
          },
          {
            max: 32,
            message: "最多输入32个字符",
            trigger: "blur"
          }
        ],
        rePass: [
          {
            required: true,
            message: "请再次输入新密码",
            trigger: "blur"
          },
          {
            validator: valideRePassword,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    changeInputPass(v, grade, strength) {
      this.strength = strength;
    },
    saveEditPass() {
      let params = {
        password: this.editPasswordForm.oldPass,
        newPass: this.editPasswordForm.newPass,
        passStrength: this.strength
      };
      this.$refs["editPasswordForm"].validate(valid => {
        if (valid) {
          this.savePassLoading = true;
          changePass(params).then(res => {
            this.savePassLoading = false;
            if (res.success) {
              this.$Modal.success({
                title: "修改密码成功",
                content: "修改密码成功，需重新登录",
                onOk: () => {
                  this.$store.commit("logout", this);
                  this.$store.commit("clearOpenedSubmenu");
                  this.$router.push({
                    name: "login"
                  });
                }
              });
            }
          });
        }
      });
    },
    cancelEditPass() {
      this.$store.commit("removeTag", "change_pass");
      localStorage.pageOpenedList = JSON.stringify(
        this.$store.state.app.pageOpenedList
      );
      let lastPageName = "";
      let length = this.$store.state.app.pageOpenedList.length;
      if (length > 1) {
        lastPageName = this.$store.state.app.pageOpenedList[length - 1].name;
      } else {
        lastPageName = this.$store.state.app.pageOpenedList[0].name;
      }
      this.$router.push({
        name: lastPageName
      });
    }
  },
  mounted() {}
};
</script>
