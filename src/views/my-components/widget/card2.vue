<template>
  <div>
    <Card class="card-info">
      <span class="lstick"></span>
      <div class="info-wrap">
        <Icon
          :type="icon"
          :color="iconColor"
          :size="iconSize"
          v-if="icon"
          class="icon"
        ></Icon>
        <img :src="image" :width="width" :height="height" v-else class="icon" />
        <div class="content">
          <span
            :style="{
              color: titleColor,
              fontSize: titleSize,
              fontWeight: titleWeight,
            }"
            >{{ title }}</span
          >
          <countUp
            :prefix="prefix"
            :suffix="suffix"
            :id="id"
            :end-val="endVal"
            :color="countColor"
            :countSize="countSize"
            :countWeight="countWeight"
            :decimalPlaces="decimalPlaces"
            :duration="duration"
            :delay="delay"
            :options="options"
            class="mt"
          ></countUp>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import countUp from "@/views/my-components/widget/countUp";
export default {
  name: "card2",
  components: {
    countUp,
  },
  props: {
    id: String,
    icon: String,
    iconSize: {
      type: [Number, String],
      default: 50,
    },
    iconColor: {
      type: String,
      default: "#478ef9",
    },
    image: {
      type: String,
      default: require("@/assets/dashboard/empty.png"),
    },
    width: {
      type: String,
      default: "55px",
    },
    height: {
      type: String,
      default: "55px",
    },
    prefix: String,
    suffix: String,
    endVal: Number,
    decimalPlaces: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 2,
    },
    delay: {
      type: Number,
      default: 0,
    },
    options: {
      type: Object,
      default: () => {
        return {
          startVal: 0,
          useEasing: true,
          useGrouping: true,
          separator: ",",
          decimal: ".",
        };
      },
    },
    countColor: {
      type: String,
      default: "#3f4255",
    },
    countSize: {
      type: String,
      default: "24px",
    },
    countWeight: {
      type: Number,
      default: 400,
    },
    title: String,
    titleColor: {
      type: String,
      default: "#99abb4",
    },
    titleSize: {
      type: String,
      default: "14px",
    },
    titleWeight: {
      type: Number,
      default: 600,
    },
  },
  data() {
    return {};
  },
  methods: {
    init() {},
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
.card-info {
  .lstick {
    background: #478ef9;
    width: 2px;
    height: 30px;
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    left: 0;
    top: 38px;
  }
  .info-wrap {
    display: flex;
    align-items: center;
    height: 70px;
    .icon {
      display: inline-block;
      margin-right: 16px;
    }
    .content {
      display: flex;
      flex-direction: column;
      .text {
        margin-top: 8px;
      }
      .mt {
        margin-bottom: 8px;
        line-height: 1.2;
      }
    }
  }
}
</style>