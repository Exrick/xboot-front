<style lang="less">
@import "@/styles/single-common.less";
</style>
<template>
  <div>
    <Card>
      <div slot="title">
        <div class="edit-head">
          <a @click="close" class="back-title">
            <Icon type="ios-arrow-back" />返回
          </a>
          <div class="head-name">添加</div>
          <span></span>
          <a @click="close" class="window-close">
            <Icon type="ios-close" size="31" class="ivu-icon-ios-close" />
          </a>
        </div>
      </div>
      <Form ref="form" :model="form" :label-width="90" :rules="formValidate">
        <FormItem label="名称" prop="name">
          <Input v-model="form.name" style="width: 400px" />
        </FormItem>
        <FormItem class="br">
          <Button
            @click="handleSubmit"
            :loading="submitLoading"
            type="primary"
          >提交并保存</Button>
          <Button @click="handleReset">重置</Button>
          <Button type="dashed" @click="close">关闭</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  name: "add",
  data() {
    return {
      submitLoading: false, // 表单提交状态
      form: {
        id: "",
        name: ""
      },
      // 表单验证规则
      formValidate: {
        name: [{ required: true, message: "不能为空", trigger: "change" }]
      }
    };
  },
  methods: {
    init() {
    },
    handleReset() {
      this.$refs.form.resetFields();
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // this.postRequest("请求路径", this.form).then(res => {
          //   this.submitLoading = false;
          //   if (res.success) {
          //     this.$Message.success("添加成功");
          //     this.submited();
          //   }
          // });
          // 模拟成功
          this.submitLoading = false;
          this.$Message.success("添加成功");
          this.submited();
        }
      });
    },
    close() {
      this.$emit("close", true);
    },
    submited() {
      this.$emit("submited", true);
    }
  },
  mounted() {
    this.init();
  }
};
</script>