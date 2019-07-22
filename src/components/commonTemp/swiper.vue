<template>
  <div class="swiper-container">
    <div class="swiper-wrapper" style="transform: translate3d(37.5px, 0px, 0px); transition-duration: 0ms;">
      
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
      this.swiperMove()
  },
  methods: {
    
    swiperMove(){
      new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: false,
        slidesPerView: 'auto',
        spaceBetween: 20,
        //  loop: true,
        coverflow: {
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
        }
    })} 
  }
  }

</script>
<style lang="scss" scoped>

</style>
