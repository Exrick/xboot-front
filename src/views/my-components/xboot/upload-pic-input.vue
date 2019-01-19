<template>
  <div>
    <Poptip trigger="hover" title="图片预览" placement="right" width="350">
      <Input
        v-model="picUrl"
        @on-change="handleChange"
        placeholder="可直接填入网络图片链接"
        :style="{width: width}"
        clearable
      />
      <div slot="content">
        <img :src="picUrl" alt="无效的图片链接" style="width: 100%;margin: 0 auto;display: block;">
        <a @click="viewImage=true" style="margin-top:5px;text-align:right;display:block">查看大图</a>
      </div>
    </Poptip>
    <Upload
      :action="uploadFileUrl"
      :headers="accessToken"
      :on-success="handleSuccess"
      :on-error="handleError"
      :format="['jpg','jpeg','png','gif','bmp']"
      accept=".jpg, .jpeg, .png, .gif, .bmp"
      :max-size="5120"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="beforeUpload"
      :show-upload-list="false"
      ref="up"
      class="upload"
    >
      <Button :loading="loading" icon="ios-cloud-upload-outline">上传图片</Button>
    </Upload>

    <Modal title="图片预览" v-model="viewImage" :styles="{top: '30px'}" draggable>
      <img :src="picUrl" alt="无效的图片链接" style="width: 100%;margin: 0 auto;display: block;">
      <div slot="footer">
        <Button @click="viewImage=false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { uploadFile } from "@/api/index";
export default {
  name: "uploadPicInput",
  props: {
    width: {
      type: String,
      default: "200px"
    }
  },
  data() {
    return {
      accessToken: {},
      picUrl: "",
      loading: false,
      viewImage: false,
      uploadFileUrl: uploadFile
    };
  },
  methods: {
    init() {
      this.accessToken = {
        accessToken: this.getStore("accessToken")
      };
    },
    handleFormatError(file) {
      this.loading = false;
      this.$Notice.warning({
        title: "不支持的文件格式",
        desc:
          "所选文件‘ " +
          file.name +
          " ’格式不正确, 请选择 .jpg .jpeg .png .gif .bmp格式文件"
      });
    },
    handleMaxSize(file) {
      this.loading = false;
      this.$Notice.warning({
        title: "文件大小过大",
        desc: "所选文件‘ " + file.name + " ’大小过大, 不得超过 5M."
      });
    },
    beforeUpload() {
      this.loading = true;
      return true;
    },
    handleSuccess(res, file) {
      this.loading = false;
      if (res.success === true) {
        file.url = res.result;
        this.picUrl = res.result;
        this.$emit("on-change", this.picUrl);
      } else {
        this.$Message.error(res.message);
      }
    },
    handleError(error, file, fileList) {
      this.loading = false;
      this.$Message.error(error.toString());
    },
    handleChange(v) {
      this.$emit("on-change", this.picUrl);
    },
    setPicUrl(v) {
      this.picUrl = v;
      this.$emit("on-change", this.picUrl);
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less">
.upload {
  display: inline-block;
  margin-left: 10px;
}
</style>

