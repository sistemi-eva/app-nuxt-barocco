<template>
  <SediDettaglio />
</template>

<script>
export default {
  name: 'sede-dettaglio',
  layout: 'dettaglioPagina',
  data() {
    return {
      options : {
          chart: {
            toolbar:{
              show:false
            },
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '60%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'],
        },
        yaxis: {
          title: {
            text: 'Consumi Fatturati'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " Kwh"
            }
          }
        }
        },
      series: [{
          name: 'Fattura',
          data: [44, 55, 57, 56, 61, 58]
        }],
    }
  }
}
</script>
