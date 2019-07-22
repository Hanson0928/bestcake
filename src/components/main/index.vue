<template>
  <div class="box">
    <div class="moreCity" v-show="ismoreCity">
      <div class="cityList">
        <div class="selcity">
          <div>选择城市</div>
        </div>
        <ul class="province">
          <li v-for="(item,index) in provinceList" :key="index" @click="selp(index)">{{item}}</li>
        </ul>
        <ul class="city">
          <li v-for="(item,index) in cityList" :key="index" @click="selc(index)">{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="top">
      <p>
        <i></i>
        <span v-text="cityone" @click="getMoreCity"></span>
        <em @click="getMoreCity"></em>
      </p>
    </div>
    <div class="banner">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for="(item,index) in SwiperBannerList" :key="index">
          <div class="imgdiv">
            <img :src="item.ImgUrl" />
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="bannerbtm">
      <p>
        <img src="https://res.bestcake.com/images/newIndex/title.png" alt />
      </p>
    </div>
    <div class="posiImg" v-for="(item,index) in AbsoluteBannerList" :key="index">
      <p>
        <img :src="item.ImgUrl" alt />
      </p>
    </div>
    <div class="kindList">
      <div>
        <ul>
          <li v-for="(item,index) in TopIconList" :key="index">
            <p>
              <img :src="item.ImgUrl" alt />
            </p>
            <p>
              <span v-text="item.ActName"></span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="notice">
      <p>
        <span class="left">通知</span>
        <marquee direction="left" class="right" v-text="NoticeList"></marquee>
      </p>
    </div>
    <div class="tableList">
      <ul>
        <li v-for="(item,index) in CenterContentList" :key="index">
          <img :src="item.ImgUrl" alt />
        </li>
      </ul>
    </div>

    <div class="swiperList">
      <ul>
        <li v-for="(item,index) in TabImgUrlList" :key="index">
          <div class="topImg">
            <img :src="item.TabImgUrl" alt />
          </div>
          <div class="btmImg">
            <swiper v-if="SaleList.length!=0">
              <div class="swiper-slide" v-for="(el,index) in item.SaleList" :key="index">
                <img :src="el.ImgUrl" @click="toPath(el)" />
                <h4 class="title" v-text="el.Name"></h4>
                <p>
                  <span class="price" v-text="'￥'+el.Price"></span>
                  <span class="size" v-text="'/'+el.Size"></span>
                </p>
              </div>
            </swiper>
          </div>
        </li>
      </ul>
    </div>
    <div class="zhanwei"></div>
    <!-- <footernav></footernav> -->
  </div>
</template>

<script>
// import footernav from "@/components/layout/footernav"
export default {
  name: "shouye",
  data() {
    return {
      AbsoluteBannerList: [],
      CenterContentList: [],
      NoticeList: "",
      SaleList: [],
      SwiperBannerList: [],
      TopIconList: [],
      TabImgUrlList: [],
      CakeList: [],
      cityone: "",
      cityList: [],
      provinceList: [],
      ismoreCity: true
    };
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      this._getIndexData(res => {
        // console.log(res);
        this.SwiperBannerList = res.SwiperBannerList;
        this.AbsoluteBannerList = res.AbsoluteBannerList;
        this.TopIconList = res.TopIconList;
        this.NoticeList = res.NoticeList;
        this.CenterContentList = res.CenterContentList;
        let cityarr = this.TopIconList[0].City.split(",");
        cityarr.forEach((el, index) => {
          if (el == "上海" || el == "北京" || el == "天津" || el == "重庆") {
            this.provinceList.push(el);
          } else {
            this.cityList.push(el);
          }
        });
        this.cityone = this.provinceList[0];
        this.$store.state.City = this.cityone;
        res.SaleList.forEach(ele => {
          var obj = {};
          this.SaleList.push(JSON.parse(ele.CakeList));
          obj.TabImgUrl = ele.TabImgUrl;
          obj.SaleList = JSON.parse(ele.CakeList);
          obj.SaleList.forEach(item => {
            item.ImgUrl = this.$global.setUrl(item);
          });
          this.TabImgUrlList.push(obj);
        });
      });
    },
    _getIndexData(callback) {
      this.$apis.getIndexData().then(res => {
        callback(res.data.Tag.mainresult);
      });
    },
    getMoreCity() {
      this.ismoreCity = true;
    },
    selp(index) {
      this.cityone = this.provinceList[index];
      this.$store.state.City = this.cityone;
      this.ismoreCity = false;
    },
    selc(index) {
      this.cityone = this.cityList[index];
      this.$store.state.City = this.cityone;
      this.ismoreCity = false;
    },
    toPath(item) {
      console.log(item);

      this.$router.push({
        path: "/show",
        query: {
          City: this.$store.state.City,
          SupplyNo: item.SupplyNo,
          Name: item.Name,
          id: item.Id
        }
      });
    }
  },
  components: {
    // footernav
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box {
  // width: 100%;
  height: auto;
  // overflow: hidden;
  .top {
    width: r(343);
    height: r(44);
    margin: 0 auto;
    overflow: hidden;
    line-height: r(44);
    i {
      width: r(18.25);
      height: r(22);
      background: url("../../assets/images/localtion.png") no-repeat center/100%;
      float: left;
      margin-top: r(11);
    }
    span {
      float: left;
      font-size: r(14);
      margin-left: r(4);
    }
    em {
      float: left;
      width: r(9);
      height: r(16);
      background: url("../../assets/images/more.png") no-repeat center/100%;
      margin-top: r(13);
      margin-left: r(4);
    }
  }
  .banner {
    width: r(343);
    height: r(190);
    margin: 0 auto;
    .mint-swipe {
      .imgdiv {
        height: 100%;
        border-radius: r(20);
        img {
          height: 100%;
          // height: auto;
        }
      }
    }
  }
  .bannerbtm {
    width: 100%;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  .posiImg {
    width: r(343);
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  .kindList {
    width: r(343);
    margin: 0 auto r(20);
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 25%;
        font-size: r(12);
        img {
          width: r(52);
          height: r(52);
          margin: r(16) r(4) 0;
          // width:100%;
        }
        span {
          display: block;
          margin-top: r(11);
        }
      }
    }
  }
  .notice {
    width: 100%;
    height: r(56.25);
    text-align: left;

    p {
      width: r(343);
      margin: 0 auto;
      display: flex;
      align-items: center;
      height: r(56.25);
      .left {
        display: block;
        width: r(36);
        height: r(18);
        background: #1fb1b8;
        text-align: center;
        line-height: r(18);
        font-size: r(12);
        color: #fff;
        border-radius: r(5);
      }
      .right {
        flex: 1;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        font-size: r(12);
        line-height: r(18);
        margin-left: r(4);
        color: #1fb1b8;
      }
    }
  }
  .tableList {
    width: 100%;
    margin: 0 auto;
    padding: r(16) 0;
    box-sizing: border-box;
    ul {
      width: r(343);
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: r(166.98);
        height: r(100);
        margin-bottom: r(8);
        box-sizing: border-box;

        img {
          width: 100%;
          border-radius: r(6);
        }
      }
    }
  }
  .swiperList {
    width: 100%;
    margin-bottom: r(12);
    .topImg {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .btmImg {
      margin-top: r(12);
      height: r(220);
      .swiper-slide {
        width: r(156);
        height: r(190);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        img {
          width: r(120);
          height: r(120);
        }
        h4 {
          text-align: left;
          text-indent: r(14);
          height: r(40);
        }
        p {
          text-align: left;
          text-indent: r(14);
          .price {
            color: #cc2825;
          }
          .size {
            color: #999;
          }
        }
      }
    }
  }

  .moreCity {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(3, 3, 3, 0.5);
    z-index: 22;
    .cityList {
      position: fixed;
      width: r(290);
      height: r(466);
      background: #fff;
      top: r(55);
      left: r(43.5);

      // justify-content: space-around;
      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          width: r(70);
          height: r(32);
          margin: r(0) r(8) r(15) r(18);
          font-size: r(14);
          line-height: r(32);
          text-align: center;
          margin-bottom: r(34);
        }
      }
      .province {
        margin-bottom: r(20);
        margin-top: r(40);
        li {
          margin-bottom: r(17);
        }
      }
      .selcity {
        width: 100%;
        div {
          width: r(91);
          height: r(50);
          line-height: r(50);
          border-bottom: r(1) solid #000;
          font-size: r(16);
          font-weight: bold;
          margin: 0 auto;
        }
      }
    }
  }
}
.zhanwei {
  width: 100%;
  height: r(28);
}
</style>
