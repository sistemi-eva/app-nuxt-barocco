<template>
<client-only>

  <div class="app-wrapper" :style="mainWrapperStyle">
    <!--DrawerNotification v-model="notification" /-->
    <DrawerMenuDestro :value="appMenu" @input="(newAppMenu) => {appMenu = newAppMenu}"/>
  <div class="app-top-menu">
    <TopMenuDettaglio  @openMenu="toggleOpenMenu" @openNotification="toggleNotification" />
  </div>
  <div class="app-page" style="overflow-y: scroll; ">
    <Nuxt />
  </div>
    <Menu />
  </div>
</client-only>
</template>

<script>
import DrawerMenuDestro from '../components/Layout/DrawerMenuDestro.vue';
import TopMenuDettaglio from '../components/Layout/TopMenuDettaglio.vue';

export default {
  components: {
    DrawerMenuDestro,
    TopMenuDettaglio
  },
  middleware:'authenticated',

  data:()=>({
    notification:false,
    appMenu: false,
  }),
  methods: {
    toggleNotification(){
      this.notification = !this.notification
    },
    toggleOpenMenu(){
      this.appMenu = true
    }
  },
  computed: {
    mainWrapperPaddingTop: () => '0px',
    mainWrapperStyle() {
      return {
        paddingTop: this.mainWrapperPaddingTop,
        //height: `calc(100vh - ${this.mainWrapperPaddingTop})`
      }
    }
  }
}
</script>

<style>


          
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
</style>
