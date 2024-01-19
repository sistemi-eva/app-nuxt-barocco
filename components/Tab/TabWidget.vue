<template>
  <van-tabs :style="{'--bkgImage':height+'px'}" v-model="active" :before-change="beforeChange" >
    <van-tab title="Fatture" name=fatture class="tab-section">
      <template #default >
        <transition appear name="slide-fade">
        <van-skeleton v-if="loading" title :row="7" />
        <div v-if="fatture.length > 0 && !loading" >
        <van-cell-group v-for="fattura in fatture" :key="fattura.id">
          <FatturaCard  :fattura="fattura"  />
        </van-cell-group>
        </div>
        </transition>
        <van-empty v-if="fatture.length==0 && !loading" description="Nessuna Fattura trovata" />
      </template>
    </van-tab>
    <van-tab v-if="sede.idtipiSede && sede.idtipiSede.split(',').includes('6')" title="Letture" name=letture class="tab-section">
      <template #default>
       <transition appear name="slide-fade">
        <van-skeleton v-if="loading" title :row="7" />
          <div v-if="letture.length > 0 && !loading">
            <van-cell-group  v-for="lettura in letture" :key="lettura.id">
              <LetturaLuceCard v-if="sede.idtipiSede && sede.idtipiSede.split(',').includes('5')" :lettura="lettura" />
              <LetturaGasCard v-else :lettura="lettura" />
            </van-cell-group>
          </div>
       </transition>
      <van-empty v-if="letture.length == 0 && !loading" description="Nessuna Lettura trovata" />
      </template>
    </van-tab>
    <van-tab title="Consumi" name=consumi class="tab-section">
      <template #default>
        <transition appear name="slide-fade">
          <van-skeleton v-if="loading" title :row="7" />
          <div v-if="consumi.length > 0 && !loading" >
          <van-cell-group v-if="sede.idtipiSede && sede.idtipiSede.split(',').includes('5')">
            <!-- <FasceLuce :consumi="consumi" /> -->
            <ConsumiLuce :consumi="consumi" />
          </van-cell-group>
          <van-cell-group v-else>
            <ConsumiLuce :consumi="consumi" />
          </van-cell-group>
          </div>
          <van-empty v-if="consumi.length == 0 && !loading" description="Nessun Consumo trovato" />
        </transition>
      </template>
    </van-tab>
  </van-tabs>
</template>

<script>

import FatturaCard from './FatturaCard.vue';
import LetturaGasCard from './LetturaGasCard.vue';
import LetturaLuceCard from './LetturaLuceCard.vue';
import ConsumiLuce from './ConsumiLuce.vue';
export default {
  components: {
    FatturaCard,
    LetturaGasCard,
    LetturaLuceCard,
    ConsumiLuce
  },
  async mounted () {
    
    let vm = this;      
    vm.$nextTick(function () {      
        vm.beforeChange(this.active)
    });
 },
 methods:{
   async beforeChange(index) {
     try {
        this.loading = true
       var thisMonth = new Date().getMonth()+1
        thisMonth = thisMonth < 10 ? "0"+ thisMonth : thisMonth
        var thisYear = new Date().getFullYear()
        var incremento = 130
        switch(index){
          case 'fatture' :
            this.fatture = await this.$axios.$post(
                'graphql/batch',
                [
                  {
                    operationName: '', 
                    query: `{ fatture(idanagrafica: ["${this.sede.idanagrafica}"], idSedi: [${this.sede.idsede}], bitMask: \"0000000000000001|0\")  {idfattura, statoPagamento,pagamentoOnlineAbilitato,cardToken,creditCard,cardStatusMask,codUtility,dataScadenza,dataPagamento,numeroDoc,numeroFattura,dataEmissione,importo,saldo,hasPdftestata,hasPdfdettaglio,compDal,compAl,__typename}}`, 
                    variables: {} 
                  }
                ]
              )
            this.fatture = this.fatture[0].data.fatture.reverse()
            let finalFatture = '100%'
            document.getElementsByClassName("van-tab__pane")[0].style.minHeight = finalFatture
          break;
          case 'letture' : 
            this.letture = await this.$axios.$get(`api/lettura/gas/get?idsede=${this.sede.idsede}&lastLetture=5`)
            this.letture = this.letture.data.letturaGas.reverse()
            let finalLetture = '100%'
            document.getElementsByClassName("van-tab__pane")[1].style.minHeight = finalLetture
          break;
          case 'consumi' :
            if(this.sede.idtipiSede && this.sede.idtipiSede.split(',').includes('5')) {
              let temp = await this.$axios.$post('api/consumi-fatturati/ee/data', 
                {from: `${thisYear-1}-${thisMonth}-01`, to: `${thisYear}-${thisMonth}-01`, idSede: [this.sede.idsede], idAnagrafica: [this.sede.idanagrafica]})
              let data = await this.$axios.$get(`api/consumi-fatturati/ee?token=${temp.access_token}`)
              this.consumi = data && data.data ? data.data : []
            }
            else {
              let temp = await this.$axios.$post('api/consumi-fatturati/gas/data', 
                {from: `${thisYear-1}-${thisMonth}-01`, to: `${thisYear}-${thisMonth}-01`,idSede: [this.sede.idsede], idAnagrafica: [this.sede.idanagrafica]})
              let data = await this.$axios.$get(`api/consumi-fatturati/gas?token=${temp.access_token}`)
              this.consumi = data && data.data ? data.data : []
            }
            if(this.sede.idtipiSede && this.sede.idtipiSede.split(',').includes('5')) document.getElementsByClassName("van-tab__pane")[1].style.minHeight = '100%'
            else document.getElementsByClassName("van-tab__pane")[2].style.minHeight = '100%'
          break;
        }
       this.loading = false
       this.active = index
     } catch (error) {
     }
    }
 },
  props: {
      sede: {
        type: Object,
        required: true,
        default: {}
      }
  },
  computed: {
    heightSet() {
      return {
        "overflow": "scroll !important",
        height: `${this.height}px`
      };
    }
  },
data() {
    return {
      active: 'fatture',
      search: false,
      query: '',
      fatture: [],
      letture: [],
      consumi: [],
      loading: true,
      height: document.documentElement.clientHeight-305
    }
  }
}
</script>

<style>
.van-tabs__content{  
  overflow: scroll !important;
  height: var(--bkgImage);
  
}
.tab-section{
  padding:10px;
  background-color:white;  
}
.centered{
  justify-content: center;
  text-align: center;
}
</style>