<style lang="less">
@import "../../styles/common.less";
@import "./access.less";
</style>

<template>
    <div class="access">
        <Row>
            <Col span="8">
                <Card>
                    <p slot="title">
                        <Icon type="android-contact"></Icon>
                        当前用户
                    </p>
                    <div class="access-user-con access-current-user-con">
                        <img :src="avatorPath" alt="">
                        <p>当前用户本页面拥有按钮权限:</p>
                        <b>{{ buttonTypes }}</b>
                    </div>
                </Card>
            </Col>
            <Col span="16" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="android-contacts"></Icon>
                        当前用户本页面拥有的按钮操作
                    </p>
                    <div class="access-user-con access-change-access-con">
                        <Col span="4" class="buttons">
                            <Row type="flex" justify="center" align="middle" class="access-change-access-con-row">
                                <Button v-hasButton="'add'" type="primary">添加按钮</Button>
                                <Button v-hasButton="'edit'" type="ghost">编辑按钮</Button>
                                <Button v-hasButton="'delete'" type="error">删除按钮</Button>
                            </Row>
                        </Col>
                        <Col span="16" class="padding-left-10">
                            <Row type="flex" justify="center" align="middle" class="access-change-access-con-row">
                                <p>
                                    您可以通过更换测试用户账号：test或test2 密码：123456，然后观察该页面此处按钮的变化<br><br>
                                    自定义权限按钮标签："v-hasButton"，示例：{{example}}<br><br>
                                    其他页面为演示功能，前台未配置隐藏权限按钮
                                </p>
                            </Row>
                        </Col>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "access_index",
  data() {
    return {
      buttonTypes: [],
      example: "<Button v-hasButton=\"'add'\">添加按钮</Button>"
    };
  },
  computed: {
    avatorPath() {
      return localStorage.avatorImgPath;
    }
  },
  methods: {
    initMeta() {
      let buttonTypes = this.$route.meta.buttonTypes;
      if (buttonTypes !== null && buttonTypes !== undefined) {
        this.buttonTypes = buttonTypes;
      }
    }
  },
  created() {
    this.initMeta();
  }
};
</script>

<style>
</style>
