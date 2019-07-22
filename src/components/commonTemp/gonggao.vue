<template>
  <div class="gonggao">
    <div class="gonggao1">
      <div class="ggleft">划线价格</div>
      <div class="ggright">商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</div>
    </div>
    <div class="gonggao1">
      <div class="ggleft">未划线价格</div>
      <div class="ggright">商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</div>
    </div>
    <div class="last"></div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>
.gonggao {
  width: 100%;
  height: r(169);
  padding: r(7.5);
  box-sizing: border-box;
  .gonggao1 {
    margin: 0 r(15);
    font-size: r(14);
    overflow: hidden;
    margin-bottom: r(15);
    .ggleft {
      text-align: left;
      width: r(80);
      float: left;
      color: #181818;
      line-height: 1.6;
    }
    .ggright {
      width: r(244);
      float: left;
      color: #a2a2a2;
      line-height: 1.6;
      text-align: left;
    }
  }
}
.last::after {
  content: "";
  display: block;
  height: r(40);
}
</style>
