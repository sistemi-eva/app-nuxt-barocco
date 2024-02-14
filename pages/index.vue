<template>
<div>
    <!-- <van-notice-bar v-if="!lettureZone" text="E' possibile comunicare la lettura ogni mese dal 20 a fine mese" left-icon="volume-o" /> -->
    <van-notice-bar color="#1989fa" background="#63B32E" v-if="lettureZone" 
    text="Puoi comunicare la lettura del tuo contatore gas dal 20 a fine mese. Clicca sulla fornitura per procedere" 
    left-icon="volume-o" />
  <Page class="dashboard" style="margin:0px">
    <SediWidget />
    <AdsWidget/>
    <TicketsWidget/>
  </Page>
</div>
</template>

<script>
import Page from '../components/Layout/Page.vue';

export default {
  components: {
    Page
  },
  name: 'index',
  layout: 'default',
  computed:{
    lettureZone(){
      var thisDay = new Date().getDate()
      if(thisDay >= 20 && thisDay<=31) return true
      else return false
    },
  }
}
</script>

<style >

  /* Media Query for Laptops and Desktops */ 
  @media (min-width: 1025px) and (max-width: 1280px){ 
    .page-content.dashboard{
      padding: 0 15rem !important;
    }
  } 
  /* Media Query for Large screens */ 
  @media (min-width: 1281px) { 
    .page-content.dashboard {
      padding: 0 18rem !important;
    }
  }
  
  .van-nav-bar{
    background-color:  #63B32E;
  }
  .van-popup.van-popup--right{
    background:  #63B32E !important;
  }
  .van-sidebar-item--select, .van-sidebar-item{
    color: #63B32E;
  }
  .van-sidebar-item--select::before{
    background: #63B32E
  }

  .van-tab--active, .van-tab, .van-cell__value--alone, .textPrimary{
    color: #63B32E !important
  }
  .van-tabs__line, .van-radio__icon--checked .van-icon{
    background-color: #63B32E;
  }
  .van-radio__icon--checked .van-icon{
    border-color: #63B32E;
  }
  .van-notice-bar__content{
    color: #ffffff !important;
  }
  
  .van-swipe__indicator{
    width: 12px;
    height: 12px;
    cursor: pointer;
}
</style>
