<template>
  <div>
    <div class="file-upload-wrap">
      <Upload
        :action="uploadFileUrl"
        :headers="accessToken"
        :on-success="handleSuccess"
        :on-error="handleError"
        :format="format"
        :accept="accept"
        :max-size="maxSize*1024"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="beforeUpload"
        :show-upload-list="false"
        class="file-upload"
      >
        <Button
          :loading="loading"
          :type="type"
          :ghost="ghost"
          :shape="shape"
          :size="size"
          :disabled="disabled"
          :icon="icon"
        >{{text}}</Button>
      </Upload>
      <Tooltip transfer :content="title" placement="top">
        <a @click="download">{{currentValue.name}}</a>
      </Tooltip>
    </div>
  </div>
</template>

<script>
import { uploadFile } from "@/api/index";
export default {
  name: "fileUpload",
  props: {
    value: Object,
    size: String,
    type: String,
    ghost: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    shape: String,
    icon: {
      type: String,
      default: "ios-cloud-upload-outline"
    },
    text: {
      type: String,
      default: "上传文件"
    },
    maxSize: {
      type: Number,
      default: 5
    },
    accept: String
  },
  computed: {
    format() {
      if (this.accept) {
        let format = [];
        this.accept.split(",").forEach(e => {
          format.push(e.replace(".", "").replace(" ", ""));
        });
        return format;
      } else {
        return [];
      }
    }
  },
  data() {
    return {
      accessToken: {},
      title: "点击下载",
      currentValue: this.value,
      loading: false,
      uploadFileUrl: uploadFile
    };
  },
  methods: {
    init() {
      this.accessToken = {
        accessToken: this.getStore("accessToken")
      };
    },
    download() {
      if (!this.currentValue.url) {
        this.$Message.error("无效的链接");
        return;
      }
      window.open(
        this.currentValue.url +
          "?attname=&response-content-type=application/octet-stream&filename=" +
          this.currentValue.name
      );
    },
    handleFormatError(file) {
      this.loading = false;
      this.$Notice.warning({
        title: "不支持的文件格式",
        desc:
          "所选文件‘ " +
          file.name +
          " ’格式不正确, 请选择 " +
          this.accept +
          " 格式文件"
      });
    },
    handleMaxSize(file) {
      this.loading = false;
      this.$Notice.warning({
        title: "文件大小过大",
        desc:
          "所选文件‘ " +
          file.name +
          " ’大小过大, 不得超过 " +
          this.maxSize +
          "M."
      });
    },
    beforeUpload() {
      this.loading = true;
      return true;
    },
    handleSuccess(res, file) {
      this.loading = false;
      if (res.success) {
        this.currentValue = {
          url: res.result,
          name: file.name,
          size: file.size
        };
        this.title =
          "点击下载(" +
          ((file.size * 1.0) / (1024 * 1024)).toFixed(2) +
          " MB)";
        this.$emit("input", this.currentValue);
        this.$emit("on-change", this.currentValue);
      } else {
        this.$Message.error(res.message);
      }
    },
    handleError(error, file, fileList) {
      this.loading = false;
      this.$Message.error(error.toString());
    },
    handleChange(v) {
      this.$emit("input", this.currentValue);
      this.$emit("on-change", this.currentValue);
    },
    setCurrentValue(value) {
      if (value === this.currentValue) {
        return;
      }
      this.currentValue = value;
      if (this.currentValue.size) {
        this.title =
          "点击下载(" +
          ((this.currentValue.size * 1.0) / (1024 * 1024)).toFixed(2) +
          " MB)";
      } else {
        this.title = "点击下载";
      }
      this.$emit("on-change", this.currentValue);
    }
  },
  watch: {
    value(val) {
      this.setCurrentValue(val);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.file-upload-wrap {
  display: flex;
  align-items: center;
  .file-upload {
    display: inline-block;
    margin-right: 10px;
  }
}
</style>

