<template>
  <mt-tabbar v-model="selected" :fixed="true">
    <mt-tab-item
      v-for="(item,index) in routerList"
      :key="index"
      :id="'box'+index"
      @click.native="sel();choose(index)"
      class="seleted"
      :style="item.styleObj"
    >
      <!-- <div :style="item.styleObj" class="seleted"> -->
      <!-- <i :class="item.className"></i> -->
      <!-- </div> -->
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
      routerList: [
        {
          path: "/index",
          name: "首页",
          isSelected: false,
          isflag: false,
          styleObj: {
            backgroundImage:
              "url(" + require("../../assets/images/foot-menu-a-1.png") + ")"
          },
          styleObj2: {
            backgroundImage:
              "url(" + require("../../assets/images/foot-menu-a-2.png") + ")"
          }
        },
        {
          path: "/goods",
          name: "分类",
          isSelected: false,
          isflag: false,
          styleObj: {
            backgroundImage:
              "url(" + require("../../assets/images/foot-menu-b-1.png") + ")"
          },
          styleObj2: {
            backgroundImage:
              "url(" + require("../../assets/images/foot-menu-b-2.png") + ")"
          }
        },
        {
          path: "/carts",
          name: "购物车",
          isSelected: false,
          isflag: false,
          styleObj: {
            backgroundImage:
              "url(" + require("../../assets/images/foot-menu-c-1.png") + ")"
          },
          styleObj2: {
            backgroundImage:
              "url(" + require("../../assets/images/foot-menu-c-2.png") + ")"
          }
        },
        {
          path: "/user",
          name: "我的   ",
          isSelected: false,
          isflag: false,
          styleObj: {
            backgroundImage:
              "url(" + require("../../assets/images/foot-menu-d-1.png") + ")"
          },
          styleObj2: {
            backgroundImage:
              "url(" + require("../../assets/images/foot-menu-d-2.png") + ")"
          }
        }
      ],
      cindex: 0
    };
  },
  created() {
    // this.choose(0);
    // console.log(this.$route.path);
    // this.$route()
  },
  mounted() {
    this.choose(0);
    this.route()
  },
  methods: {
    sel() {
      // console.log(this.selected);
      switch (this.selected) {
        case "box0":
          console.log("ok");
          this.$router.push({ path: "/index" });
          break;
        case "box1":
          this.$router.push({ path: "/goods" });
          break;
        case "box2":
          this.$router.push({ path: "/carts" });
          break;
        case "box3":
          this.$router.push({ path: "/user" });
          break;
      }
      // this.cindex = index;+
      // this.$nextTick(() => {
      //   this.routerList.forEach((el, temindex) => {
      //     if (el.isflag) {
      //       let obj1 = el.styleObj;
      //       el.styleObj = el.styleObj2;
      //       el.styleObj2 = obj1;
      //     }
      //     el.isSelected = false;
      //     el.isflag = false;
      //   });
      //   this.routerList[index].isSelected = true;
      //   this.routerList[index].isflag = this.routerList[index].isSelected;
      //   if (this.routerList[index].isSelected) {
      //     let obj2 = this.routerList[index].styleObj;
      //     this.routerList[index].styleObj = this.routerList[index].styleObj2;
      //     this.routerList[index].styleObj2 = obj2;
      //   }
      // });
      // this.$router.push(this.routerList[index].path);
    },
    choose(index) {
      this.cindex = index;
      this.$nextTick(() => {
        this.routerList.forEach((el, temindex) => {
          if (el.isflag) {
            let obj1 = el.styleObj;
            el.styleObj = el.styleObj2;
            el.styleObj2 = obj1;
          }
          el.isSelected = false;
          el.isflag = false;
        });
        this.routerList[index].isSelected = true;
        this.routerList[index].isflag = this.routerList[index].isSelected;
        if (this.routerList[index].isSelected) {
          let obj2 = this.routerList[index].styleObj;
          this.routerList[index].styleObj = this.routerList[index].styleObj2;
          this.routerList[index].styleObj2 = obj2;
        }
      });
    },
    route(){
      switch (this.$route.path) {
        case "/index":
          this.choose(0);
          break;
        case "/goods":
          this.choose(1);
          break;
        case "/carts":
          this.choose(2);
          break;
        case "/user":
          this.choose(3);
          break;
      }
    }
  },
  watch: {
    $route() {
      switch (this.$route.path) {
        case "/index":
          this.choose(0);
          break;
        case "/goods":
          this.choose(1);
          break;
        case "/carts":
          this.choose(2);
          break;
        case "/user":
          this.choose(3);
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-tabbar {
  height: r(50);
  z-index: 44;
  // .mint-tab-item {
  //   // .seleted {
  //     // margin-top: r(4);
  //     // width: r(35);
  //     // height: r(39);
  //     // margin: 0 auto;
  //     // background-size: 100%;
  //   }
  .seleted {
    // margin-top: r(4);
    width: r(35);
    height: r(39);
    margin: 0 auto;
    background-size: r(35);
    background-repeat: no-repeat;
    background-position: center;
  }
}
.mint-tabbar > .mint-tab-item.is-selected {
  background: none;
  background-position: center;
  background-repeat: no-repeat;
  background-size: r(35);
}
</style>

