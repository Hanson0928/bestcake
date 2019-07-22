import Vuex from "vuex";
import Vue from "vue";
import apis from "@/core/api"
import {
  Indicator
} from 'mint-ui';
import {
  MessageBox
} from 'mint-ui';
import Store from 'storejs'
Vue.use(Vuex);
// Vuex作用是什么? 全局状态管理

//理解为 组件内部  data 属性
const state = {
  City: "",
  cartList: [],
  isadd: true,
  ImgUrl: ''
}
//定义  methods 同步方法   视图调用     this.$store.commit("xxxx",val)
const mutations = {
  // 没有第三个参数
  // 在函数内部去  statet

  setcartImg(state, data) {
    // console.log(data)
    let path = `https://res.bestcake.com/m-images/cart/${data}.png`
    state.ImgUrl = path
  },

}
// 定义 compunted  属性计算
const getters = {
  // count(state){
  //     return  state.num*state.price;
  // }
}
// --------------
//定义 异步方法 通用接口调用    视图调用     this.$store.dispatch("xxxx",val)
const actions = {
  // test(context,data){
  //     console.log(context)  //可以调用  mutations 方法    actions调actions自己的方法,也可以使用 getters,也可以使用state
  //     // apis.getItem().then((res)=>{
  //         // console.log(res)
  //     // })
  // },
  // test2(context,data){
  //     console.log("run");
  //     Indicator.open("加载中...")
  //   setTimeout(()=>{
  //     Indicator.close()
  //     context.state.isTopic=true;
  //   },5000)
  // }
  add(context, item) {
    // console.log(this.commit("setcartImg",item.data.Name))
    if (item.num == 1) {
      let bool = true;
      if (context.state.cartList.length != 0) {
        context.state.cartList.map(ele => {
          context.commit('setcartImg', ele.Name)
          ele.ImgUrl = context.state.ImgUrl
          //    ele.boolyes=false
          //    ele.chooseurl=`https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg`
          //    ele.notchooseurl=`https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg`
          //    ele.ischooseone=false
          //    ele.ischootwo=false
          if (ele.ID == item.data.ID) {
            bool = false;
            if (item.cart) {
              ele.num++
            } else {
              ele.num += item.data.num;
            }
          }
        })
      }
      if (bool) {
        item.data.num = item.data.num || 1
        context.commit('setcartImg', item.data.Name)
        item.data.ImgUrl = context.state.ImgUrl
        // item.data.ischooseone=false
        // item.data.ischootwo=false
        // item.data.boolyes=false
        // item.data.chooseurl=`https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg`
        // item.data.notchooseurl=`https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg`
        context.state.cartList.push(item.data)
      }
    } else {
      context.state.cartList.map((ele, index) => {
        if (ele.ID == item.data.ID) {
          ele.num--;
          if (ele.num < 1) {
            ele.num = 1;
            MessageBox.confirm('确定要删除此商品吗?', '').then(action => {
              if (action == "confirm") {
                context.state.cartList.splice(index, 1)
                console.log(context.state.cartList)
                Store.set('cartList', context.state.cartList)
              }
            }).catch(err => {
              if (err == 'cancle') {
                // ele.num = 1;
                //  return;
              }
            })
          }
          // if(ele.num>0){
          //     ele.num--
          // }
        }
      })
    }
    Store.set('cartList', context.state.cartList)
  },
  VuexInit(context) {
    if (Store.get('cartList')) {
      context.state.cartList = Store.get('cartList')
    }
  }
}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
