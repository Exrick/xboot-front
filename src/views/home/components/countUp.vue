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
      <span v-cloak :id="idName"></span>
      <span>{{ unit }}</span>
      <span>{{ suffix }}</span>
    </div>
    <slot name="intro"></slot>
  </div>
</template>

<script>
import { CountUp } from "countup.js";

function transformValue(val) {
  let endVal = 0;
  let unit = "";
  if (val < 1000000) {
    endVal = val;
  } else if (val >= 1000000 && val < 10000000000) {
    endVal = parseInt(val / 1000000);
    unit = "M+";
  } else {
    endVal = parseInt(val / 1000000000);
    unit = "B+";
  }
  return {
    val: endVal,
    unit: unit,
  };
}

export default {
  data() {
    return {
      unit: "",
      count: {},
    };
  },
  name: "countUp",
  props: {
    idName: String,
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
      default: 500,
    },
    options: {
      type: Object,
      default: () => {
        return {
          startVal: 0,
          decimalPlaces: 0,
          duration: 2,
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
      default: "30px",
    },
    countWeight: {
      type: Number,
      default: 700,
    },
    introText: [String, Number],
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        let res = transformValue(this.endVal);
        let endVal = res.val;
        this.unit = res.unit;
        let count = {};
        this.count = count = new CountUp(this.idName, endVal, this.options);
        if (!count.error) {
          count.start();
        }
      }, this.delay);
    });
  },
  watch: {
    endVal(val) {
      let res = transformValue(val);
      let endVal = res.val;
      this.unit = res.unit;
      this.count.update(endVal);
    },
  },
};
</script>
