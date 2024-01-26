<template>
  <div class="sites-widget-wrapper">
    <van-cell-group class="cell px-3" v-if="!searchToggle">
      <van-cell  class="cell title" title="Le tue forniture">
        <template #right-icon>
          <van-icon name="search" class="search-icon" @click="searchToggle = !searchToggle" />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="cell px-3" v-else>
    <van-search id="search" left-icon class="search px-3"  :clearable="false" v-model="search" placeholder="Ricerca fornitura" show-action  >
      <template #action>
        <van-icon name="close" class="close" @click="searchToggle = !searchToggle; search = ''" />
      </template>
    </van-search>
    </van-cell-group>
    <van-skeleton v-if="loading" title :row="7" />
    <transition name="slide-fade">

      <div v-if="!loading">

          <van-empty v-if="!filtraSedi.length" description="Nessun sito trovato" />
          <van-swipe :loop="false" class="sites-swipe  mt-3 mb-4" :width="290" >
            <template #indicator>
              <div></div>
            </template>
            <van-swipe-item :class="{'pl-2': i==0 }" v-for="(item,i) in filtraSedi" :key="item.idsede">
              <SediCard  :item="item"/>
            </van-swipe-item>
          </van-swipe>
      </div>
     </transition>

  </div>
</template>

<script>
export default {

  data() {
    return {
      search: '',
      searchToggle: false,
      query: '',
      items: [],
      loading: true,
      anagrafiche: {}
    }
  },
  computed: {
    filtraSedi(){
      const temps = this.items.filter(data => 
        !this.search 
       || data.idsede.toString().toLowerCase().includes(this.search.toLowerCase())
       || data.descrizioneSede.toString().toLowerCase().includes(this.search.toLowerCase())
       || data.indirizzo.toString().toLowerCase().includes(this.search.toLowerCase()) 
       || data.localita.toString().toLowerCase().includes(this.search.toLowerCase()) 
       || data.cap.toString().toLowerCase().includes(this.search.toLowerCase()) 
       )
       return temps
    },
    idAnagrafica() { /* sostituire con mapGetters */
      return !!this.$store.getters.id_anagrafica ? this.$store.getters.id_anagrafica : 
      !!this.$store.getters.utente ? this.$store.getters.utente.userInfo.idAnagrafica : null
    }
  },
  methods: {
    async fetchData() {
      this.loading = true
      let nomeCompleto = ''
      var idsediok = []
      await this.$axios.$post('graphql/batch', 
          [
            {
              operationName: '', 
              query: `{ anagrafica(idanagrafica: "${this.idAnagrafica}")  { nome,cognome,ragSoc}}`, 
              variables: {} 
            }
          ]
        ).then(
        async ( data ) => {
          let tempAnagrafica = data[0] && data[0].data && data[0].data.anagrafica ? data[0].data.anagrafica : {} 
          if(tempAnagrafica.nome && tempAnagrafica.cognome) {
            nomeCompleto = tempAnagrafica.cognome + ' ' + tempAnagrafica.nome
          }else if(tempAnagrafica.ragSoc) nomeCompleto = tempAnagrafica.ragSoc

          /*
          await this.$axios.$post('graphql/batch', 
            [
              {
                operationName: '', 
                query: `{ stickerTypes(objectTypeCodes: [1]) {bitFlagHex    sticker    entity    __typename  }}`, 
                variables: {} 
              }
            ]
            )
            */

          await this.$axios.$post('graphql/batch', 
            [
              {
                operationName: '', 
                query: `{ contratti(idanagrafica: ["${this.idAnagrafica}"] )  { bitMask, idrigaContratto, idsede,macroStato,__typename,idanagrafica }}`, 
                variables: {} 
              }
            ]
            ).then(
            async ( data ) => {
              let contratti = data[0] && data[0].data && data[0].data.contratti ? data[0].data.contratti : [] 
              
              for (var i in contratti){
                if(contratti[i].bitMask == this.$cookies.get("bitmask")){
                  idsediok.push(contratti[i].idsede)
                }
              }

              await this.$axios.$post('graphql/batch', 
              [
                {
                  operationName: '', 
                  query: `{ sedi(idanagrafica: ["${this.idAnagrafica}"], idtipiSede: "5,6")  { idsede, bitMask, idtipiSede,idanagrafica,idtipiSede,cap,civico,descrizioneSede,indirizzo,localita,tipiSede,telefono,__typename }}`, 
                  variables: {} 
                }
              ]
            )
            .then(
              async ( data ) => {
      
                this.items = data[0] && data[0].data && data[0].data.sedi ? data[0].data.sedi : [] 
                this.items = this.items.filter((el)=> {
                  for(let i in contratti){
                    if(el.idsede === contratti[i].idsede && contratti[i].macroStato != 'ANNULLATO') {
                      if( ( el.idtipiSede.split(',').includes('5') || el.idtipiSede.split(',').includes('6') ) && idsediok.includes(el.idsede) ) return true
                      else return false
                    }
                  }
                })
                for(let i in this.items){
                  if(this.items[i].idanagrafica == this.idAnagrafica && nomeCompleto.length>0) {
                    this.items[i].descrizioneSede = nomeCompleto
                  }
                }
                this.items.forEach(async (sede, indiceSede) => {
                  this.$set(this.items[indiceSede], 'saldo', 0.0)
                  await this.$axios.$post(
                    'graphql/batch',
                    [
                      {
                        operationName: '', 
                        query: `{ fatture(idanagrafica: ["${this.idAnagrafica}"], idSedi: [${sede.idsede}], statoPagamento: ["Non Pagata"])  { saldo ,__typename }}`, 
                        variables: {} 
                      }
                    ]
                  )
                  .then(
                    ( fattureResponse ) => {
                      let saldiFatture = fattureResponse[0] && fattureResponse[0].data && fattureResponse[0].data.fatture ? fattureResponse[0].data.fatture : []
                      let saldo = saldiFatture.reduce((ss,fatt) => {
                        ss += parseFloat(fatt.saldo)
                        return ss
                      }, 0.0)
                      this.$set(this.items[indiceSede], 'saldo', saldo)
                    },
                    ( error ) => { console.log('sediWidget:fatture', error) }
                  )
                  .catch( e => {
                    this.$set(this.items[indiceSede], 'saldo', '--')
                  })
                  
                });
              }
            )
            .catch(e => console.log('sediWidget:sedi', e)) 
            }).catch(e => console.log('contratti:sedi', e)) 
      }).catch(e=>{console.log("error anagrafica",e)})
      this.loading = false
    }
  },
  mounted() {
    if(this.idAnagrafica)
      this.fetchData()
  }
}
</script>

<style>

.search{
  margin-left: -12px;
  color: rgb(68, 68, 68);
}
.cell .title{
  font-size: 18pt;
  font-weight: bold;
  color: #e5044d;
  align-items: center;
}


.van-search__action {
  padding: 0px;
}

#search {

  font-size: 18px;
    font-weight: 300;
        align-items: center;
}
</style>
