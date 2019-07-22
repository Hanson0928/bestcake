<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <footernav v-if="!($route.path=='/show'||$route.path=='/login'||$route.path=='/register')"></footernav>
  </div>
</template>

<script>
import footernav from "@/components/layout/footernav"
import { Tabbar, TabItem } from "mint-ui";

export default {
  name: "home",
  data() {
    return {
      selected: ""
    };
  },
  created(){
   this.$store.dispatch('VuexInit')
  },
  mounted() {
  },
  components: {
    footernav
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
