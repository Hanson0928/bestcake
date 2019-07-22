<template>
  <div class="box">
    <div class="listgoods">
      <div v-for="(item,index) in cartList" :key="index" class="listone">
        <div class="goodsone">
          <div class="checkbox" @click="chooseone(index);count()">
            <span :class="{selone:!item.boolyes,current:item.boolyes}"></span>
          </div>
          <div class="cartImg" @click="toShow(item)">
            <img :src="item.ImgUrl" alt />
          </div>
          <div class="cartText">
            <p>{{item.Name}}</p>
            <div class="center">
              <p class="size">{{item.Size}}</p>
              <div class="right">
                <span>
                  <img :src="delUrl" alt @click="add({data:item,num:2,index})" />
                </span>
                <span>{{item.num}}</span>
                <span>
                  <img
                    src="https://res.bestcake.com/m-images/ww/detail/add.png"
                    alt
                    @click="add({data:item,num:1,index})"
                  />
                </span>
              </div>
            </div>
            <p class="allprice">{{item.CurrentPrice*item.num+'.00'}}</p>
          </div>
        </div>
        <div class="cutbox">优惠方式
          <span>不参与活动</span>
        </div>
      </div>
    </div>
    <div class="nulltext" v-show="!isshow">
      <h1>购物车空空如也~~<span @click="toPath">去选购</span></h1>
    </div>
    <div class="after"></div>
    <div class="btmfixed">
      <div class="checkbox" @click="allsel();checkall()">
        <span :class="{selone:!ischooseone,current:ischooseone}"></span>
      </div>

      <div class="allchoose" @click="allsel();checkall()">全选</div>
      <div class="allclear" @click="clearBoth">清空</div>
      <div class="mathprice">
        <p>
          合计:
          <span class="sum">{{allprice+'.00'}}</span>
        </p>
        <p>
          已优惠:
          <span class="sale">0.00</span>
        </p>
      </div>
      <div class="sumprice" @click="sumpice">结算</div>
    </div>
  </div>
</template>
<script>
import { MessageBox,Toast } from "mint-ui";
import Store from 'storejs'
export default {
  name: "cart",
  data() {
    return {
      cartList: [],
      allprice: 0,
      delUrl: "https://res.bestcake.com/m-images/ww/detail/reduce-1.png",
      ischooseone: false,
      allchoose: "https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg",
      isshow:false
    };
  },
  created() {
    this.$store.dispatch('VuexInit')
    this.cartList = this.$store.state.cartList;
    this.cartList.map(item => {
      item.boolyes = false;
    });
  },
  methods: {
    sumpice(){
      if (Store.get("userInfo")) {
        if(this.allprice==0){
          Toast({ message: `还未选择商品哦~`, duration: 800 })
          return
        }
      Toast({ message: `购买成功,一共支付${this.allprice}元`, duration: 1500 });
    } else {
      Toast({ message: "还未登录", duration: 800 });
      setTimeout(() => {
        this.$router.push({ path: "/login" });
      }, 500);
    }
    },
    add({ data, num, index }) {
      this.$store.dispatch("add", { data, num, cart: "cart" });
      this.count();
    },
    count() {
      let num = 0;
      this.cartList.map(el => {
        if (el.boolyes) {
          num += el.num * el.CurrentPrice;
        }
      });
      this.allprice = num;
    },
    chooseone(index) {
      this.cartList[index].boolyes = !this.cartList[index].boolyes;
      this.ischooseone = this.cartList.every(el => {
        return el.boolyes;
      });
    },
    allsel() {
      this.ischooseone = !this.ischooseone;
    },
    checkall() {
      this.cartList.forEach(el => {
        el.boolyes = this.ischooseone;
      });
      this.count();
    },
    toPath(){
      this.$router.push({path:'/goods'})
    },
    toShow(item){
      console.log(item)
       this.$router.push({
        path:'/show',
        query:{
          City:this.$store.state.City,
          SupplyNo:item.SupplyNo,
          Name:item.Name,
          id:item.ID
        }
      })
    },
    clearBoth(){
      if(this.ischooseone){
        MessageBox.confirm('确定要清空购物车么?').then(action=>{
          this.$store.state.cartList=[]
          this.cartList=[]
        }).catch(err=>{
          
          return;
        })
      }
    }
  },
  watch: {
    cartList() {
      let arr=this.cartList.filter(el=>{
        return el.boolyes
      })
      // console.log(arr);
      let sum=0
      arr.map(el=>{
        sum+=el.CurrentPrice*el.num
      })
      // console.log(sum);
      this.allprice=sum
      // console.log(this.cartList.length);
      if(arr.length==this.cartList.length){
        this.ischooseone=true
      }
      if(arr.length!=this.cartList.length||this.cartList.length==0){
        this.ischooseone=false
      }
      if(arr.length==0){
        this.allprice=0
      }
      if(this.cartList.length!=0){
        this.isshow=true
      }else{
        this.isshow=false
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  background: #f7f7f7;
  position: relative;

  .after::after {
    content: "";
    display: block;
    overflow: hidden;
    height: r(40);
    background: #fff;
  }
  .nulltext{
    width: 100%;
    height: r(300);
    line-height: r(300);
    font-size: r(14);
    position: absolute;
    top: r(100);
    z-index: 100;
    span{
      font-size: r(16);
      color: #f2495e;
      text-decoration: underline;
    }
  }
  .btmfixed {
    position: fixed;
    background: #fff;
    bottom: r(50);
    width: 100%;
    height: r(56);
    display: flex;
    align-items: center;
    padding-left: r(15);
    box-sizing: border-box;
    .selone {
      margin-top: 0;
    }
    .current {
      margin-top: 0;
    }
    .allchoose {
      font-size: r(15);
      margin-right: r(15);
    }
    .allclear {
      font-size: r(13);
    }
    .mathprice {
      width: r(142.5);
      padding-right: r(15);
      text-align: right;
      .sum {
        font-size: r(18);
        color: #f2495e;
        font-weight: bold;
      }
      .sale {
        color: #333;
        font-weight: bold;
      }
    }
    .sumprice {
      background: #02d4d7;
      flex: 1;
      text-align: center;
      height: 100%;
      font-size: r(16);
      color: #fff;
      line-height: r(56);
    }
  }
}
.checkbox {
  width: r(20);
  margin-right: r(15);
  .selone {
    display: block;
    width: r(20);
    height: r(20);
    margin-top: r(8);
    background: url("../../assets/images/mw_firm_duihao_2.jpg") no-repeat 100%/100%;
  }
  .current {
    display: block;
    width: r(20);
    height: r(20);
    margin-top: r(8);
    background: url("../../assets/images/mw_firm_duihao_1.jpg") no-repeat 100%/100%;
  }
}
.listgoods {
  .listone {
    margin-bottom: r(15);
    background: #fff;
  }
  .goodsone {
    width: 100%;
    // height: r(200);
    padding: 0 r(15);
    box-sizing: border-box;
    margin-bottom: r(15);
    // float: left;
    display: flex;
    align-items: center;
    line-height: 1.6;

    .cartImg {
      img {
        width: r(114);
      }
      margin-right: r(15);
    }
    .cartText {
      width: r(195);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      font-size: r(16);
      .center {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: r(25);
        margin: r(4.5) 0;
        .size {
          width: r(97.5);
          font-size: r(12);
          color: #ccc;
          text-align: left;
        }
        .right {
          float: right;
          font-size: r(16);
          line-height: 1.6;
          // color: #9a9a9a;
          display: flex;
          align-items: center;
          span {
            display: block;
            width: r(28.75);
            height: r(22);
            img {
              width: r(12);
            }
          }
        }
      }
      .allprice {
        font-size: r(13);
        color: #030303;
        font-weight: bold;
      }
    }
  }
  .cutbox {
    width: r(329);
    margin-left: r(46);
    box-sizing: border-box;
    color: #f2495e;
    font-weight: bold;
    text-align: left;
    height: r(49);
    font-size: r(14);
    line-height: r(49);
    border-top: r(1) solid #cccccc;
    span{
      color: #030303;
      font-weight: normal;
    }
  }
}
</style>
