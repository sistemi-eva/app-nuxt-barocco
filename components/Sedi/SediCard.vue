<template>
  <van-card @click="showDetail" class="card sedi-card" :style="backgroundColor" :class="{ textPrimary : item.idtipiSede.split(',').includes('5') } ">
    <template #title>
      <div class="sedi-card-servizio">
        <div class="sedi-card-servizio-icon mr-3">
          <van-image width="20" :src="iconServizio" />
        </div>
        <div class="sedi-card-servizio-text">
          <h2>{{ nomeServizio }}</h2>
        </div>
      </div>
    </template>
    <template #desc>
      <div class="sedi-card-fornitura">
        <div class="sedi-card-fornitura-saldo">
          <div class="sedi-card-fornitura-saldo-label"></div>
          <div class="sedi-card-fornitura-saldo-importo">
            <animated-number 
              :value="item.saldo" 
              :formatValue="formatSaldo" 
              :duration="500"
            />
            
          </div>
          <div class="sedi-card-fornitura-saldo-extra"></div>
        </div>
        <div class="sedi-card-fornitura-cliente van-ellipsis">
          {{ nomeCliente }}
        </div>
        <div class="sedi-card-fornitura-indirizzo">
          <div class="sedi-card-fornitura-indirizzo">
            <div class="sedi-card-fornitura-indirizzo-primary-line van-ellipsis">
              {{ item.indirizzo }}
            </div>
            <div class="sedi-card-fornitura-indirizzo-secondary-line van-ellipsis">
              <span>{{ item.cap }}</span>, <span> {{ item.localita }}</span>
            </div>
          </div>
        </div>
        
      </div>
    </template>
  </van-card> 
</template>

<script>
import AnimatedNumber from "animated-number-vue";

export default {
  components: {
    AnimatedNumber
  },

  computed: {
    nomeServizio() {
      if(this.item.idtipiSede.split(',').includes('6')) return 'gas naturale'
      if(this.item.idtipiSede.split(',').includes('5')) return 'energia elettrica'
      return ''
    },
    iconServizio() {
      if(this.item.idtipiSede.split(',').includes('6')) return '/fiamma.png'
      if(this.item.idtipiSede.split(',').includes('5')) return '/lampadina-blu.png'
      return ''
    },
    nomeCliente() {
      return this.item.descrizioneSede.split(':').pop() || ''
    },


    backgroundImage(){
      let backgroundImage = null
      if(this.item){
        if(this.item.idtipiSede.split(',').includes('6')) backgroundImage = "/fiamma.png"
        if(this.item.idtipiSede.split(',').includes('5')) backgroundImage = "/lampadina-blu.png"
      }
        return backgroundImage
    },
    backgroundColor() {
      let backgroundColor = "#f8f9fa"
      if(this.item){
        if(this.item.idtipiSede.split(',').includes('6')) backgroundColor = "#009fe2"
        if(this.item.idtipiSede.split(',').includes('5')) backgroundColor = "#ffec00"
      }
        return {
          backgroundColor: backgroundColor,
        }
      }
    },
  methods: {
    formatSaldo(value) {
       if (!value) return '0,00' + ' €'
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' €'
    },


    showDetail(){
      this.$router.push({name:'sede-dettaglio', query :
        {
          ...this.item,
          nomeCliente: this.nomeCliente
        }
      })
    },
  },
props:{
    item:{
      type: Object,
      required: true,
      default: () => []
    },
  }
}
</script>

<style>

.sedi-card {
  margin-left: 5px;
  margin-right: 15px;
  color: white;
}

.sedi-card-servizio {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-transform: capitalize;
}

.sedi-card-servizio-text {
  flex:1;
  text-align: left;
  
}

.sedi-card-fornitura {
  margin: 0px 0;
  line-height: 1.6em;
}

.sedi-card-fornitura-cliente {
  font-size: 16px;
      text-transform: uppercase;

}

.sedi-card-fornitura-saldo {
  justify-content: flex-start;
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  /*background-color: white;*/
  /*box-shadow: 0 4px 9px rgba(0,0,0,0.1);*/
  border-radius: 35px;
  margin: 5px 0px;
  /*
  display: flex;
  margin-top:20px;
  font-size: 14px;
  border-radius: 20px;
  background-color: white;
  padding: 5px 10px;
  box-shadow: 2px 2px 2px #333;
  */
}

.sedi-card-fornitura-saldo-importo {
  flex:1;
  text-align: left;
  font-size: 2.1rem;
  font-weight: bold;
}

</style>
