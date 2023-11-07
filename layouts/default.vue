<template>
<client-only>
  <div class="app-wrapper" :style="mainWrapperStyle">
    <!--DrawerNotification v-model="notification" /-->
    <DrawerMenuDestro :value="appMenu" @input="(newAppMenu) => {appMenu = newAppMenu}"/>
    <DrawerMenuSinistro :value="appAccounts" @input="updateToggleAccounts"/>
  <div class="app-top-menu">
    <TopMenuDefault  @openMenu="toggleOpenMenu" @openAccounts="toggleOpenAccounts" @openNotification="toggleNotification" />
  </div>
    <div class="app-page" style="overflow-y: scroll">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="" loosing-text="Rilascia per ricaricare la pagina" pulling-text="Trascina per ricaricare la pagina" loading-text="Pagina in caricamento">
        <Nuxt />
      </van-pull-refresh>
    </div>
    <Menu />
  </div>
</client-only>
</template>

<script>
import DrawerMenuDestro from '../components/Layout/DrawerMenuDestro.vue';
import DrawerMenuSinistro from '../components/Layout/DrawerMenuSinistro.vue';
import TopMenuDefault from '../components/Layout/TopMenuDefault.vue';
export default {
  components: {
    DrawerMenuDestro,
    DrawerMenuSinistro,
    TopMenuDefault

  },
  middleware:'authenticated',
  data:()=>({
    isLoading:false,
    notification:false,
    appMenu: false,
    appAccounts: false,
  }),
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$router.go()
        this.isLoading = false
      }, 1000);
    },
    toggleNotification(){
      this.notification = !this.notification
    },
    toggleOpenMenu(){
      this.appMenu = true
    },
    updateToggleAccounts(val){
      console.log("update;",val)
      this.appAccounts = val
    },
    toggleOpenAccounts(){
      this.appAccounts = !this.appAccounts
    }
  },
  computed: {
    mainWrapperPaddingTop: () => '0px',
    mainWrapperStyle() {
      return {
        paddingTop: this.mainWrapperPaddingTop,
       // height: `calc(100vh - ${this.mainWrapperPaddingTop})`
      }
    }
  }
}
</script>

<style scoped>

.app-page{
  height: 88.2%;
}

</style>
