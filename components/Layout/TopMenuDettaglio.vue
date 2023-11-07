<template>
  <van-nav-bar>
  <template #left>
     <van-icon @click="goBack" name="arrow-left" color ="white" size="30">
     </van-icon> <span @click="goBack" style="color:white">Indietro</span>
  </template>
  <template v-if="menu" #right>
    <van-icon @click="openMenu" size="30" name="wap-nav" color ="white" />
  </template>

  </van-nav-bar>
</template>

<script>
export default {

  props: ['menu'],
data:()=>({
  }),
  methods:{
      openNotification(){
          this.$emit('openNotification')
      },
      openMenu(){
          this.$emit('openMenu')
      },
      goBack(){
        this.$router.back()
      }
  }
}
</script>

<style >
.topmenu-widget-wrapper {
    margin-left: 10px;
    margin-right: 10px;
    padding-bottom: 20px;
    padding-top:60px;
  }
.topmenu-title{
    text-align: center;
    /* justify-content: center; */
}
.card-top-logo{
  max-height:40px; 
  max-width:40px
}
</style>