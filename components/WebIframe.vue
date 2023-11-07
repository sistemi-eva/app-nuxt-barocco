<template>
  <iframe id="myFrame" :src="iframe_url" class="no-scrollbar" frameborder="0" height="100%" width="100%" style="margin: 0px; width:100%; height: 100vh; padding:0px;" />
</template>
<script>
export default {
    props: {
      iframe_url: {
        type: String,
        required: true,
        default: ''
      }
    }
}
</script>
<style scoped>
.page-content {
  padding:0px;
}
</style>