<style lang="less">
</style>
<template>
  <div>
    <Card>
      <Tabs value="1">
        <TabPane label="慕课类" name="1">
          <CategoryMooc />
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import CategoryMooc from "./mooc/CategoryMooc.vue";
export default {
  name: "category",
  components: {
    CategoryMooc,
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