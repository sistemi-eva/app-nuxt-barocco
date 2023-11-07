<template>
  <Page style="margin:0px;padding:0px;overflow:hidden;height:100%">
    <WebIframe :iframe_url="iframe_url" />
  </Page>
</template>

<script>
import Page from '../components/Layout/Page.vue';
export default {
  components: {
    Page
  },
  name: 'web',
  layout: 'dettaglioPaginaNoMenu',
  async mounted(){
    this.iframe_url = this.$route.query.iframe_url
  },
  data(){
    return{
      iframe_url: '',
    }
  }
}
</script>
