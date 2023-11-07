<template>
  <div class="app-wrapper" :style="mainWrapperStyle">
    <!-- <DrawerNotification v-model="notification" /> -->
    <div class="app-top-menu">
      <TopMenuDettaglio @openNotification="toggleNotification" :menu="false" />
    </div>
    <div class="app-page">
      <Nuxt />
    </div>
    <div>
      <!-- <Menu/> -->
    </div>
  </div>
</template>

<script>
import TopMenuDettaglio from '../components/Layout/TopMenuDettaglio.vue';
export default {
  components: {
    TopMenuDettaglio
  },
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

<style scoped>

</style>
