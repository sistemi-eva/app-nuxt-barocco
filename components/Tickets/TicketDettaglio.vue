<template>
  <div class="container">
    <client-only>
      Descrizione: {{ticket.motivoReclamo}} <br>
      Dettagli: {{ticket.dettagli}} <br>
      Soluzione: {{ticket.risoluzione}} <br>
    </client-only>
  </div>
</template>

<script>
export default {
async mounted(){
    await this.ticketDetail(this.$route.query)
  },
  data(){
    return{
      ticket: {},
    }
  },
  methods:{
      async ticketDetail(obj){
        const data = await this.$axios.$get(`api/v2/tickets/${obj.idreclamo}?idAnagrafica=${obj.idAnagrafica}&applicationId=${obj.applicationID}`)
        this.ticket = data.data.reclamoResourceWithConfig.reclamo
      }
  }
}
</script>

<style scoped>
.container{
    height: 300vh;
    overflow-y: scroll
}
</style>