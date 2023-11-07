<template>
  <client-only>
    <div class="maintenance-html">
      <div class="maintenance-content">
        <div class="logo">
          <Logo :width="310" />
        </div>
        <div class="content-text">
          <h1 style="color:white; margin-bottom: 10px; margin-top:-20px; text-align: center; font-weight:300">Ci scusiamo per il disagio.</h1>
          <div v-if="error.statusCode === 404">
            <h3 style="color:white; text-align: center; font-weight:200">La pagina non è stata trovata,</h3>
            <h3 style="color:white; text-align: center; font-weight:200">potrebbe essere stata eliminata oppure non più disponibile.</h3>
          </div>
          <div v-else>
            <h3 style="color:white; text-align: center; font-weight:200">Qualcosa è andato storto,</h3>
            <h3 style="color:white; text-align: center; font-weight:200">Stiamo controllando cosa è successo.</h3>
          </div>
          <div style="display:flex;align-item:center;align-content:center;padding:30px"> 
            <van-button @click="$router.push('/')" type="info" style="background: #e5044d;width:100%;height:50px">Ritorna alla home</van-button>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  props: ['error'],
  layout: "login",
}
</script>

<style scoped>
.logo{
  padding-bottom: 20px;
}
.maintenance-content{
  padding:20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.maintenance-wrap {
  width: 100%;
  height: 100vh; 
  margin: auto;
  position: relative;
  background-size: cover;
}
.maintenance-html {
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(90deg, rgb(0 115 188 / 85%), rgb(6 65 138 /96%));
  overflow: hidden;
  overflow-y: scroll;
  backface-visibility: hidden;
}
</style>