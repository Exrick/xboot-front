<template>
  <div>
    <Select
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
      <Option v-for="(item, i) in dictData" :key="i" :value="item.value">{{
        item.title
      }}</Option>
    </Select>
  </div>
</template>

<script>
import { getDictDataByType } from "@/api/index";
export default {
  name: "dict",
  props: {
    value: "",
    dict: String,
    placeholder: {
      type: String,
      default: "请选择",
    },
    placement: {
      type: String,
      default: "bottom-start",
    },
    size: String,
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    transfer: {
      type: Boolean,
      default: false,
    },
    transferClassName: String,
    prefix: String,
    maxTagCount: Number,
    maxTagPlaceholder: Function,
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentValue: this.value,
      dictData: [],
      loading: false,
    };
  },
  methods: {
    getData(v) {
      this.loading = true;
      getDictDataByType(v).then((res) => {
        this.loading = false;
        if (res.success) {
          this.dictData = res.result;
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
    },
  },
  watch: {
    value(val) {
      this.setCurrentValue(val);
    },
    dict(val) {
      this.getData(val);
    },
  },
  mounted() {
    this.getData(this.dict);
  },
};
</script>

