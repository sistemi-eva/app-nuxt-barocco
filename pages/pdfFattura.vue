<template>
  <Page style="margin:0px;padding:0px;overflow:hidden;height:100%">
    <div class="my-3" style="display: flex; justify-content: center;">
 	<van-button class="mx-4" icon="minus" size="small" round type="primary" :disabled="currentPage==1" @click="currentPage=currentPage-1"></van-button>
 		<span style="text-align:center">Pagina {{currentPage}} / {{pageCount}}</span>


 	<van-button class="mx-4" icon="plus" size="small" round type="primary" :disabled="currentPage==pageCount" @click="currentPage++"></van-button>

	<van-button class="mx-4" icon="label-o" size="small" round type="info" @click="print"> </van-button>
    </div>

  <pdf ref="pdfComponent" :src="currentPdf" :page="currentPage"			@num-pages="pageCount = $event"
			@page-loaded="currentPage = $event"></pdf>


  </Page>
</template>

<script>
import pdf from 'vue-pdf'
import print from 'print-js'
import printJS from 'print-js'

export default {
  name: 'pdfFattura',
  layout: 'dettaglioPaginaNoMenu',
  components: {
    pdf
  },
  computed: {
    currentPdf() { return this.$store.getters['currentPdf']},
    currentPdfRawData() { return this.$store.getters['currentPdfRawData']}

  },
  methods: {

urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
},



    print() {
      //var pdf = this.urlB64ToUint8Array(this.currentPdf.split(',')[1])
     printJS({printable: this.currentPdfRawData, type: 'pdf', base64:true, showModal:true})

    }
  },

  data(){
    return{
			currentPage: 1,
			pageCount: 0,
    }
  }
}
</script>
