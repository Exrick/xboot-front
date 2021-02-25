<style lang="less">
@import "./ProductShop.less";
</style>

<template>
  <div :class="{ 'shop-hover-container': type != 'saleoff' }">
    <a
      @click="openProduct(data)"
      :class="{ 'shop-product-wrap': true, 'saleoff-wrap': type == 'saleoff' }"
      :style="topBorderColor"
    >
      <div :class="{ bg: type == 'saleoff', bgt: type != 'saleoff' }"></div>
      <div v-if="data.flag" class="flag" :style="flagBg">{{ data.flag }}</div>
      <img
        v-lazy="data.picUrl"
        width="160"
        height="160"
        :style="{ marginBottom: type == 'saleoff' ? '22px' : '18px' }"
      />
      <div class="title">{{ data.title }}</div>
      <div class="desc">{{ data.description }}</div>
      <div class="item-price">
        <div class="item-discount">{{ data.price }} 元</div>
        <del v-if="data.originPrice" class="item-origin"
          >{{ data.originPrice }} 元</del
        >
      </div>
      <div class="review-wrapper" v-if="data.review && data.reviewer">
        <div class="review">{{ data.review }}</div>
        <div class="reviewer">来自于 {{ data.reviewer }} 的评价</div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "ProductShop",
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      default: function () {
        return {};
      },
    },
    type: {
      type: String,
      default: "",
    },
    topColor: {
      type: Number,
      default: -1,
    },
  },
  computed: {
    flagBg() {
      let tag = String(this.data.flagType).toLowerCase();
      if (tag == "saleoff") {
        return "background-color: #e53935;";
      } else {
        return "background-color: #83c44e;";
      }
    },
    topBorderColor() {
      if (this.topColor == 0) {
        return "border-top-color: #ffac13;";
      } else if (this.topColor == 1) {
        return "border-top-color: #83c44e;";
      } else if (this.topColor == 2) {
        return "border-top-color: #2196f3;";
      } else if (this.topColor == 3) {
        return "border-top-color: #e53935;";
      } else if (this.topColor == 4) {
        return "border-top-color: #00c0a5;";
      } else if (this.topColor == 5) {
        return "border-top-color: #ffac13;";
      } else if (this.topColor == 6) {
        return "border-top-color: #83c44e;";
      } else if (this.topColor == 7) {
        return "border-top-color: #2196f3;";
      } else if (this.topColor == 8) {
        return "border-top-color: #e53935;";
      } else if (this.topColor == 9) {
        return "border-top-color: #00c0a5;";
      } else {
        return "border-top-style: none;";
      }
    },
  },
  methods: {
    openProduct(v) {
      // window.open("//" + window.location.host + "/product?id=" + v.id);
    },
  },
  mounted() {},
};
</script>
