<template>
  <div>
    <Form ref="form" :model="form" :label-width="90" label-position="left">
      <FormItem label="登录账号：" prop="username">{{
        form.username
      }}</FormItem>
      <FormItem label="用户头像：">
        <upload-pic-thumb
          v-model="form.avatar"
          :multiple="false"
        ></upload-pic-thumb>
      </FormItem>
      <FormItem label="用户名：" prop="nickname" :error="error">
        <Input v-model="form.nickname" style="width: 300px" />
      </FormItem>
      <FormItem label="性别：">
        <dict dict="sex" v-model="form.sex" style="width: 300px" />
      </FormItem>
      <FormItem label="生日：">
        <DatePicker
          v-model="form.birth"
          @on-change="changeBirth"
          style="width: 300px"
          type="date"
        ></DatePicker>
      </FormItem>
      <FormItem label="所在省市：">
        <al-cascader
          v-model="form.address"
          data-type="name"
          level="2"
          style="width: 300px"
        />
      </FormItem>
      <FormItem label="街道地址：" prop="street">
        <Input v-model="form.street" style="width: 300px" />
      </FormItem>
      <FormItem label="个人简介：" prop="description">
        <Input
          v-model="form.description"
          type="textarea"
          style="width: 300px"
          :autosize="{ minRows: 3, maxRows: 5 }"
          placeholder="个人简介"
        ></Input>
      </FormItem>
      <FormItem label="所属部门：">
        <span>{{ form.departmentTitle }}</span>
      </FormItem>
      <FormItem label="用户类型：">
        <span>{{ form.typeTxt }}</span>
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          style="width: 100px; margin-right: 5px"
          :loading="loading"
          @click="saveEdit"
          >保存</Button
        >
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { userInfo, userInfoEdit } from "@/api/index";
import uploadPicThumb from "@/views/my-components/xboot/upload-pic-thumb";
import Cookies from "js-cookie";
import dict from "@/views/my-components/xboot/dict";
export default {
  components: {
    uploadPicThumb,
    dict,
  },
  name: "user",
  data() {
    return {
      loading: false,
      form: {
        address: [],
      },
      error: "",
    };
  },
  methods: {
    init() {
      let v = JSON.parse(Cookies.get("userInfo"));
      // 转换null为""
      for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let userInfo = JSON.parse(str);
      this.form = userInfo;
      if (userInfo.address) {
        if (typeof userInfo.address == "string") {
          this.form.address = userInfo.address.split(",");
        } else {
          this.form.address = userInfo.address;
        }
      } else {
        this.form.address = [];
      }
      if (this.form.type == 0) {
        this.form.typeTxt = "普通用户";
      } else if (this.form.type == 1) {
        this.form.typeTxt = "管理员";
      }
    },
    changeBirth(v) {
      this.form.birth = v;
    },
    saveEdit() {
      if (!this.form.nickname) {
        this.error = "请输入用户名";
        return;
      } else {
        this.error = "";
      }
      this.loading = true;
      if (typeof this.form.birth == "object") {
        this.form.birth = this.format(this.form.birth, "yyyy-MM-dd");
      }
      delete this.form.roles;
      userInfoEdit(this.form).then((res) => {
        this.loading = false;
        if (res.success) {
          this.$Message.success("保存成功");
          // 更新头像
          this.$store.commit("setNickname", this.form.nickname);
          this.$store.commit("setAvatar", this.form.avatar);
          // 需要更新用户信息
          this.$emit("on-success", true);
        }
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
