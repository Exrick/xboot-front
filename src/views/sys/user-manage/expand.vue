<style scoped>
.expand-row {
  margin-bottom: 16px;
}
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="6">
                <span>昵称: </span>
                <span>{{ row.nickName }}</span>
            </Col>
            <Col span="6">
                <span>个人简介: </span>
                <span>{{ row.description }}</span>
            </Col>
            <Col span="6">
                <span>所在省市: </span>
                <al-cascader v-if="row.address" :value="JSON.parse(row.address)" size="small" disabled data-type="code" level="2" style="width:230px;display: inline-block;"/>
            </Col>
            <Col span="6">
                <span>街道地址: </span>
                <span>{{ row.street }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <span>密码强度: </span>
                 <span>{{ row.passStrength }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
  name: "expandRow",
  props: {
    row: Object
  }
};
</script>