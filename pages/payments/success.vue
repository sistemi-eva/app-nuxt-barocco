<template>
<div style="height:100%;">
  <!--van-notice-bar text="Notice Content" left-icon="volume-o" /-->
  <Page class="dashboard px-3" style="margin:0 auto; height:100%; display:flex; flex-direction: column; align-items: center; justify-content: center; ">
    <van-image src="/icons/payment-success.png" class="my-4" width="65" lazy-load />
    <van-cell  class="cell title" style="text-align: center" title="Il pagamento è stato effettuato con successo"/>
    <van-button class="mt-3" type="primary" @click.prevent="goBack">Torna alla home</van-button>
  </Page>
</div>
</template>

<script>
export default {
  name: 'paymentSuccess',
  layout: 'default',
  methods: {
      goBack(){
          this.$router.push('/')
      }
  }
}
</script>
