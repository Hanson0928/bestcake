import swiper from "@/components/commonTemp/swiper"
import gonggao from "@/components/commonTemp/gonggao"
// import { Button } from 'mint-ui'
import {
  Swipe,
  SwipeItem
} from 'mint-ui';
import {
  Tabbar,
  TabItem
} from 'mint-ui';
// console.log(Swipe.name)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
export default (Vue) => {
  //  Vue.component("mint_btn", Button);
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  Vue.component(Tabbar.name, Tabbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component("swiper", swiper);
  Vue.component("gonggao", gonggao);
}
