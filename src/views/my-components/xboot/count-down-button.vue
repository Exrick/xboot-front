<template>
  <div>
    <Button
      :countTime="countTime"
      :loading="loading"
      :type="type"
      :size="size"
      :ghost="ghost"
      :disabled="disabled || clicked"
      :icon="icon"
      :shape="shape"
      :long="long"
      @click="handleClick"
      >{{ buttonText }}</Button
    >
  </div>
</template>

<script>
export default {
  name: "iconChoose",
  props: {
    text: {
      type: String,
      default: "提交",
    },
    autoCountDown: {
      type: Boolean,
      default: true,
    },
    countTime: {
      type: [Number, String],
      default: 60,
    },
    suffixText: {
      type: String,
      default: "秒后重试",
    },
    type: String,
    size: String,
    loading: {
      type: Boolean,
      default: false,
    },
    ghost: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: String,
    shape: String,
    long: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      buttonText: this.text,
      count: Number(this.countTime),
      clicked: false,
    };
  },
  methods: {
    init() {},
    handleClick() {
      if (this.autoCountDown) {
        this.clicked = true;
        this.countDown();
      }
      this.$emit("on-click", true);
    },
    startCountDown() {
      this.clicked = true;
      this.countDown();
    },
    countDown() {
      if (this.count == 0) {
        this.clicked = false;
        this.count = this.countTime;
        this.buttonText = this.text;
        return;
      } else {
        this.buttonText = this.count + " " + this.suffixText;
        this.count--;
      }
      setTimeout(() => {
        this.countDown();
      }, 1000);
    },
    setText(value) {
      if (value === this.buttonText) {
        return;
      }
      this.buttonText = value;
    },
  },
  watch: {
    text(val) {
      this.setText(val);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="less">
</style>

