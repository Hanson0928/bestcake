<template>
  <div class="box" v-if="isflag">
    <div class="moregoods">更多商品</div>
    <div class="topimg">
      <div class="banner">
        <mt-swipe :auto="3000">
          <mt-swipe-item v-for="(item,index) in ImgUrlList" :key="index">
            <img :src="item" />
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="showtitle">
        <p v-text="routerData.Name"></p>
        <div class="active"></div>
      </div>
    </div>
    <div class="showtwxt">
      <div class="sweet qfc">
        <div class="cakeleft" v-text="'甜度'"></div>
        <div class="cakeright">
          <img :src="showInfo.SweetUrl" alt />
        </div>
      </div>
      <div class="sweet">
        <div class="cakeleft" v-text="'口味'"></div>
        <div class="cakeright" v-text="showInfo.CategoryName"></div>
      </div>
      <div class="sweet">
        <div class="cakeleft" v-text="'原材料'"></div>
        <div class="cakeright" v-text="showInfo.Resourse"></div>
      </div>
      <div class="sweet" v-if="showInfo.tips">
        <div class="cakeleft" v-text="'适合人群'"></div>
        <div class="cakeright" v-text="showInfo.tips"></div>
      </div>
      <div class="sweet">
        <div class="cakeleft" v-text="'保鲜条件'"></div>
        <div class="cakeright" v-text="showInfo.KeepFresh"></div>
      </div>
    </div>
    <div class="evaluate">
      <div class="left">
        <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-a.png" alt />
        <span>商品评价</span>
      </div>
      <div class="right">
        <span>(1398条)</span>
        <i></i>
      </div>
    </div>
    <div class="chooseSize">
      <ul class="showsizeList">
        <li v-for="(item,index) in showType" :key="index">
          <div
            :class="{'size':true,'current':cindex==index}"
            v-text="item.Size"
            @click="sel(item,index)"
          ></div>
        </li>
      </ul>
      <ul class="showtypeList" v-if="PackingList.length!=0">
        <li v-for="(item,index) in PackingList" :key="index">
          <div class="rulesList">
            <img :src="PackingList[index].imgUrl" alt />
            <div v-text="PackingList[index].rules"></div>
          </div>
        </li>
      </ul>
    </div>

    <div class="addcartNum">
      <div class="left">购买数量</div>
      <div class="right">
        <span>
          <img :src="delUrl" alt @click="crease(1)" />
        </span>
        <span>{{num}}</span>
        <span>
          <img src="https://res.bestcake.com/m-images/ww/detail/add.png" alt @click="crease(2)" />
        </span>
      </div>
    </div>
    <gonggao></gonggao>
    <div class="addcarLast">
      <div class="left">
        <p v-text="num*showPrice.CurrentPrice+'.00'" class="currentprice"></p>
        <p>
          <span>已优惠:</span>
          <span class="cutPrice">0.00</span>
        </p>
      </div>
      <div class="right">
        <span class="addcar" @click="toPath()">加入购物车</span>
        <span class="rightbuy" @click="rightbuy">立即购买</span>
      </div>
    </div>
  </div>
</template>

<script>
import Store from 'storejs'
import { Indicator,Toast,MessageBox } from "mint-ui";
export default {
  data() {
    return {
      routerData: {},
      initData: "",
      ImgUrlList: [],
      showInfo: {},
      tips: "",
      cindex: 0,
      PackingList: [],
      isflag: false,
      showType: [],
      showPrice: {},
      num: 1,
      delUrl: "https://res.bestcake.com/m-images/ww/detail/reduce-0.png",
      isexit: false,
      showSize: {}
    };
  },
  created() {
    Indicator.open("请稍等...");
  },
  mounted() {
    this.routerData = this.$route.query;
    this.pageInit();
  },
  methods: {
    pageInit() {
      this.ImgUrlList = this.getImg(this.routerData.SupplyNo);
    },
    getImg(No) {
      // https://res.bestcake.com/m-images/jd-detail/极地牛乳/%E6%9E%81%E5%9C%B0%E7%89%9B%E4%B9%B3-1.jpg?v=20170607
      if (No.indexOf("NS") != -1) {
        let data = {
          Name: this.routerData.Name,
          c: "NsCakeCenter",
          m: "GetNSCakeByName",
          v: new Date().getTime()
        };
        this._getShowData(data, res => {
          this.initData = res;
          // console.log(this.initData);
        });
        let imgarr = [];
        for (let i = 1; i < 5; i++) {
          let path = `https://res.bestcake.com/m-images/ns-detail/${this.routerData.Name}/${this.routerData.Name}-${i}.jpg`;
          imgarr.push(path);
        }
        return imgarr;
      } else if (No.indexOf("KSK") != -1) {
        let data = {
          City: this.routerData.City,
          ProName: this.routerData.Name,
          c: "Product",
          m: "GetCakeByName",
          v: new Date().getTime()
        };
        this._getShowData(data, res => {
          this.initData = res;
        });
        let imgarr = [];
        for (let i = 1; i < 5; i++) {
          let path = `https://res.bestcake.com/m-images/jd-detail/${this.routerData.Name}/${this.routerData.Name}-${i}.jpg`;
          imgarr.push(path);
        }
        return imgarr;
      } else if (No.indexOf("RP") != -1) {
        let data = {
          Name: this.routerData.Name,
          c: "NsCakeCenter",
          m: "GetRuPCakeByName",
          v: new Date().getTime()
        };
        this._getShowData(data, res => {
          this.initData = res;
          // console.log(this.initData);
        });
        let imgarr = [];
        for (let i = 1; i < 5; i++) {
          let path = `https://res.bestcake.com/m-images/rp-detail/${this.routerData.Name}/${this.routerData.Name}-${i}.jpg`;
          imgarr.push(path);
        }
        return imgarr;
      } else if (No.indexOf("JZ") != -1) {
        let data = {
          City: this.routerData.City,
          ProName: this.routerData.Name,
          c: "IndexCenter",
          m: "GetjzCakeInfo",
          v: new Date().getTime()
        };
        this._getShowData(data, res => {
          this.initData = res;
        });
        let imgarr = [];
        for (let i = 1; i < 5; i++) {
          let path = `https://res.bestcake.com/m-images/jz-detail/${this.routerData.Name}/${this.routerData.Name}-${i}.jpg`;
          imgarr.push(path);
        }
        return imgarr;
      }
    },
    _getShowData(data, callback) {
      this.$apis.getShowData(data).then(res => {
        callback(res.data.Tag);
      });
    },
    sel(item, index) {
      this.cindex = index;
      this.PackingList = item.PackingList;
      this.showPrice.CurrentPrice = item.CurrentPrice;
      this.showSize = item;
    },
    crease(number) {
      if (number == 1) {
        this.num--;
        if (this.num == 1) {
          this.delUrl =
            "https://res.bestcake.com/m-images/ww/detail/reduce-0.png";
        }
        if (this.num < 1) {
          this.num = 1;
          return;
        }
      } else {
        this.delUrl =
          "https://res.bestcake.com/m-images/ww/detail/reduce-1.png";
        this.num++;
      }
    },
    toPath() {
      // console.log(this.cindex);
      // console.log(this.showSize);
      let data = {
        City: this.$store.state.City,
        SupplyNo: this.showSize.SupplyNo,
        CurrentPrice: this.showSize.CurrentPrice,
        ID: this.showSize.Id || this.showSize.ID,
        num: this.num,
        Name: this.routerData.Name,
        Size: this.showSize.Size
      };
      this.$store.dispatch("add", { data, num: 1 });
      MessageBox({
        title: "",

        message: "成功添加到购物车",

        showCancelButton: true,

        confirmButtonText: "去结算",

        cancelButtonText: "再看看"
      }).then(action => {
        if (action == "confirm") {
          //  this.$router.push({name:"cart"})
          this.$router.push({ path: "/carts" });
        } else {
        }
      });
    },
    rightbuy(){
      if (Store.get("userInfo")) {
      Toast({ message: `购买成功,一共支付${this.num*this.showPrice.CurrentPrice}元`, duration: 1500 });
    } else {
      Toast({ message: "还未登录", duration: 500 });
      setTimeout(() => {
        this.$router.push({ path: "/login" });
      }, 500);
    }
  }
  },
  watch: {
    initData() {
      if (this.initData.length) {
        this.initData.map(el => {
          if (el.City == this.routerData.City) {
            this.showType.unshift(el);
          }
        });
        if (this.showType.length == 0) {
          // 当页面数据只有一个数组时
          this.showType = this.initData;
          let sizeArr = [
            { rules: "至少2-4人分享" },
            { rules: "至少需提前一天预约" }
          ];
          this.initData.map((el, index) => {
            this.showType[index].Size = el.KW;
            this.showType[index].PackingList = [];
            this.showType[index].PackingList = sizeArr;
            this.showType[index].PackingList.map((el, index) => {
              let path = `https://res.bestcake.com/m-images/ww/detail/icon-custom-`;
              el[
                "imgUrl"
              ] = `https://res.bestcake.com/m-images/ww/detail/icon-custom-${index +
                3}.png`;
            });
          });
          this.showInfo = this.showType[0];
          this.showInfo.Resource = this.showType[0].Resourse;
          this.showPrice.CurrentPrice = this.showInfo.CurrentPrice;
          this.PackingList = this.showType[0].PackingList;
          this.showInfo.SweetUrl = this.$global.setCandyUrl(
            this.initData[0].CurrentPro.Sweet
          );
        } else {
          this.showInfo = this.showType[0];
          this.showInfo.Resourse = this.showType[0].Resource;
          this.showPrice.CurrentPrice = this.showInfo.CurrentPrice;
          this.showInfo.SweetUrl = this.$global.setCandyUrl(
            this.showInfo.Sweet
          );
          if (this.showInfo.SupplyNo.indexOf("NS") != -1) {
            this.showInfo.KeepFresh =
              "最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时。5月1日~10月31日建议2天内食用 11月1日~翌年4月30日建议3天内食用。";
            this.showInfo.tips = "所有人群";
            this.showType.map(el => {
              let obj = JSON.parse(el.ProductConfig).pc;
              let sizeArr = [
                { rules: obj.configsize },
                { rules: obj.configpeople },
                { rules: obj.configware },
                { rules: obj.configtips }
              ];
              el.PackingList = sizeArr;
              el.PackingList.map((ele, index) => {
                let path = `https://res.bestcake.com/m-images/ww/detail/icon-custom-`;
                ele[
                  "imgUrl"
                ] = `https://res.bestcake.com/m-images/ww/detail/icon-custom-${index +
                  1}.png`;
              });
            });
            // this.sel(this.showType[0], 0);
          }
          if (this.showInfo.SupplyNo.indexOf("RP") != -1) {
            console.log(this.showType);
            this.showType.map(el => {
              el.PackingList = [];
            });
          }
        }
        this.sel(this.showType[0], 0);
        this.isflag = true;
        Indicator.close();
      } else {
        this.tips = JSON.parse(this.initData.Detail[0]).details_tips;
        this.showInfo = this.initData.infos;
        this.showInfo.tips = JSON.parse(this.initData.Detail[0]).details_tips;

        // https://res.bestcake.com/m-images/ww/jz/tiandu_3.png

        // 获取甜度
        this.showInfo.SweetUrl = this.$global.setCandyUrl(
          this.initData.infos.CakeType[0].Sweet
        );
        this.initData.infos.CakeType.map(el => {
          let sizeArr = [];
          let num = Number(el.Size.slice(0, 3));
          switch (num) {
            case 1.2:
              sizeArr = [
                { rules: "13.5*13.5cm" },
                { rules: "适合4-5人分享" },
                { rules: "含五人份餐具" },
                { rules: "至少需提前一天预约" }
              ];
              break;
            case 2.2:
              sizeArr = [
                { rules: "17*17cm" },
                { rules: "适合8-10人分享" },
                { rules: "含十人份餐具" },
                { rules: "至少需提前一天预约" }
              ];

              break;
            case 3.2:
              sizeArr = [
                { rules: "21*21cm" },
                { rules: "适合12-15人分享" },
                { rules: "含十五人份餐具" },
                { rules: "至少需提前一天预约" }
              ];
              break;
            case 7.2:
              sizeArr = [
                { rules: "27*40.5cm" },
                { rules: "适合35-40人分享" },
                { rules: "含四十人份餐具" },
                { rules: "至少需提前一天预约" }
              ];
              // sizeArr.push({ tablewaare: "含四十人份餐具" });
              // sizeArr.push({ Specifications: "27*40.5cm" });
              // sizeArr.push({ suggest: "适合35-40人分享" });
              // sizeArr.push({ rules: "至少需提前一天预约" });
              break;
          }
          el.PackingList = sizeArr;
          el.PackingList.map((ele, index) => {
            // https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png
            let path = `https://res.bestcake.com/m-images/ww/detail/icon-custom-`;
            ele[
              "imgUrl"
            ] = `https://res.bestcake.com/m-images/ww/detail/icon-custom-${index +
              1}.png`;
          });
        });

        this.showType = this.initData.infos.CakeType;
        this.isflag = true;
        this.sel(this.showType[0], 0);
        Indicator.close();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  background: #f7f7f7;
  height: 100%;
  position: relative;
  .moregoods {
    width: r(82.5);
    height: r(33.75);
    line-height: r(33.75);
    position: fixed;
    right: 0;
    top: r(20);
    background: rgba(255, 255, 255, 0.5);
    font-size: r(16);
    color: #000;
    z-index: 999;
    border-radius: r(10) 0 0 r(10);
    border: r(1) solid #333;
    text-align: center;
  }
  .topimg {
    background: #fff;
    .banner {
      width: 100%;
      height: r(445);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .showtitle {
      width: 100%;
      font-size: r(17);
      text-align: center;
      margin-top: r(7.5);
      overflow: hidden;
      p {
        width: r(218.75);
        margin: 0 auto;
        height: r(60);
        font-weight: bold;
        color: #000;
        line-height: 1.6;
      }
      .active {
        height: r(30);
        margin-bottom: r(30);
      }
    }
  }
  .showtwxt {
    background: #fff;
    margin-top: r(15);
    overflow: hidden;
    padding: r(34) 0;
    box-sizing: border-box;
    .sweet {
      overflow: hidden;
      text-align: left;
      margin-bottom: r(15);
      .cakeleft {
        width: r(60);
        float: left;
        color: #9a9a9a;
        font-size: r(14);
        margin-left: r(15);
        line-height: 1.6;
      }
      .cakeright {
        width: r(270);
        float: left;
        color: #252525;
        margin-left: r(15);
        line-height: 1.6;
        font-size: r(14);
        img {
          height: r(16);
          width: r(84);
          margin-top: r(2.25);
        }
      }
    }
  }
  .evaluate {
    background: #fff;
    margin: r(15) 0;
    padding: r(15);
    overflow: hidden;
    box-sizing: border-box;
    .left {
      text-align: left;
      width: r(187.5);
      float: left;
      line-height: 1.6;
      font-size: r(14);
      display: flex;
      align-items: center;
      img {
        margin-right: r(11);
        width: r(18);
        height: r(16);
      }
    }
    .right {
      float: right;
      font-size: r(14);
      line-height: 1.6;
      color: #9a9a9a;
      display: flex;
      align-items: center;
      i {
        display: block;
        width: r(9);
        height: r(16);
        background: url("../../assets/images/more.png") no-repeat center/100%;
        margin-left: r(4);
      }
    }
  }
  .chooseSize {
    background: #fff;
    margin-top: r(15);
    overflow: hidden;
    padding: r(30) 0;
    box-sizing: border-box;
    .showsizeList {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      li {
        .size {
          padding: 0 r(9.75);
          height: r(30);
          font-size: r(14);
          margin-left: r(15);
          border-radius: r(2);
          border: r(1) solid #ddd;
          line-height: r(30);
        }
        .size.current {
          background: #02d3d6;
          border: r(1) solid #02d3d6;
          color: #fff;
        }
      }
    }
    .showtypeList {
      margin-top: r(43);
      display: flex;
      flex-wrap: wrap;
      padding-left: r(15);
      li {
        width: 50%;
        margin-bottom: r(15);
        .rulesList {
          display: flex;
          font-size: r(14);
          align-items: center;
        }
        img {
          margin-right: r(10);
          width: r(22.5);
          height: r(22.5);
        }
      }
    }
  }
  .addcartNum {
    background: #fff;
    margin: r(15) 0;
    padding: r(15);
    overflow: hidden;
    box-sizing: border-box;
    .left {
      text-align: left;
      width: r(187.5);
      float: left;
      line-height: 1.6;
      font-size: r(14);
      display: flex;
      align-items: center;
    }
    .right {
      float: right;
      font-size: r(14);
      line-height: 1.6;
      color: #9a9a9a;
      display: flex;
      align-items: center;
      span {
        display: block;
        width: r(28.75);
        height: r(22);
        img {
          width: r(8);
        }
      }
    }
  }
  .gonggao {
    background: #fff;
  }

  .addcarLast {
    width: 100%;
    background: #f7f7f7;
    position: fixed;
    bottom: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      width: r(135);
      height: r(46);
      color: #333;
      line-height: 1.6;
      text-align: left;
      margin-left: r(15);
      .currentprice {
        color: #f2495e;
        font-size: r(17);
        font-weight: bold;
      }
    }
    .right {
      flex: 1;
      font-size: r(16);
      .addcar {
        float: left;
        width: r(110);
        padding: r(17) 0;
      }
      .rightbuy {
        float: left;
        width: r(115);
        color: #fff;
        background: #02d3d6;
        padding: r(17) 0;
      }
    }
  }
}
</style>


