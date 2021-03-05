<template>
  <div>
    <div :class="{ 'file-upload-wrap-nobutton': !showUpload }">
      <Upload
        :action="uploadFileUrl"
        :headers="accessToken"
        :on-success="handleSuccess"
        :on-error="handleError"
        :format="format"
        :accept="accept"
        :max-size="maxSize * 1024"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="beforeUpload"
        :default-file-list="fileList"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        ref="upload"
      >
        <Button
          :type="type"
          :ghost="ghost"
          :shape="shape"
          :size="size"
          :disabled="disabled"
          :icon="icon"
          v-show="showUpload"
          >{{ text }}</Button
        >
      </Upload>
      <span v-show="!showUpload && fileList.length < 1">{{ noDataText }}</span>
    </div>
  </div>
</template>

<script>
import { uploadFile } from "@/api/index";
export default {
  name: "fileUpload",
  props: {
    value: null,
    size: String,
    type: String,
    multi: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 10,
    },
    ghost: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    shape: String,
    icon: {
      type: String,
      default: "ios-cloud-upload-outline",
    },
    text: {
      type: String,
      default: "上传文件",
    },
    maxSize: {
      type: Number,
      default: 5,
    },
    accept: String,
    showUpload: {
      type: Boolean,
      default: true,
    },
    noDataText: {
      type: String,
      default: "暂无数据",
    },
    showTip: {
      type: Boolean,
      default: true,
    },
    tipSize: {
      type: Number,
      default: 50,
    },
  },
  computed: {
    format() {
      if (this.accept) {
        let format = [];
        this.accept.split(",").forEach((e) => {
          format.push(e.replace(".", "").replace(" ", ""));
        });
        return format;
      } else {
        return [];
      }
    },
  },
  data() {
    return {
      accessToken: {},
      currentValue: this.value,
      uploadFileUrl: uploadFile,
      fileList: [],
    };
  },
  methods: {
    init() {
      this.accessToken = {
        accessToken: this.getStore("accessToken"),
      };
      this.setCurrentValue(this.value);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "不支持的文件格式",
        desc:
          "所选文件‘ " +
          file.name +
          " ’格式不正确, 请选择 " +
          this.accept +
          " 格式文件",
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小过大",
        desc:
          "所选文件‘ " +
          file.name +
          " ’大小过大, 不得超过 " +
          this.maxSize +
          "M.",
      });
    },
    beforeUpload(file) {
      if (this.multi && this.fileList.length >= this.limit) {
        this.$Message.warning("最多只能上传" + this.limit + "张图片");
        return false;
      }
      return true;
    },
    handleSuccess(res, file, fileList) {
      if (res.success) {
        if (this.multi) {
          this.currentValue.push({
            url: res.result,
            name: file.name,
            size: file.size,
          });
        } else {
          this.currentValue = {
            url: res.result,
            name: file.name,
            size: file.size,
          };
        }
        this.$emit("input", this.currentValue);
        this.$emit("on-change", this.currentValue);
      } else {
        file.percentage = 0;
        file.status = "fail";
        file.name += "（上传失败）";
        this.$Message.error(res.message);
      }
    },
    handleError(error, file, fileList) {
      this.$Message.error(error.toString());
    },
    handlePreview(file) {
      let showTip =
        this.showTip && file.size && file.size > this.tipSize * 1024 * 1024;
      if (showTip) {
        this.$Modal.confirm({
          title: "文件较大提示",
          content: "该文件大小已超过 " + this.tipSize + " MB，确认下载？",
          okText: "继续下载",
          onOk: () => {
            this.download(file);
          },
        });
      } else {
        this.download(file);
      }
    },
    download(file) {
      if (!file.url) {
        this.$Message.error("无效的链接");
        return;
      }
      window.open(
        file.url +
          "?attname=&response-content-type=application/octet-stream&filename=" +
          file.name
      );
    },
    handleRemove(file, fileList) {
      if (this.multi) {
        let re = [];
        fileList.forEach((e) => {
          if (e.status == "finished") {
            re.push({
              url: e.url,
              name: e.name,
              size: e.size,
            });
          }
        });
        this.fileList = re;
        this.currentValue = re;
      } else {
        if (fileList.length > 0 && fileList[0].status == "finished") {
          this.currentValue = {
            url: fileList[0].url,
            name: fileList[0].name,
            size: fileList[0].size,
          };
          this.fileList = [this.currentValue];
        } else {
          this.currentValue = {};
        }
      }
      this.$emit("input", this.currentValue);
      this.$emit("on-change", this.currentValue);
    },
    setCurrentValue(v) {
      if (!v.length && v.length != 0) {
        // 单个
        if (this.multi) {
          this.$Message.warning("多个上传仅支持传入数组数据类型");
          return;
        }
        if (!v.name && !v.url) {
          return;
        }
        this.currentValue = v;
        this.fileList.push(v);
      } else {
        // 多个
        if (!this.multi) {
          this.$Message.warning("单个上传仅支持传入字符串数据类型");
          return;
        }
        if (v.length > this.limit) {
          for (let i = 0; i < this.limit; i++) {
            this.fileList.push({
              url: v[i].url,
              name: v[i].name,
              size: v[i].size,
            });
          }
          this.currentValue = this.fileList;
          this.$emit("input", this.currentValue);
          this.$Message.warning("最多只能上传" + this.limit + "个文件");
        } else {
          this.currentValue = v;
          this.fileList = v;
        }
      }
      this.count = this.currentValue.length;
      this.$emit("on-change", this.currentValue);
    },
    clear() {
      this.$refs.upload.clearFiles();
      if (this.multi) {
        this.currentValue = [];
      } else {
        this.currentValue = {};
      }
      this.$emit("input", this.currentValue);
      this.$emit("on-change", this.currentValue);
    },
  },
  watch: {
    value(val) {
      this.setCurrentValue(val);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="less">
.file-upload-wrap-nobutton {
  .ivu-upload-list {
    margin-top: -20px;
  }
}
</style>

