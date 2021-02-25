<template>
  <div>
    <Select
      v-if="!description"
      v-model="currentValue"
      :size="size"
      :loading="loading"
      :placeholder="placeholder"
      :multiple="multiple"
      :disabled="disabled"
      :filterable="filterable"
      :transfer="transfer"
      :clearable="clearable"
      :placement="placement"
      :not-found-text="notFoundText"
      :label-in-value="labelInValue"
      :transfer-class-name="transferClassName"
      :prefix="prefix"
      :max-tag-count="maxTagCount"
      :max-tag-placeholder="maxTagPlaceholder"
      @on-change="handleChange"
      @on-query-change="handleQueryChange"
      @on-clear="handleClear"
      @on-open-change="handleOpenChange"
      @on-select="handleSelect"
    >
      <Option v-for="(item, i) in data" :key="i" :value="item.value">{{item.title}}</Option>
    </Select>
    <Select
      v-if="description"
      v-model="currentValue"
      :size="size"
      :loading="loading"
      :placeholder="placeholder"
      :multiple="multiple"
      :disabled="disabled"
      :filterable="filterable"
      :transfer="transfer"
      :clearable="clearable"
      :placement="placement"
      :not-found-text="notFoundText"
      :label-in-value="labelInValue"
      :transfer-class-name="transferClassName"
      :prefix="prefix"
      :max-tag-count="maxTagCount"
      :max-tag-placeholder="maxTagPlaceholder"
      @on-change="handleChange"
      @on-query-change="handleQueryChange"
      @on-clear="handleClear"
      @on-open-change="handleOpenChange"
      @on-select="handleSelect"
    >
      <Option v-for="(item, i) in data" :value="item.value" :key="i" :label="item.title">
        <span style="margin-right:10px;">{{ item.title }}</span>
        <span style="color:#ccc;">{{ item.description }}</span>
      </Option>
    </Select>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "customList",
  props: {
    value: "",
    url: String,
    preUrl: {
      type: String,
      default: "/xboot"
    },
    method: {
      type: String,
      default: "get"
    },
    auth: {
      type: Boolean,
      default: true
    },
    valueBind: {
      type: String,
      default: "id"
    },
    title: {
      type: String,
      default: "title"
    },
    description: {
      type: String,
      default: "description"
    },
    size: String,
    placeholder: {
      type: String,
      default: "请选择"
    },
    placement: {
      type: String,
      default: "bottom-start"
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    transfer: {
      type: Boolean,
      default: false
    },
    notFoundText: {
      type: String,
      default: "无匹配数据"
    },
    labelInValue: {
      type: Boolean,
      default: false
    },
    transferClassName: String,
    prefix: String,
    maxTagCount: Number,
    maxTagPlaceholder: Function,
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentValue: this.value,
      data: [],
      loading: false
    };
  },
  methods: {
    getData(v) {
      this.loading = true;
      let accessToken = "";
      if (this.auth) {
        accessToken = window.localStorage.getItem("accessToken");
      }
      let url = this.preUrl + this.url;
      axios({
        method: this.method,
        url: url,
        headers: { accessToken: accessToken }
      }).then(res => {
        this.loading = false;
        if (res.success) {
          if (this.valueBind) {
            res.result.forEach(e => {
              e.value = e[this.valueBind];
            });
          }
          if (this.title) {
            res.result.forEach(e => {
              e.title = e[this.title];
            });
          }
          if (this.description) {
            res.result.forEach(e => {
              e.description = e[this.description];
            });
          }
          this.data = res.result;
        }
      });
    },
    handleChange(v) {
      this.$emit("input", v);
      this.$emit("on-change", v);
    },
    handleQueryChange(v) {
      this.$emit("on-query-change", v);
    },
    handleClear() {
      this.$emit("on-clear", "");
    },
    handleOpenChange(v) {
      this.$emit("on-open-change", v);
    },
    handleSelect(v) {
      this.$emit("on-select", v);
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
    },
    url(val) {
      this.getData(val);
    }
  },
  mounted() {
    this.getData(this.url);
  }
};
</script>

