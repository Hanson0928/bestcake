<template>
  <div class="box">
    <div class="backlogo">
      <i class="fa fa-angle-left fa-lg" @click="backHome"></i>
    </div>
    <div class="logintitle">
      <h1>密码登录</h1>

      <form action>
        <p>用户名</p>
        <p class="username">
          <input type="text" />
        </p>
        <p class="text">
          密码
          <span @click="showpwd" ref="showhide">
            <span v-show="isshow">显示</span>
            <span v-show="!isshow">隐藏</span>
          </span>
        </p>
        <p class="username">
          <input type="password" v-show="isshow" />
          <input type="text" v-show="!isshow" />
        </p>
        <p class="loginbtn">
          <span @click="login">登录</span>
          <i @click="toPath">没有账号?去注册</i>
        </p>
      </form>
    </div>
  </div>
</template>
<script>
import { Toast, MessageBox } from "mint-ui";
import Store from 'storejs'
export default {
  data() {
    return {
      isshow: true,
      params: {}
    };
  },
  methods: {
    //-1 账号不存在
    //-2 密码错误
    //-3 用户已经注册
    //1 登录成功
    //2注册成功
    backHome(){
      this.$router.push({path:'/index'})
    },
    login() {
      if (this.isshow) {
        this.params.password = this.$refs.showhide.parentNode.nextElementSibling.children[0].value;
      } else {
        this.params.password = this.$refs.showhide.parentNode.nextElementSibling.children[1].value;
      }
      this.params.username = this.$refs.showhide.parentNode.previousElementSibling.children[0].value;
      if (this.params.username && this.params.password) {
        this.$apis.login(this.params).then(res => {
          console.log(res);
          let status = res.data.status;
          switch (status) {
            case -1:
              MessageBox.confirm(`${res.data.msg},去注册一个?`, "")
                .then(action => {
                  if (action == "confirm") {
                    this.$router.push({ path: "/register" });
                  }
                })
                .catch(err => {
                  if (err == "cancle") {
                  }
                });
              break;
            case -2:
              Toast({
                message: res.data.msg,
                duration: 800
              });
              break;
            case 1:
              Store.set('userInfo',res.data.userInfo)
              Toast({
                message: res.data.msg,
                duration: 800
              });
              setTimeout(()=>{
                this.$router.push({path:'/user'})
              },500)
              break;
          }
        });
      } else {
        Toast({
          message: "请输入用户名和密码",
          duration: 800
        });
      }
      console.log(this.params);
      // return;
    },
    showpwd() {
      console.log(this.$refs);
      this.isshow = !this.isshow;

      let val = this.$refs.showhide.parentNode.nextElementSibling.children[0]
        .value;
      let val2 = this.$refs.showhide.parentNode.nextElementSibling.children[1]
        .value;
      console.log(val);
      console.log(val2);
      if (this.isshow) {
        this.$refs.showhide.parentNode.nextElementSibling.children[0].value = val2;
      } else {
        this.$refs.showhide.parentNode.nextElementSibling.children[1].value = val;
      }
    },
    toPath() {
      this.$router.push({ path: "/register" });
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: rgba(54, 209, 220, 1);
  height: 100%;
  color: #fff;
  .backlogo {
    width: 100%;
    height: r(42);
    line-height: r(42);
    text-align: left;
    .fa-angle-left {
      font-size: r(28);
      font-weight: bold;
      margin-left: r(15);
    }
  }
  .logintitle {
    text-align: left;
    margin-left: r(20);
    line-height: 1.6;
    padding-right: r(15);
    box-sizing: border-box;
    h1 {
      font-size: r(32);
      font-weight: bold;
    }
    p {
      font-size: r(14);
      height: r(19);
    }
    .username {
      width: 100%;
      height: r(42);
      border-bottom: r(1) solid #fff;
      position: relative;
      input {
        width: 100%;
        height: 80%;
        position: absolute;
        bottom: r(2);
        border: none;
        background: rgba(54, 209, 220, 1);
        color: #fff;
        font-size: r(16);
      }
    }
    .text {
      margin-top: r(20);
      overflow: hidden;
      span {
        float: right;
      }
    }
    .loginbtn {
      span {
        // display: block;
        float: left;
        width: r(124);
        height: r(32);
        text-align: center;
        line-height: r(32);
        font-size: r(16);
        border: r(1) solid #fff;
        border-radius: r(20);
        margin-top: r(30);
      }
      i {
        float: right;
        margin-top: r(32);
        line-height: r(32);
        font-size: r(12);
        text-decoration: underline;
      }
    }
  }
}
</style>

