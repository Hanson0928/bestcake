<template>
  <div class="box">
    <p class="uploadImg">
      <span>
        <img :src="userInfo.avater" alt />
      </span>
      <em>{{username}}</em>
    </p>
    <p class="clup">
      <span>
        <i>会员等级</i>
        <b>V0</b>
      </span>
      <span>
        <i>吉致币</i>
        <b>0</b>
      </span>
      <span>
        <i>优惠券</i>
        <b>0</b>
      </span>
      <span>
        <i>兑换券</i>
        <b>0</b>
      </span>
    </p>
    <div class="btm">
      <p>客服热线：400-627-5757</p>
      <p>服务协议与证照信息</p>
    </div>
  </div>
</template>

<script>
import { Toast, MessageBox } from "mint-ui";
import Store from "storejs";
export default {
  data() {
    return {
      userInfo: {},
      username: ""
      // url:''
    };
  },
  created() {
    if (Store.get("userInfo")) {
      this.userInfo = Store.get("userInfo");
      this.username = this.userInfo.username;
      // this.url=this.userInfo.avater
    } else {
      Toast({ message: "还未登录", duration: 500 });
      setTimeout(() => {
        this.$router.push({ path: "/login" });
      }, 500);
    }
  }
};
</script>


<style lang="scss" scoped>
.box {
  width: 100%;
  position: fixed;
  background: rgb(247, 247, 247);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  .uploadImg {
    height: auto;
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    padding: r(20) 0 r(10) 0;
    box-sizing: border-box;
    span {
      display: block;
      width: r(80);
      height: r(80);
      border: r(1) solid #ccc;
      border-radius: r(50);
      position: relative;
      // padding: r(5);
      // box-sizing: border-box;
      img {
        position: absolute;
        left: 50%;
        top: 50%;
        // margin:0 auto;
        width: r(60);
        height: r(60);
        margin-left: r(-30);
        margin-top: r(-30);
        // height: r(60);
      }
    }
    em {
      font-style: normal;
      display: block;
      margin: r(8) 0;
      border: r(1) solid #fff;
      border-radius: r(20);
      padding: r(2) r(10);
      box-sizing: border-box;
      font-size: r(14);
      // background:rgba(20, 180, 140, 0.6)
    }
  }
  .clup {
    width: 100%;
    background: #fff;
    display: flex;
    // margin-top: r(15);
    height: auto;
    span {
      flex: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      i {
        height: r(20);
        line-height: r(20);
        font-style: normal;
        color: #ccc;
      }
      b {
        height: r(40);
        line-height: r(40);
        font-size: r(18);
        font-weight: normal;
      }
    }
  }
  .btm {
    width: 100%;
    flex: 1;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p{
        width: 100%;
        margin: r(20);
    }
  }
}
</style>
