<template>
  <div class="upload-thumb">
    <vuedraggable
      :list="uploadList"
      :disabled="!draggable || !multiple"
      :animation="200"
      class="list-group"
      ghost-class="thumb-ghost"
      @end="onEnd"
    >
      <div
        class="upload-list"
        :style="{
          width: `calc(${width} + 2px)`,
          height: `calc(${height} + 2px)`,
          lineHeight: height,
        }"
        v-for="(item, index) in uploadList"
        :key="index"
      >
        <div v-if="item.status == 'finished'">
          <img :src="item.url" :style="{ height: height }" />
          <div class="upload-list-cover">
            <Icon
              type="ios-eye-outline"
              @click="handleView(item.url, index)"
            ></Icon>
            <Icon
              type="ios-trash-outline"
              @click="handleRemove(item)"
              v-show="!preview"
            ></Icon>
          </div>
        </div>
        <div v-else>
          <Progress
            v-if="item.showProgress"
            :percent="item.percentage"
            hide-info
          ></Progress>
        </div>
      </div>
    </vuedraggable>
    <Upload
      ref="upload"
      :multiple="multiple"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :on-error="handleError"
      :format="format"
      :accept="accept"
      :max-size="maxSize * 1024"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      type="drag"
      :action="uploadFileUrl"
      :headers="accessToken"
      class="upload-btn"
      :style="{ width: width }"
      v-show="!preview"
    >
      <div
        class="upload-camera"
        :style="{ width: width, height: height, lineHeight: height }"
      >
        <Icon type="md-camera" size="20"></Icon>
      </div>
    </Upload>
  </div>
</template>

<script>
import "viewerjs/dist/viewer.css";
import Viewer from "viewerjs";
import { uploadFile } from "@/api/index";
import vuedraggable from "vuedraggable";
export default {
  name: "uploadPicThumb",
  components: {
    vuedraggable,
  },
  props: {
    value: {
      type: null,
    },
    preview: {
      type: Boolean,
      default: false,
    },
    draggable: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    maxSize: {
      type: Number,
      default: 5,
    },
    limit: {
      type: Number,
      default: 10,
    },
    width: {
      type: String,
      default: "60px",
    },
    height: {
      type: String,
      default: "60px",
    },
    accept: {
      type: String,
      default: ".jpg, .jpeg, .png, .gif",
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
      uploadFileUrl: uploadFile,
      uploadList: [],
    };
  },
  methods: {
    onEnd() {
      this.returnValue();
    },
    init() {
      this.setData(this.value);
      this.accessToken = {
        accessToken: this.getStore("accessToken"),
      };
    },
    handleView(v, i) {
      let image = new Image();
      image.src = v;
      let viewer = new Viewer(image, {
        hidden: function () {
          viewer.destroy();
        },
      });
      viewer.show();
    },
    handleRemove(file) {
      const uploadList = this.uploadList;
      this.uploadList.splice(uploadList.indexOf(file), 1);
      this.returnValue();
    },
    handleSuccess(res, file) {
      if (res.success) {
        file.url = res.result;
        // 单张图片处理
        if (!this.multiple && this.uploadList.length > 0) {
          // 删除第一张
          this.uploadList.splice(0, 1);
        }
        this.uploadList.push(file);
        // 返回组件值
        this.returnValue();
      } else {
        this.$Message.error(res.message);
      }
    },
    handleError(error, file, fileList) {
      this.$Message.error(error.toString());
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "不支持的文件格式",
        desc:
          "所选文件‘ " +
          file.name +
          " ’格式不正确, 请选择 " +
          this.accept +
          " 图片格式文件",
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
    handleBeforeUpload() {
      if (this.multiple && this.uploadList.length >= this.limit) {
        this.$Message.warning("最多只能上传" + this.limit + "张图片");
        return false;
      }
      return true;
    },
    returnValue() {
      if (!this.uploadList || this.uploadList.length < 1) {
        if (!this.multiple) {
          this.$emit("input", "");
          this.$emit("on-change", "");
        } else {
          this.$emit("input", []);
          this.$emit("on-change", []);
        }
        return;
      }
      if (!this.multiple) {
        // 单张
        let v = this.uploadList[0].url;
        this.$emit("input", v);
        this.$emit("on-change", v);
      } else {
        let v = [];
        this.uploadList.forEach((e) => {
          v.push(e.url);
        });
        this.$emit("input", v);
        this.$emit("on-change", v);
      }
    },
    setData(v) {
      if (typeof v == "string") {
        // 单张
        if (this.multiple) {
          this.$Message.warning("多张上传仅支持传入数组数据类型");
          return;
        }
        if (!v) {
          return;
        }
        this.uploadList = [];
        let item = {
          url: v,
          status: "finished",
        };
        this.uploadList.push(item);
        this.$emit("on-change", v);
      } else if (typeof v == "object") {
        // 多张
        if (!this.multiple) {
          this.$Message.warning("单张上传仅支持传入字符串数据类型");
          return;
        }
        this.uploadList = [];
        if (v.length > this.limit) {
          for (let i = 0; i < this.limit; i++) {
            this.uploadList.push({
              url: v[i],
              status: "finished",
            });
          }
          this.$emit("on-change", v.slice(0, this.limit));
          this.$emit("input", v.slice(0, this.limit));
          this.$Message.warning("最多只能上传" + this.limit + "张图片");
        } else {
          v.forEach((e) => {
            let item = {
              url: e,
              status: "finished",
            };
            this.uploadList.push(item);
          });
          this.$emit("on-change", v);
        }
      }
    },
  },
  watch: {
    value(val) {
      this.setData(val);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="less">
.upload-thumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .upload-list {
    display: inline-block;
    text-align: center;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 8px;
  }
  .upload-list img {
    object-fit: cover;
  }
  .upload-btn {
    display: inline-block;
  }
  .upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .upload-list:hover .upload-list-cover {
    display: block;
  }
  .upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  .list-group {
    display: flex;
  }
  .thumb-ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
}
</style>

