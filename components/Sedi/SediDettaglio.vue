<template>
<div class="container">
  <div class="container-top" ref="infoContainer">
    <van-row type="flex" style="align-items:center;">
    <van-col span="6" class="center">
      <img v-if="sede.idtipiSede && sede.idtipiSede.split(',').includes('5')" width="30px" src="/lampadina.png" >
      <img v-else width="30px" src="/fiamma.png" >
    </van-col>
    <van-col span="18" style="color:#fff">
      <h3 class="container-top-content-right-item">{{sede.nomeCliente}}</h3>
      <h4 class="container-top-content-right-item" >{{sede.indirizzo}}</h4>
      <h4 class="container-top-content-right-item" >{{sede.cap}}, {{sede.localita}}</h4>
    </van-col>
  </van-row>
  </div>
  <div>
    <!--<van-notice-bar v-if="sede.idtipiSede && sede.idtipiSede.split(',').includes('5')" text="Attualmente non è possibile comunicare la lettura del contatore." left-icon="volume-o" />-->
    <van-notice-bar v-if="sede.idtipiSede && sede.idtipiSede.split(',').includes('6') && !lettureZone" text="E' possibile comunicare la lettura ogni mese dal 23 a fine mese" left-icon="volume-o" />
    <van-notice-bar color="#1989fa" background="#ecf9ff" v-else-if="sede.idtipiSede && sede.idtipiSede.split(',').includes('6') && lettureZone" style="cursor: pointer;" @click="setLettura()"  mode="link" left-icon="chart-trending-o" >
    <template #default>
      <span style="font-weight:600">COMUNICA L'AUTOLETTURA GAS</span>
    </template>
    </van-notice-bar>
    </div>
  <div class="container-bottom" >
    <TabWidget :sede="sede"/>
  </div>
  <!-- VAN DIALOG dialogLettura -->
  <van-dialog
    :beforeClose="clearOptions"
    @cancel="clearOptions"
    @closed="clearOptions"
    v-if="dialogLettura"
    v-model="dialogLettura"
    title="Nuova lettura"
    :closeOnClickOverlay="true"
    :showConfirmButton="false"
    class="title"
  >
    <div>
      <van-form @submit="saveLettura" class="mt-4" style="font-weight: 600;">
        <van-cell value="Inserisci lettura" />
        <h6 class="body-12" style="padding-left:15px; padding-right:15px; margin-top:5px; margin-bottom:7px; line-height:16px;">*Inserisci solo i numeri prima della virgola</h6>
        <van-field
          type="number"
          class="inputContatore"
          v-model="letturaContatore"
          name="Valore Contatore"
          placeholder="Valore Contatore"
          :rules="[{ required: true, message: 'Campo obbligatorio' }]"
        />
        <h6 style="color:red; padding-left:15px; margin-top:5px; margin-bottom:7px; line-height:16px" v-if="ResponseErrors.letturaContatoreNotValid">Controlla il valore della lettura inserita</h6>
        <h6 style="color:red; padding-left:15px; margin-top:5px; margin-bottom:7px; line-height:16px" v-if="ResponseErrors.letturaInferioreMisuratoreWS">Il valore è inferiore all'ultima lettura eseguita</h6>
        <van-cell value="Ricevi notifica di conferma tramite email" />
        <van-radio-group style="padding-left:16px; margin-top:5px;margin-bottom:40px" v-model="sendNotifica" direction="horizontal">
          <van-radio :name="true"><span class="textPrimary" style="font-weight:300">Si</span></van-radio>
          <van-radio :name="false"><span class="textPrimary" style="font-weight:300">No</span></van-radio>
        </van-radio-group>
        <div style="margin: 16px;" class="center">
          <van-button :loading="loadingCall" block round type="info" native-type="Submit">Conferma</van-button>
        </div>
      </van-form>
    </div>
  </van-dialog>
</div>
</template>

<script>
import moment from 'moment'
export default {
  async mounted(){
    this.sede = this.$route.query
  },
  computed: {
    lettureZone(){
      var thisDay = new Date().getDate()
      if(thisDay >= 23 && thisDay<=31) return true
      else return false
    },
    idAnagrafica() { 
      return !!this.$store.getters.id_anagrafica ? this.$store.getters.id_anagrafica : 
      !!this.$store.getters.utente ? this.$store.getters.utente.userInfo.idAnagrafica : null
      // return !!this.$store.getters.utente ? this.$store.getters.utente.userInfo.idAnagrafica : null
    }
  },
  data(){
    return{
      sede: {},
      dialogLettura: false,
      sendNotifica: false,
      letturaContatore: '',
      loadingCall: false,
      ResponseErrors: {},
      errors : {
        letturaContatore: false,
      }
    }
  },
  methods: {
    clearOptions(){
      this.ResponseErrors = {}
      this.errors = { letturaContatore: false }
      this.dialogLettura = false
      this.sendNotifica = false
      this.letturaContatore = ''
    },
    setLettura(){
      this.dialogLettura =true
    },
    async saveLettura(){
      this.loadingCall = true
      await this.$axios.$post(
        'graphql/batch', 
        [
          {
            operationName: '', 
            query: `{ contratti(idanagrafica: ["${this.idAnagrafica}"],idsede:${this.sede.idsede} ") { idrigaContratto}}`, 
            variables: {} 
          }
        ]
      )
      .then(
        async ( data ) => {
          var idRigaContratto = null;
          if(data[0].data.contratti[0].idrigaContratto) {
            for(var i in data[0].data.contratti){
              console.log("cont", data[0].data.contratti)
              if(data[0].data.contratti[i].canInsertLettura === true){
                idRigaContratto = data[0].data.contratti[i].idrigaContratto
              }
            }
            this.$axios.$post('/api/lettura/gas/save', 
            {
              data:moment().utcOffset(0, true).format(),
              idRigaContratto,
              idSede:this.sede.idsede,
              letturaContatore: this.letturaContatore,
              sendNotifica: this.sendNotifica

            })
            .then(
              ( data ) => {
                this.loadingCall = false
                this.$toast.success("Richiesta inserita con successo!");
                this.dialogLettura = false
              }).catch(e => {
                this.loadingCall = false
                this.ResponseErrors = e.response.data.errors;
                this.$toast.fail('Non eseguita')
              }
            )
            .catch(e => {
              this.loadingCall = false
            }) 
          }
        }
      )
      .catch(e => {
        this.loadingCall = false
      }) 
    }
  }
}
</script>

<style>
.van-field__control{
  margin-top:-10px;
  padding: 5px;
  border-width: 1.5px;
  border-radius: 5px;
  border-style:solid;
  border-color: #63B32E !important;
  font-weight: 300;
  color: black;
}
.container-top-content-right-item{
  width: 100%;
  margin: 2px;
}

.container-top-content-right-text{
  width: 100%;
}


.container-top-content{
  height: 100%;
  justify-content: space-between;
  display: flex;
}

.container-top{
    padding: 15px;
    padding-top: 0px;
    position: relative;
    background-color: #63B32E;
}

.title{
    color: red;
}
</style>