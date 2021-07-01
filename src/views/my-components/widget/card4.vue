<template>
  <Card
    :padding="0"
    :bordered="bordered"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div
      class="card-content card4"
      :style="{ backgroundImage: backgroundImage }"
    >
      <div class="card-body" :style="{ height: cardHeight }">
        <div
          class="card-title"
          :style="{
            color: titleColor,
            fontSize: titleSize,
            fontWeight: titleWeight,
          }"
        >
          {{ title }}
        </div>
        <div>
          <div
            class="card-time"
            :style="{
              color: timeColor,
              fontSize: timeSize,
              fontWeight: timeWeight,
              marginBottom: timeBottom,
            }"
          >
            {{ time }}
          </div>
          <div
            class="card-description"
            :style="{
              color: descriptionColor,
              fontSize: descriptionSize,
              fontWeight: descriptionWeight,
              marginBottom: descriptionBottom,
            }"
          >
            {{ description }}
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  name: "card4",
  components: {},
  props: {
    cardHeight: {
      type: String,
      default: "102px",
    },
    backgroundColor: String,
    backgroundImage: String,
    bordered: {
      type: Boolean,
      default: true,
    },
    title: String,
    titleColor: {
      type: String,
      default: "#b5b5c5",
    },
    titleSize: {
      type: String,
      default: "16px",
    },
    titleWeight: {
      type: Number,
      default: 500,
    },
    time: String,
    timeColor: {
      type: String,
      default: "#1bc5bd",
    },
    timeSize: {
      type: String,
      default: "12px",
    },
    timeWeight: {
      type: Number,
      default: 500,
    },
    timeBottom: {
      type: String,
      default: "10px",
    },
    description: String,
    descriptionColor: {
      type: String,
      default: "#3f4255",
    },
    descriptionSize: {
      type: String,
      default: "16px",
    },
    descriptionWeight: {
      type: Number,
      default: 600,
    },
    descriptionBottom: {
      type: String,
      default: "0px",
    },
  },
};
</script>
<style lang="less" scoped>
.card-content {
  padding: 26px 30px;
}
.card4 {
  background-position: right top;
  background-size: 30% auto;
  background-repeat: no-repeat;
  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    .card-description {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>


