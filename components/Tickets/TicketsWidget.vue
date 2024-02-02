<template>
  <div class="tickets-widget-wrapper mb-5 mt-4 px-3">
    <van-cell-group class="cell">
      <van-cell class="cell title" title="Assistenza">
      </van-cell>
    </van-cell-group>
    <van-skeleton v-if="loading" title :row="3" />
    <div v-if="!loading">
        <van-empty v-if="!items.length" class="py-0" description="Nessuna richiesta trovata" />
        <van-cell-group v-for="(item, i) in items" :key="'ticket_'+i">
          <TicketCard v-if="i >= currentPage*itemsPerPage -itemsPerPage && i < (currentPage*itemsPerPage -itemsPerPage) + itemsPerPage" :ticket="item" />
        </van-cell-group>
        <van-pagination class="my-3"
          v-model="currentPage"
          :total-items="items.length"
          :items-per-page="itemsPerPage"
          :show-page-size="5"
        >
          <template #prev-text>
            <van-icon name="arrow-left" />
          </template>
          <template #next-text>
            <van-icon name="arrow" />
          </template>
          <template #page="{ text }">
            {{ text }}
          </template>
        </van-pagination>
        <div class="ticket-activity px-4">
          <van-button class="crea-ticket" block type="info" @click.prevent="showPopup = true">Richiedi assistenza</van-button>
        </div>



    </div>


    <van-action-sheet
      @select="selectMotivoReclamo"
      v-model="showPopup"
      :actions="azioniAssistenza"
      cancel-text="Annulla"
      description="Motivo della richiesta"
      close-on-click-action
    />


<van-dialog v-if="showAssistenzaModal"  v-model="showAssistenzaModal" :title="form.motivoReclamo" :closeOnClickOverlay="true" :showConfirmButton="false" class="title">
	
			<div>
					<van-form @submit="submitAssistenza" class="mt-4" style="font-weight: 600;">

					<van-cell value="Dettaglio richiesta" />

					<van-field 
            maxlength="250"
            show-word-limit
            type="textarea"
            rows="3"
            autosize
						v-model="form.dettagli"
						placeholder="Inserisci maggiori nformazioni per la richiesta"
						:rules="[{ required: true, message: 'Campo obbligatorio' }]"

					/>



					<div style="margin: 16px;" class="center">
						<van-button block round type="info" native-type="Submit">
						Conferma
						</van-button>
					</div>
					</van-form>
				
			</div>

	</van-dialog>



  </div>
</template>

<script>
import moment from 'moment'
import TicketCard from './TicketCard.vue'


import { mapGetters } from 'vuex'
export default {
  components: {
    TicketCard
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 3,
      azioniAssistenza: [
        { name: 'Richiesta informazioni' },
        { name: 'Reclamo' },
        { name: 'Richiesta rateizzazione' },
      ],
      form: {},
      showAssistenzaModal: false,
      search: false,
      query: '',
      items: [],
      loading: true,
      showPopup: false
    }
  },
  computed: {
    idAnagrafica() { /* sostituire con mapGetters */
      return !!this.$store.getters.id_anagrafica ? this.$store.getters.id_anagrafica : 
      !!this.$store.getters.utente ? this.$store.getters.utente.userInfo.idAnagrafica : null
      // return !!this.$store.getters.utente ? this.$store.getters.utente.userInfo.idAnagrafica : null
    }
  },
  methods: {

    selectMotivoReclamo(e) {

      this.form = {
        idfornitore: 0,
        dataOra: moment().format("YYYY-MM-DD HH:mm:ss"),
        idreclamo: 0,
        idAnagrafica: '0',
        motivoReclamo: e.name,
        dettagli: '',
        idmotivoReclamo: 0,
        idstatoReclamo:1,
        idstep:11154,
        idreparto:3,
        idcanaleIn:13,
        reclamiSedi:[]      

      }

      switch(e.name) {
        case "Richiesta informazioni":  
          this.form.idmotivoReclamo = 1
          this.form.idstep = 11154          
        break;

        case "Reclamo" : 
          this.form.idmotivoReclamo = 2
          this.form.idstep = 9998          
        break;

        case "Richiesta rateizzazione" : 
          this.form.idmotivoReclamo = 2000024
          this.form.idstep = 5000045      
        break;

      }

      this.showAssistenzaModal = true


    },


    submitAssistenza(){
      this.$axios.$post('/api/v2/tickets?idAnagrafica='+this.idAnagrafica, {reclamo:this.form })
      .then(
        ( data ) => {
            this.$toast.success("Richiesta inserita con successo!");
            this.fetchData()
            this.form.dettagli = ''
            this.showAssistenzaModal = false

						  
					}).catch(e => {
            console.log(e)
          	this.$toast.fail("Errore di connessione, ti invitiamo a riprovare");

        }
      )
      .catch(e => {
        console.log(e)

      }) 
    },


    async fetchData() {
      this.loading = true
      await this.$axios.$post(
        'graphql/batch', 
        [
          {
            operationName: '', 
            query: `{ tickets(idanagrafica: ["${this.idAnagrafica}"], applicationID: "Customer.Next") { idreclamo,applicationID,isUpdatable,datpmo,motivoReclamo,descrizioneStato,descrizioneStep,__typename  }}`, 
            variables: {} 
          }
        ]
      )
      .then(
        ( data ) => {
          this.items = data[0] && data[0].data && data[0].data.tickets ? data[0].data.tickets : [] 

          this.loading = false

        }
      )
      .catch(e => {
              console.log('tiketsWidget', e)
              this.loading = false
        }) 
    }
  },
  mounted() {
    if(this.idAnagrafica)
      this.fetchData()
  }
}
</script>

<style>
  .ticket-activity{
    display: flex;
    justify-content: center;
    padding-top:10px;
  }
  .crea-ticket{
    margin-left:5px;
    box-shadow: 0 4px 9px rgba(0,0,0,0.1);
    border-radius: 35px;
    color:white;
    max-width: 400px;
    /* background-color: #009fe2; */
  }

  .action-color{
    color: rgb(68, 68, 68);
  }
  .tickets-widget-wrapper {
    margin-left: 5px;
    margin-right: 5px;
  }
  
  .ticket-widget-item {
    margin: 0px 0px 10px 0px;
  }

  .popup-content  {
    text-align: center;
  }

  .popup-content h4 {
    text-align: left;
  }

  .popup-content .popup-content-label {
    font-size: 12px;
    font-weight: bold;
    display: block;
  }

  .van-pagination__item--active {
    color: #fff;
    background-color: #63B32E !important;

}

.van-pagination__item--disabled, .van-pagination__item--disabled:active {
    color: #63B32E;
    background-color: #f7f8fa;
    cursor: not-allowed;
    opacity: 0.5;
}

.van-swipe__indicator--active {
    background-color: #63B32E;
    opacity: 1;
}

.van-icon-arrow, .van-notice-bar__content, .van-notice-bar__left-icon{
  color: #63B32E !important;
}

</style>