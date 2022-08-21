<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去
          <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" />
        <span class="correct-msg" v-if="verifyPhone">手机号格式正确</span>
        <span class="error-msg" v-else-if="phone">手机号格式不正确</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" />
        <button @click="getCode">获取验证码</button>
        <span class="correct-msg" v-if="verifyCode">验证码格式正确</span>
        <span class="error-msg" v-else-if="code">验证码格式不正确</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="text"
          placeholder="请输入你的登录密码"
          v-model="password"
        />
        <span class="correct-msg" v-if="verifyPsw">密码格式正确</span>
        <span class="error-msg" v-else-if="password"
          >密码格式不正确,至少包含数字跟字母,长度在6-20位之内</span
        >
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="text" placeholder="请输入确认密码" v-model="password1" />
        <span class="correct-msg" v-if="password == password1 && password1"
          >密码一致</span
        >
        <span class="error-msg" v-else-if="password1">密码不一致</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="agree" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ isOk }}</span>
      </div>
      <div class="btn">
        <button @click="registerUser">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      code: "",
      password: "",
      password1: "",
      agree: "",
      isOk: "",
    };
  },
  computed: {
    //手机号验证
    verifyPhone() {
      let verPhone =
        /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
      return verPhone.test(this.phone);
    },
    //验证码验证
    verifyCode() {
      let verCode = /^[\d]{6}$/;
      return verCode.test(this.code);
    },
    //密码验证
    verifyPsw() {
      let verPsw =
        /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/;
      return verPsw.test(this.password);
    },
  },
  methods: {
    //获取验证码
    async getCode() {
      if (this.verifyPhone) {
        try {
          await this.$store.dispatch("user/getCode", this.phone);
          this.code = this.$store.state.user.code;
        } catch (error) {
          alert(error.message);
        }
      }
    },
    //注册
    registerUser() {
      let {
        verifyPhone,
        verifyCode,
        verifyPsw,
        phone,
        code,
        password,
        password1,
        agree,
      } = this;
      if (
        verifyPhone &&
        verifyCode &&
        verifyPsw &&
        password == password1 &&
        agree
      ) {
        try {
          this.$store.dispatch("user/registerUser", { phone, password, code });
          this.isOk = this.$store.state.user.message;
          this.$router.push("/login");
        } catch (error) {
          alert(error.message);
        }
      } else {
        this.isOk = "请填写完整数据";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .correct-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: green;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }

      button {
        width: 100px;
        height: 38px;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>