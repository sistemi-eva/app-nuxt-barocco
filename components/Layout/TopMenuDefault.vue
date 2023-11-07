<template>
  <van-nav-bar>
    <template v-if="utente && utente.anagrafiche && utente.anagrafiche.length > 1" #left>
    <van-icon @click="openAccounts" size="30" name="exchange" color ="white" />
  </template>
  <template #title>
    <img class="card-top-logo" src="/pittogramma-white.png">
  </template>
  <template #right>
    <van-icon @click="openMenu" size="30" name="wap-nav" color ="white" />
  </template>
  </van-nav-bar>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
     ...mapGetters({
      utente: 'utente'
    }),
  },
data:()=>({
  }),
  methods:{
      openNotification(){
          this.$emit('openNotification')
      },
      openAccounts(){
        this.$emit('openAccounts')
      },
      openMenu(){
        this.$emit('openMenu')
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