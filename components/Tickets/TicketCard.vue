<template>
  <div @click.stop="toggleShow()" class="ticket">
    <div class="ticket-title">
      <div class="pt-2" style="align-self: space-between; display: flex; justify-content: space-between;">
        <van-tag plain :type="ticket.descrizioneStato.toLowerCase() =='aperto' ? 'primary' : 'success' "   >{{ticket.descrizioneStato}}</van-tag> <small style="color:gray;">{{humanDateDiff(ticket.datpmo)}}</small>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center">
       <p  style="font-weight:600;">{{ticket.motivoReclamo}}</p>
       <div v-if="!notLoadError">
        <van-icon name="arrow" v-if="!show" />
        <van-icon name="arrow-down" v-else />
       </div>
      </div>
    </div>
    <div v-if="show" style="padding-bottom:20px">
      <div style="padding-bottom:10px">
        <span style="font-weight:600;"><van-icon name="user-o" /> Tu</span>
        <div class="response-ticket">{{ticketDetail.dettagli}}</div>
      </div>
      <div >
        <span style="font-weight:600;" v-if="ticketDetail.risoluzione"><van-icon name="service-o" /> Risposta operatore</span>
        <div class="response-ticket" v-if="ticketDetail.risoluzione" >{{ticketDetail.risoluzione}}</div>
        <div class="working-ticket" v-else  >Stiamo lavorando il tuo ticket. Riceverai una risposta al più presto...</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data: () => ({
    show: false
  }),
props:{
    ticket:{
      type: Object,
      required: true,
      default: () => []
    },
  },
  computed: {
    idAnagrafica() { /* sostituire con mapGetters */
      return !!this.$store.getters.id_anagrafica ? this.$store.getters.id_anagrafica : 
      !!this.$store.getters.utente ? this.$store.getters.utente.userInfo.idAnagrafica : null
      // return !!this.$store.getters.utente ? this.$store.getters.utente.userInfo.idAnagrafica : null
    }
  },
  data(){
    return{
      show:false,
      ticketDetail: {},
      notLoadError: false
    }
  },
  async mounted(){

    this.$axios.$get(`api/v2/tickets/${this.ticket.idreclamo}?idAnagrafica=${this.ticket.idAnagrafica}&applicationId=${this.ticket.applicationID}`).then((data)=>{
      this.ticketDetail = data.data.reclamoResourceWithConfig.reclamo
    }).catch((e)=> {
      this.notLoadError = true
    })
  },
methods: {
    humanDateDiff(data){
      return moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    toggleShow(){
    this.show = !this.show
    },
  }
}
</script>
<style scoped>
.response-ticket{
  padding:10px 10px; border-radius:10px; margin: 5px 0px; background-color: #efefef
}
.working-ticket{
  padding:10px 10px; color: #6d6c6c; margin: 5px 0px; font-style:italic;
}
.ticket{
  /* padding: 0px,10px; */
  padding-left: 15px;
  padding-right: 15px;
  margin: 0px 0px 10px 0px;
  min-height: 90px;
  background-color: #fff;
  box-shadow: 0 4px 9px rgba(0,0,0,0.1);
  border-radius: 15px;
  margin-top: 10px; 
}
</style>
