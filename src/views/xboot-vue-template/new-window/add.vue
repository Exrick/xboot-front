<style lang="less">
</style>
<template>
    <div class="search">
      <Row>
        <Card>     
          <p slot="title">
            添加
          </p>
          <Form ref="form" :model="form" :label-width="90" :rules="formValidate">
            <FormItem label="名称" prop="name">
              <Input v-model="form.name" style="width: 400px"/>
            </FormItem>
            <Form-item>
              <Button @click="handleSubmit" :loading="submitLoading" type="primary" style="margin-right:5px">提交并保存</Button>
              <Button @click="handleReset">重置</Button>
            </Form-item>
          </Form> 
        </Card>
      </Row>
    </div>
</template>

<script>
export default {
  name: "add",
  data() {
    return {
      loading: true, // 表单加载状态
      submitLoading: false, // 表单提交状态
      form: {
        id: "",
        name: ""
      },
      // 表单验证规则
      formValidate: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      backRoute: ""
    };
  },
  methods: {
    init() {
      this.backRoute = this.$route.query.backRoute;
    },
    handleReset() {
      this.$refs.form.resetFields();
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // this.postRequest("请求路径", this.form).then(res => {
          //   this.submitLoading = false;
          //   if (res.success === true) {
          //     this.$Message.success("添加成功");
          //     this.closeCurrentPage();
          //   }
          // });
          // 模拟成功
          this.submitLoading = false;
          this.$Message.success("添加成功");
          this.closeCurrentPage();
        }
      });
    },
    // 关闭当前页面
    closeCurrentPage() {
      this.$store.commit("removeTag", "add");
      localStorage.pageOpenedList = JSON.stringify(
        this.$store.state.app.pageOpenedList
      );
      this.$router.push({
        name: this.backRoute
      });
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === "add") {
        this.handleReset();
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>