<template>
  <div>
    <van-tabbar v-model="active" inactive-color="#FFF" style="background-color:#41ca85" >
      <van-tabbar-item name="index" replace @click="changePage({name:'index'})" icon="home-o">Home</van-tabbar-item>
      <van-tabbar-item name="store"  replace  @click="changePage({name:'web',iframe_url:'https://www.uniongaseluce.it/union-store'})" icon="shop-collect-o">Sedi Union</van-tabbar-item>
      <van-tabbar-item name="promozioni" replace  @click="changePage({name:'web',iframe_url:'https://www.unionworld.it'})" icon="discount">Promozioni</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  methods: {
    changePage({name,iframe_url}){
        this.$router.push({name, query : {iframe_url}})
    },
    goTo(url){
      window.location.href=url
    },
  },
  mounted(){
    this.active= this.$router.history.current.name
  },
  watch:{
    '$route' (to, from){
      if(to.name != from.name) {
        this.active = to.name
      }
    }
  },
  data() {
      return {
        active: 'index',
      };
    }
}

</script>

<style>

</style>