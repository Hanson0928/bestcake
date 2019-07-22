<template>
  <div class="box">
    <div class="top">
      <ul>
        <li :class="{current:selectedone}" @click="sel(1)">自营</li>
        <li :class="{current:selectedtwo}" @click="sel(2)">贝式严选</li>
      </ul>
      <tabgoodslist v-if="tabData.length!=0" :tablist="tabData"></tabgoodslist>
    </div>
    <gonggao></gonggao>
  </div>
</template>


<script>
import tabgoodslist from "@/components/main/tabgoodsList";
export default {
  data() {
    return {
      goodsList: [
        { title: "经典", mark: "KSK", list: [] },
        { title: "女神", mark: "NS", list: [] },
        { title: "伴手礼", mark: "JZ", list: [] },
        { title: "乳品", mark: "RP", list: [] }
      ],
      selectedone: false,
      selectedtwo: false,
      tabData: []
    };
  },
  mounted() {
    this.pageInit();
    this.sel(1);
  },
  methods: {
    pageInit() {
      this._getNsCakeCenter(res => {
        console.log(res);

        console.log(this.$store.state.City)
        this.goodsList.map(el => {
          res.map(item => {
            if (item.SupplyNo.indexOf(el.mark) != -1) {
              item.ImgUrl = this.$global.setUrl(item);
              item.carUrl = "" + require("../../assets/images/list-cart.png");
              el.list.push(item);
            }
          });
        });
      });
    },
    _getNsCakeCenter(callback) {
      this.$apis.getNsCakeCenter().then(res => {
        callback(res.data.Tag.cakelist);
      });
    },
    sel(num) {
      if (num == 1) {
        this.selectedone = true;
        this.selectedtwo = false;

        this.tabData = this.goodsList.slice(0, 3);
      } else {
        this.selectedone = false;
        this.selectedtwo = true;
        this.tabData = this.goodsList.slice(3);
      }
    }
  },
  components: {
    tabgoodslist
  }
};
</script>

<style lang="scss" scoped>
.box{
  width: 100%;
  height: auto;
}
.top {
  width: 100%;
  height: auto;
  ul {
    width: 100%;
    display: flex;
    li {
      display: block;
      width: 50%;
      height: r(49);
      line-height: r(49);
      font-size: r(16);
    }
    li.current {
      color: #1db0b8;
      border-bottom: r(2) solid #1db0b8;
    }
  }
}


</style>
