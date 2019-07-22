<template>
  <div class="goods">
    <ul class="goodstitle">
      <li v-for="(item,index) in tablist" :key="index">
        <div v-text="item.title" :class='{"title":true,"current":cindex==index}' @click="sel(index)"></div>
      </li>
    </ul>
    <div class="goodsImg">
        <ul >
            <li v-for="(item,index) in goodsList" :key="index">
               <div class="topImg">
                   <img v-lazy="item.ImgUrl" alt="" @click="toPath(item)">
               </div>
               <p class="goodsname"> 
                   <span v-text="item.Name"></span>
               </p>
               <p class="goodsmeans">
                   <span>{{item.Means|ellipsis(11)}}</span>
               </p>
               <p class="goodsadd">
                   <span>￥</span>
                   <span class="currentPrice" v-text="item.CurrentPrice"></span>
                   <span>.00</span>
                   <span class="goodSize">{{item.Size|ellipsis(8)}}</span>
                    <i class="carts" @click="add(item)">
                        <img v-lazy="item.carUrl" alt="">
                    </i>
               </p>
            </li>
        </ul>
    </div>
    
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      cindex:0,
      goodsList:[]
    };
  },
  props: ["tablist"],
  created() {
      this.sel(0)
  },
  methods: {
    sel(index) {
        this.cindex=index
        this.goodsList=this.tablist[index].list
        
    },
    add(item){
      // console.log(item)
      let data={
        City:this.$store.state.City,
        SupplyNo:item.SupplyNo,
        Name:item.Name,
        ID:item.ID||item.Id,
        CurrentPrice:item.CurrentPrice,
        Size:item.Size
      }
      //  console.log(data)

       this.$store.dispatch('add',{data,num:1,cart:'cart'})

       Toast({
          message: `${item.Name}已加入购物车`,
          duration: 800,
        });
    },
    toPath(item){
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
    }
  },
  watch:{
      tablist(){
          this.sel(0)
      }
  }
};
</script>

<style lang="scss" scoped>
.goods {
  width: 100%;
  .goodstitle {
    margin-top: r(28);
    height: r(22);
    display: flex;
    align-items: center;
    li {
      // float: left;
      flex: 1;
      .title {
        text-align: center;
        font-size: r(14);
        line-height: r(22);
      }
      .title.current {
        font-size: r(16);
        font-weight: bold;
        line-height: r(25);
        text-shadow: 0px 2px 6px #1fb1b9;
      }
    }
  }
  .goodsImg{
      ul{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 0 r(6);
        li{
            width: r(165);
            height: r(231);
            margin-bottom: r(22);
            .topImg{
                width: r(165);
                height: r(165);
                img{
                    width:100%;
                    height: 100%;
                }
            }
            p{
                text-align: left;
            }
            .goodsname{
                font-size: r(14);
                line-height: r(15);
                margin-top: r(7);
            }
            .goodsmeans{
                font-size: r(12);
                color: #999;
                line-height: r(16);
                margin: r(2) 0;
            }
            .goodsadd{
                font-size: r(12);
                color: #ff3300;
                line-height: r(25);
                position: relative;
                .currentPrice{
                    font-size: r(15);
                }
                .goodSize{
                    color: #bcbcbc;
                }
                .carts{
                    display: inline-block;
                    width: r(20);
                    height: r(20);
                    position: absolute;
                    right: 0;
                    bottom: r(4);
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
      }
      
  }
  
}
image[lazy=loading]{
    width: 100%;
    height: 100%;
}
</style>
