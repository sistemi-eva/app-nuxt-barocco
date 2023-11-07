<template>
  <div id="chart" >
    <van-cell class="cell title" title="Consumi per mese"></van-cell>
    <client-only >
      <apexchart type="bar" height="520" :options="chartOptions" :series="series"></apexchart>
    </client-only>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props:{
    consumi:{
      type: Array,
      required: true,
      default: () => []
    },
  },
  async mounted (){
    await this.updateChart(this.consumi)
  },
  methods:{
    updateChart(){
      let finalObject = {}
      if(this.consumi.length > 0){
        let keys = Object.keys(this.consumi[0])
        for(let i in keys){
          let finalKeyName = ''
          switch(keys[i]) {
            case 'f0' : finalKeyName = 'Fascia 0'; break;
            case 'f1' : finalKeyName = 'Fascia 1'; break;
            case 'f2' : finalKeyName = 'Fascia 2'; break;
            case 'f3' : finalKeyName = 'Fascia 3'; break;
            case 'fp' : finalKeyName = 'Peak'; break;
            case 'op' : finalKeyName = 'Off Peak'; break;
            case 'prelieviSMC' : finalKeyName = 'Consumo SMC'; break;
            default:  finalKeyName = keys[i]; break
          }
          if(keys[i] == 'fp'|| keys[i] == 'op' || keys[i] == 'tot' || keys[i] == 'prelieviGJ' || keys[i] == 'pcs') continue
          finalObject[finalKeyName] = this.consumi.map(el => (keys[i]== 'compDal' || keys[i] == 'competenza') ? moment(el[keys[i]]).format('MM/YYYY') : el[keys[i]])
        }
        let tempSeries = []
        let tempDate = []
        for (const [key, value] of Object.entries(finalObject)) {
          if(key == 'compDal' || key == 'competenza') tempDate = value
          else tempSeries.push({name:key,data:value})
        }
        this.series = tempSeries
        this.chartOptions.xaxis.categories = tempDate
        this.chartOptions.legend.showForSingleSeries = true
      }
    } 
  },
  data() {
    return {
    series: [],
    chartOptions: {
      colors: ['#009cff', '#ff5a00', '#ffa800', '#9dbf34','#E58C8A','#C8302D','#320C0B'],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
         toolbar: {
          show: false,
        }
      },
      
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: [],
        labels: {
          show:false,
          formatter: function (val) {
            return val
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val 
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: -16
      }
    }
    }
  }
}
</script>

<style scoped>
.bill{
  margin : 10px;
  padding:10px;

  justify-content: space-between;
  display: flex;
  background-color: #fff;
}
.bill-item{
  margin: 5px;
  overflow: hidden;
  text-overflow: ellipsis; 
  max-width: 150px;

}
.bill-item-left{
  text-overflow:ellipsis;

}
.bill-item-right-top{
text-align: right;

}
.bill-item-right-bottom{
text-align: right;
}

</style>
