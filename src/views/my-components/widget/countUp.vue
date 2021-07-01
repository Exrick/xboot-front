<template>
  <div>
    <div
      :class="className"
      :style="{
        color: color,
        fontSize: countSize,
        fontWeight: countWeight,
        display: display,
      }"
    >
      <span>{{ prefix }}</span>
      <span v-cloak :id="id"></span>
      <span>{{ unit }}</span>
      <span>{{ suffix }}</span>
    </div>
    <slot name="intro"></slot>
  </div>
</template>

<script>
import { CountUp } from "countup.js";

export default {
  data() {
    return {
      unit: "",
      count: {},
    };
  },
  name: "countUp",
  props: {
    id: {
      type: String,
      default: "countUp",
    },
    className: String,
    prefix: String,
    suffix: String,
    display: {
      type: String,
      default: "inline-block",
    },
    endVal: {
      type: Number,
      required: true,
    },
    delay: {
      type: Number,
      default: 0,
    },
    decimalPlaces: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 2,
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
    color: String,
    countSize: {
      type: String,
      default: "18px",
    },
    countWeight: {
      type: Number,
      default: 500,
    },
  },
  methods: {
    transformValue(val) {
      let endVal = 0;
      let unit = "";
      if (val < 1000000) {
        endVal = val;
      } else if (val >= 1000000 && val < 10000000000) {
        endVal = parseInt(val / 1000000);
        unit = "M+";
      } else if (val >= 10000000000) {
        endVal = parseInt(val / 1000000000);
        unit = "B+";
      }
      return {
        val: endVal,
        unit: unit,
      };
    },
    start() {
      this.$nextTick(() => {
        setTimeout(() => {
          let res = this.transformValue(this.endVal);
          let endVal = res.val;
          this.unit = res.unit;
          let count = {};
          this.options.decimalPlaces = this.decimalPlaces;
          this.options.duration = this.duration;
          this.count = count = new CountUp(this.id, endVal, this.options);
          if (!count.error) {
            count.start();
          }
        }, this.delay);
      });
    },
  },
  mounted() {
    this.start();
  },
  watch: {
    endVal(val) {
      let res = this.transformValue(val);
      let endVal = res.val;
      this.unit = res.unit;
      this.count.update(endVal);
    },
  },
};
</script>
