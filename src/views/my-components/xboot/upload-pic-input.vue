<template>
  <div>
    <div style="display:flex;">
      <Input
        v-model="currentValue"
        @on-change="handleChange"
        :placeholder="placeholder"
        :size="size"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        icon="md-eye"
        style="margin-right:10px;"
      >
        <Poptip
          transfer
          trigger="hover"
          title="图片预览"
          placement="right"
          width="350"
          style="width: 17px;cursor:pointer"
          slot="append"
        >
          <Button type="primary" icon="md-eye"></Button>
          <div slot="content">
            <img
              v-show="currentValue"
              :src="currentValue"
              style="width: 100%;margin: 0 auto;display: block;cursor:zoom-in"
              @click="viewImage"
            />
            <span v-show="!currentValue">无效的图片链接</span>
            <a
              v-show="currentValue"
              @click="viewImage"
              style="margin-top:5px;text-align:right;display:block"
            >查看大图</a>
          </div>
        </Poptip>
      </Input>
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
      >
        <Button :loading="loading" :size="size" :disabled="disabled" :icon="icon">上传图片</Button>
      </Upload>
    </div>
  </div>
</template>

<script>
import "viewerjs/dist/viewer.css";
import Viewer from "viewerjs";
import { uploadFile } from "@/api/index";
export default {
  name: "uploadPicInput",
  props: {
    value: String,
    size: String,
    placeholder: {
      type: String,
      default: "可输入图片链接"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    maxlength: Number,
    icon: {
      type: String,
      default: "ios-cloud-upload-outline"
    },
    maxSize: {
      type: Number,
      default: 5
    },
    accept: {
      type: String,
      default: ".jpg, .jpeg, .png, .gif"
    }
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
    viewImage() {
      let image = new Image();
      image.src = this.currentValue;
      let viewer = new Viewer(image, {
        hidden: function() {
          viewer.destroy();
        }
      });
      viewer.show();
    },
    handleFormatError(file) {
      this.loading = false;
      this.$Notice.warning({
        title: "不支持的文件格式",
        desc:
          "所选文件‘ " +
          file.name +
          " ’格式不正确, 请选择 "+this.accept+" 格式文件"
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
        this.currentValue = res.result;
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

