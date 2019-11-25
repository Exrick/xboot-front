<template>
  <div>
    <p
      :class="className"
      :style="{textAlign: 'center', color: color, fontSize: countSize, fontWeight: countWeight}"
    >
      <span v-cloak :id="idName"></span>
      <span>{{ unit }}</span>
    </p>
    <slot name="intro"></slot>
  </div>
</template>

<script>
import { CountUp } from "countup.js";

function transformValue(val) {
  let endVal = 0;
  let unit = "";
  if (val < 1000) {
    endVal = val;
  } else if (val >= 1000 && val < 1000000) {
    endVal = parseInt(val / 1000);
    unit = "K+";
  } else if (val >= 1000000 && val < 10000000000) {
    endVal = parseInt(val / 1000000);
    unit = "M+";
  } else {
    endVal = parseInt(val / 1000000000);
    unit = "B+";
  }
  return {
    val: endVal,
    unit: unit
  };
}

export default {
  data() {
    return {
      unit: "",
      demo: {}
    };
  },
  name: "countUp",
  props: {
    idName: String,
    className: String,
    endVal: {
      type: Number,
      required: true
    },
    delay: {
      type: Number,
      default: 500
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
          decimal: "."
        };
      }
    },
    color: String,
    countSize: {
      type: String,
      default: "30px"
    },
    countWeight: {
      type: Number,
      default: 700
    },
    introText: [String, Number]
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        let res = transformValue(this.endVal);
        let endVal = res.val;
        this.unit = res.unit;
        let demo = {};
        this.demo = demo = new CountUp(this.idName, endVal, this.options);
        if (!demo.error) {
          demo.start();
        }
      }, this.delay);
    });
  },
  watch: {
    endVal(val) {
      let res = transformValue(val);
      let endVal = res.val;
      this.unit = res.unit;
      this.demo.update(endVal);
    }
  }
};
</script>
