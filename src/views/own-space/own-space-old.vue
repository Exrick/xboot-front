<style lang="less">
@import "./own-space-old.less";
</style>

<template>
    <div class="own-space">
        <Card>
            <Tabs :animated="false">
                <TabPane label="基本信息" name="info">
                  <Form 
                      ref="userForm"
                      :model="userForm" 
                      :label-width="100" 
                      label-position="right"
                  >
                      <FormItem label="用户头像：">
                          <div class="upload-list" v-for="item in uploadList" :key="item.url">
                            <template v-if="item.status === 'finished'">
                                <img :src="item.url">
                                <div class="upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                          </div>
                          <Upload
                              ref="upload"
                              :show-upload-list="false"
                              :default-file-list="defaultList"
                              :on-success="handleSuccess"
                              :on-error="handleError"
                              :format="['jpg','jpeg','png','gif']"
                              :max-size="5120"
                              :on-format-error="handleFormatError"
                              :on-exceeded-size="handleMaxSize"
                              :before-upload="handleBeforeUpload"
                              type="drag"
                              :action="uploadFileUrl"
                              :headers="accessToken"
                              style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="md-camera" size="20"></Icon>
                            </div>
                        </Upload>
                      </FormItem>
                      <FormItem label="用户账号：">
                          <span>{{userForm.username}}</span>
                      </FormItem>
                      <FormItem label="性别：">
                          <RadioGroup v-model="userForm.sex">
                            <Radio v-for="(item, i) in dictSex" :key="i" :label="Number(item.value)">{{item.title}}</Radio>
                          </RadioGroup>
                      </FormItem>
                      <FormItem label="手机号：">
                          <span>{{userForm.mobile}}</span>
                          <div style="display:inline-block;margin-left:20px;font-size:13px;">
                              <a @click="showChangeMobile">修改手机号</a>
                          </div>
                      </FormItem>
                      <FormItem label="邮箱：">
                          <span>{{userForm.email}}</span>
                          <div style="display:inline-block;margin-left:20px;font-size:13px;">
                              <a @click="showChangeEmail">修改邮箱</a>
                          </div>
                      </FormItem>
                      <FormItem label="地址：" >
                          <al-cascader v-model="userForm.addressArray" @on-change="changeAddress" data-type="code" level="2" style="width:250px"/>
                      </FormItem>
                      <FormItem label="所属部门：">
                          <span>{{ userForm.departmentTitle }}</span>
                      </FormItem>
                    <FormItem label="用户类型：">
                          <span>{{ userForm.typeTxt }}</span>
                      </FormItem>
                      <FormItem label="创建时间：">
                          <span>{{ userForm.createTime }}</span>
                      </FormItem>
                      <FormItem>
                          <Button type="primary" style="width: 100px;margin-right:5px" :loading="saveLoading" @click="saveEdit">保存</Button>
                          <Button @click="cancelEditUserInfo">取消</Button>
                      </FormItem>
                  </Form>
                </TabPane>
                <TabPane label="绑定第三方账号" name="social">
                  <div class="sorry">
                    <img src="@/assets/sorry.png">
                    <span class="text">抱歉，请获取完整版</span>
                    <Button to="http://xpay.exrick.cn/pay?xboot" target="_blank" type="error" icon="md-paper-plane">立即获取</Button>
                  </div>
                </TabPane>
            </Tabs>
            
        </Card>

        <Modal title="修改手机号" v-model="editMobileVisible" :closable='false' :mask-closable=false :width="500">
            <Form ref="mobileEditForm" :model="mobileEditForm" :label-width="60" :rules="mobileEditValidate">
                <FormItem label="手机号" prop="mobile">
                    <Input v-model="mobileEditForm.mobile" @on-change="hasChangePhone" placeholder="请输入新手机号"/>
                </FormItem>
                <FormItem label="验证码" prop="code" :error="codeError">
                    <Input v-model="mobileEditForm.code" placeholder="请输入您收到的短信验证码" style="width:200px;margin-right:5px;"/>
                    <div style="display:inline-block;position:relative;">
                        <Button @click="getIdentifyCode" :disabled="canGetIdentifyCode">{{ gettingIdentifyCodeBtnContent }}</Button>
                    </div>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelInputCodeBox">取消</Button>
                <Button type="primary" :loading="checkIdentifyCodeLoading" @click="submitCode">提交</Button>
            </div>
        </Modal>
        <Modal title="修改邮箱" v-model="editEmailVisible" :closable='false' :mask-closable=false :width="500">
            <Form ref="emailEditForm" :model="emailEditForm" :label-width="90" :rules="emailEditValidate">
                <FormItem label="新邮箱地址" prop="email">
                    <Input v-model="emailEditForm.email" @on-change="hasChangeEmail" placeholder="请输入新邮箱地址"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelEditEmail">取消</Button>
                <Button type="primary" :disabled="canSendEditEmail" :loading="sendVerifyEmailLoading" @click="sendVerifyEmail">发送验证邮件</Button>
            </div>
        </Modal>
        <Modal title="图片预览" v-model="viewImage" draggable>
          <img :src="imgUrl" style="width: 80%;margin: 0 auto;display: block;">
          <div slot="footer">
            <Button @click="viewImage=false">关闭</Button>
          </div>
        </Modal>
    </div>
</template>

<script>
import {
  userInfoEdit,
  relatedInfo,
  unRelate,
  githubLogin,
  qqLogin,
  weiboLogin,
  uploadFile,
  getDictDataByType
} from "@/api/index";
import Cookies from "js-cookie";
export default {
  name: "ownspace_index",
  data() {
    const validePhone = (rule, value, callback) => {
      var re = /^1[0-9]{10}$/;
      if (!re.test(value)) {
        callback(new Error("请输入正确格式的手机号"));
      } else {
        callback();
      }
    };
    return {
      accessToken: {},
      uploadFileUrl: uploadFile,
      userForm: {
        id: "",
        avatar: "",
        username: "",
        sex: "",
        mobile: "",
        email: "",
        status: "",
        type: "",
        typeTxt: "",
        address: "",
        addressArray: []
      },
      mobileEditForm: {
        mobile: "",
        code: ""
      },
      emailEditForm: {
        email: ""
      },
      defaultList: [
        {
          url: ""
        }
      ],
      uploadList: [],
      viewImage: false,
      imgUrl: "",
      codeError: "",
      initPhone: "",
      initEmail: "",
      uid: "", // 登录用户的userId
      saveLoading: false,
      identifyError: "", // 验证码错误
      savePassLoading: false,
      oldPassError: "",
      identifyCodeRight: false, // 验证码是否正确
      hasGetIdentifyCode: false, // 是否点了获取验证码
      canGetIdentifyCode: false, // 是否可点获取验证码
      checkIdentifyCodeLoading: false,
      mobileEditValidate: {
        mobile: [
          { required: true, message: "请输入手机号码" },
          { validator: validePhone }
        ]
      },
      emailEditValidate: {
        email: [
          { required: true, message: "请输入邮箱地址" },
          { type: "email", message: "邮箱格式不正确" }
        ]
      },
      editMobileVisible: false, // 显示填写验证码box
      gettingIdentifyCodeBtnContent: "获取验证码", // “获取验证码”按钮的文字
      editEmailVisible: false,
      sendVerifyEmailLoading: false,
      canSendEditEmail: true,
      github: {
        related: false,
        id: "",
        username: ""
      },
      qq: {
        related: false,
        id: "",
        username: ""
      },
      weibo: {
        related: false,
        id: "",
        username: ""
      },
      jumping: false,
      dictSex: []
    };
  },
  methods: {
    init() {
      this.getDictSexData();
      this.accessToken = {
        accessToken: this.getStore("accessToken")
      };
      let v = JSON.parse(Cookies.get("userInfo"));
      // 转换null为""
      for (let attr in v) {
        if (v[attr] === null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let userInfo = JSON.parse(str);
      userInfo.addressArray = [];
      this.userForm = userInfo;
      this.initPhone = userInfo.mobile;
      this.mobileEditForm.mobile = userInfo.mobile;
      this.initEmail = userInfo.email;
      this.emailEditForm.email = userInfo.email;
      this.defaultList[0].url = userInfo.avatar;
      if (userInfo.address !== null && userInfo.address !== "") {
        this.userForm.address = userInfo.address;
        this.userForm.addressArray = JSON.parse(userInfo.address);
      }
      if (this.userForm.type === 0) {
        this.userForm.typeTxt = "普通用户";
      } else if (this.userForm.type === 1) {
        this.userForm.typeTxt = "管理员";
      }
    },
    getDictSexData(){
      // 获取性别字典数据
      getDictDataByType("sex").then(res => {
        if(res.success){
          this.dictSex = res.result
        }
      })
    },
    handleView(imgUrl) {
      this.imgUrl = imgUrl;
      this.viewImage = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      if (res.success === true) {
        file.url = res.result;
        this.userForm.avatar = res.result;
        this.defaultList[0].url = res.result;
        this.$refs.upload.fileList.splice(0, 1);
      } else {
        this.$Message.error(res.message);
      }
    },
    handleError(error, file, fileList) {
      this.$Message.error(error.toString());
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "不支持的文件格式",
        desc:
          "所选文件‘ " +
          file.name +
          " ’格式不正确, 请选择 .jpg .jpeg .png .gif格式文件"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小过大",
        desc: "所选文件‘ " + file.name + " ’大小过大, 不得超过 5M."
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 2;
      if (!check) {
        this.$Notice.warning({
          title: "最多只能上传 1 张图片"
        });
      }
      return check;
    },
    showChangeMobile() {
      this.editMobileVisible = true;
    },
    showChangeEmail() {
      this.editEmailVisible = true;
    },
    getIdentifyCode() {
      this.hasGetIdentifyCode = true;
      this.$refs["mobileEditForm"].validate(valid => {
        if (valid) {
          this.canGetIdentifyCode = true;
          let timeLast = 60;
          let timer = setInterval(() => {
            if (timeLast >= 0) {
              this.gettingIdentifyCodeBtnContent = timeLast + "秒后重试";
              timeLast -= 1;
            } else {
              clearInterval(timer);
              this.gettingIdentifyCodeBtnContent = "获取验证码";
              this.canGetIdentifyCode = false;
            }
          }, 1000);
          this.editMobileVisible = true;
          // you can write ajax request here
        }
      });
    },
    cancelEditUserInfo() {
      this.$store.commit("removeTag", "ownspace_old");
      localStorage.pageOpenedList = JSON.stringify(
        this.$store.state.app.pageOpenedList
      );
      let lastPageName = "";
      let length = this.$store.state.app.pageOpenedList.length;
      if (length > 1) {
        lastPageName = this.$store.state.app.pageOpenedList[length - 1].name;
      } else {
        lastPageName = this.$store.state.app.pageOpenedList[0].name;
      }
      this.$router.push({
        name: lastPageName
      });
    },
    saveEdit() {
      this.saveLoading = true;
      let params = this.userForm;
      delete params.nickName;
      delete params.description;
      userInfoEdit(params).then(res => {
        this.saveLoading = false;
        if (res.success === true) {
          this.$Message.success("保存成功");
          // 更新用户信息
          Cookies.set("userInfo", this.userForm);
          // 更新头像
          this.$store.commit("setAvatarPath", this.userForm.avatar);
        }
      });
    },
    changeAddress() {
      this.userForm.address = JSON.stringify(this.userForm.addressArray);
    },
    cancelInputCodeBox() {
      this.editMobileVisible = false;
      this.userForm.mobile = this.initPhone;
    },
    cancelEditEmail() {
      this.editEmailVisible = false;
      this.emailEditForm.email = this.initEmail;
    },
    submitCode() {
      this.checkIdentifyCodeLoading = true;
      this.$refs["mobileEditForm"].validate(valid => {
        if (valid) {
          if (this.mobileEditForm.code.length === 0) {
            this.codeError = "请填写短信验证码";
            this.checkIdentifyCodeLoading = false;
            return;
          } else {
            this.$Message.success("修改成功");
            this.editMobileVisible = false;
            this.checkIdentifyCodeLoading = false;
          }
        }
      });
    },
    hasChangePhone() {
      if (this.mobileEditForm.mobile === this.initPhone) {
        this.canGetIdentifyCode = true;
      } else {
        this.$refs["mobileEditForm"].validate(valid => {
          if (valid) {
            this.canGetIdentifyCode = false;
          } else {
            this.canGetIdentifyCode = true;
          }
        });
      }
    },
    hasChangeEmail() {
      if (this.emailEditForm.email === this.initEmail) {
        this.canSendEditEmail = true;
      } else {
        this.canSendEditEmail = false;
      }
    },
    sendVerifyEmail() {
      this.$refs["emailEditForm"].validate(valid => {
        if (valid) {
          this.sendVerifyEmailLoading = true;
          setTimeout(() => {
            this.sendVerifyEmailLoading = false;
            this.editEmailVisible = false;
            this.$Message.success("发送验证邮件成功，请注意查收");
          }, 1000);
        }
      });
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    this.init();
    this.hasChangePhone();
  }
};
</script>
