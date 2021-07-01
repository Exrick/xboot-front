<template>
  <Card
    :padding="0"
    :bordered="bordered"
    :style="{ backgroundColor: realBackgroundColor }"
  >
    <div
      class="card-app card-content"
      @click="click"
      @mouseover="itemHover"
      @mouseout="removeHover"
    >
      <div class="card-body">
        <Icon
          class="card-icon"
          :type="icon"
          :color="realIconColor"
          :size="iconSize"
          v-if="icon"
        ></Icon>
        <img :src="image" :width="width" :height="height" v-else />
        <div
          class="card-title"
          :style="{
            color: realTitleColor,
            fontSize: titleSize,
            fontWeight: titleWeight,
          }"
        >
          {{ title }}
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  name: "card-app",
  components: {},
  props: {
    idName: String,
    backgroundColor: String,
    activeColor: {
      type: String,
      default: "#2d8cf0",
    },
    openBackColorChange: {
      type: Boolean,
      default: true,
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    icon: String,
    iconSize: {
      type: Number,
      default: 40,
    },
    iconColor: {
      type: String,
      default: "#b5b5c5",
    },
    image: String,
    width: {
      type: String,
      default: "40px",
    },
    height: {
      type: String,
      default: "40px",
    },
    title: String,
    titleColor: {
      type: String,
      default: "#7e8299",
    },
    titleSize: {
      type: String,
      default: "16px",
    },
    titleWeight: {
      type: Number,
      default: 600,
    },
  },
  data() {
    return {
      clicked: false,
      realIconColor: this.iconColor,
      realTitleColor: this.titleColor,
      realBackgroundColor: this.backgroundColor,
    };
  },
  methods: {
    click() {
      this.clicked = !this.clicked;
      if (this.clicked) {
        if (this.openBackColorChange) {
          this.realBackgroundColor = this.activeColor;
          this.bordered = false;
          this.realIconColor = "#fff";
          this.realTitleColor = "#fff";
        } else {
          this.realIconColor = this.activeColor;
          this.realTitleColor = this.activeColor;
        }
      } else {
        if (this.openBackColorChange) {
          this.realBackgroundColor = this.backgroundColor;
          this.bordered = false;
          this.realIconColor = this.iconColor;
          this.realTitleColor = this.titleColor;
        } else {
          this.realIconColor = this.iconColor;
          this.realTitleColor = this.titleColor;
        }
      }
    },
    itemHover() {
      if (!this.clicked) {
        this.realIconColor = this.activeColor;
        this.realTitleColor = this.activeColor;
      }
    },
    removeHover() {
      if (!this.clicked) {
        this.realIconColor = this.iconColor;
        this.realTitleColor = this.titleColor;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.card-content {
  height: 150px;
  padding: 26px 30px;
}
.card-app {
  cursor: pointer;
  .card-body {
    display: flex;
    flex-direction: column;
    height: 102px;
    justify-content: center;
    align-items: center;
    .card-icon {
      transition: all 0.2s ease;
    }
    .card-title {
      transition: all 0.2s ease;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 10px;
    }
  }
}
</style>


