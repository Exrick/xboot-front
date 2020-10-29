<template>
  <div>
    <Select
      v-model="value"
      :loading="loading"
      :placeholder="placeholder"
      :multiple="multiple"
      :disabled="disabled"
      filterable
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
      remote
      :remote-method="searchUser"
    >
      <Option
        v-for="(item, i) in userList"
        :value="item.id"
        :key="i"
        :label="item.nickname"
        :tag="item.username"
      >
        <span style="margin-right:10px;">{{ item.nickname }}</span>
        <span style="color:#ccc;">{{ item.username }}</span>
      </Option>
    </Select>
  </div>
</template>

<script>
import { searchUserByName } from "@/api/index";
export default {
  name: "customList",
  props: {
    placeholder: {
      type: String,
      default: "请输入用户名搜索选择用户"
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
      value: null,
      userList: [],
      loading: false
    };
  },
  methods: {
    searchUser(v) {
      if (!v) {
        return;
      }
      this.loading = true;
      searchUserByName(v).then(res => {
        this.loading = false;
        if (res.success) {
          this.userList = res.result;
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
    clear() {
      this.value = null;
      this.userList = [];
    },
    setData(v) {
      let that = this;
      if (!v.length) {
        let list = [v];
        this.userList = list;
        setTimeout(function() {
          that.value = v.id;
          that.$emit("input", v.id);
        }, 10);
      } else if (v.length > 0) {
        let list = [],
          ids = [];
        v.forEach(e => {
          list.push(e);
          ids.push(e.id);
        });
        this.userList = list;
        setTimeout(function() {
          that.value = ids;
          that.$emit("input", ids);
        }, 10);
      }
    }
  },
  mounted() {}
};
</script>

