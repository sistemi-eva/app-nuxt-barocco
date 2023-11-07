<template>
      <div id="chart" >
        <van-cell class="cell title" title="Consumi per fasce"></van-cell>
        <client-only >
          <apexchart type="radialBar" height="390" :options="chartOptions" :series="series"></apexchart>
        </client-only>
      </div>
</template>

<script>
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
          if(keys[i] == 'competenza') continue
          let finalKeyName = ''
          switch(keys[i]) {
            case 'f0' : finalKeyName = 'Fascia 0'; break;
            case 'f1' : finalKeyName = 'Fascia 1'; break;
            case 'f2' : finalKeyName = 'Fascia 2'; break;
            case 'f3' : finalKeyName = 'Fascia 3'; break;
            case 'fp' : finalKeyName = 'Peak'; break;
            case 'op' : finalKeyName = 'Off Peak'; break;
            default:  finalKeyName = keys[i]; break
          }
          if(keys[i] == 'compDal' ||keys[i] == 'fp'|| keys[i] == 'op' || keys[i] == 'tot' ) continue
          finalObject[finalKeyName] = this.consumi.map(el => el[keys[i]]).reduce((a, b) => a + b, 0)
        }
        let seriesBef = []
        let labelsBef = []
        let totalBef = 0
        for (const [key, value] of Object.entries(finalObject)) {
          totalBef += value
          seriesBef.push(Number(value))
          labelsBef.push(key)        
        }
        this.series = seriesBef.map(val => val/totalBef*100)
        this.chartOptions.plotOptions.radialBar.dataLabels.total = {show: true, label: 'Totale', formatter: function (w) {return totalBef}}
        this.chartOptions.labels = labelsBef
        this.chartOptions.legend.formatter = (seriesName, opts) => {
          return [seriesName, " - ", seriesBef[opts.seriesIndex]]
        }
        this.chartOptions.plotOptions.radialBar.dataLabels.value.formatter = (val,a,b,c)  =>{
          let pos = a.globals.series.indexOf(parseFloat(val))
          return seriesBef[pos]
        }
              
        
    }
  }
},
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          height: 390,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
              image: undefined,
            },
            
            dataLabels: {
              total: {show: true, label: 'Total'},
              name: {
                show: true,
              },
              value: {
                show: true,
                formatter: (val,a,b,c)  =>{
                  console.log(a.globals.series,typeof(val))
                  let pos = a.globals.series.indexOf(parseFloat(val))
                    return seriesBef[pos]
                  }
              }
            }
          }
        },
        colors: ['#0077B5', '#ff5a00', '#ffa800', '#9dbf34','#E58C8A','#C8302D','#320C0B'],
        labels: ['Sample', 'Sample'],
        legend: {
          show: true,
          floating: true,
          fontSize: '12px',
          position: 'left',
          offsetX: 0,
          offsetY: 15,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0
          },
          formatter: function(seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
          },
          itemMargin: {
            vertical: 1
          }
        },
        responsive: [{
          breakpoint: 0,
          options: {
            legend: {
                show: true
            }
          }
        }]
      },
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
  /* margin-top: 10px;  */
  /* margin-bottom: 20px; */
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
