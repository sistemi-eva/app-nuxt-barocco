<template>
  <div @click.stop="" class="fattura">
    <van-popup round  position="top" :style="{ height: '80px' }" v-model="show">
      <div style=" display:flex; align-items:center; justify-content:center; width:100%;position: absolute;top: 0">
        <van-image src="/icons/download-up.gif" style="margin-right:15px" class="my-4" width="30" lazy-load />
        <h3>Download in corso</h3>
      </div>
    </van-popup>
    <div class="fattura-item-left">
      <h5 class="fattura-item" style="color:grey">FATTURA</h5>
      <h4 class="fattura-item textDefault" >{{fattura.numeroFattura}}</h4>
      <h5 class="fattura-item" style="color:grey" >del {{fatturaDel}}</h5>
      <h5 class="fattura-item" style="color:grey" >scad. {{fatturaScadenza}}</h5>
    </div>
    <div class="fattura-item-right-top">
        <h2 class="fattura-item textDefault" >{{fattura.importo | currency}} </h2>
        <h5 class="fattura-item" :style="fattura.pagamentoOnlineAbilitato == 1 && fattura.statoPagamento== 'Non Pagata' ? 'color:red': 'color:green'">{{fattura.statoPagamento}}</h5>
      <div class="fattura-item-right-bottom">
        <van-button icon="paid" v-if="fattura.pagamentoOnlineAbilitato == 1 && fattura.statoPagamento== 'Non Pagata'" type="danger" round size="small" :loading="payment" @click="paga(fattura.idfattura)">Paga</van-button>  
        
        <div v-if="fatturaNotAvailable(fatturaDel)">
          <van-button icon="down" size="small" type="info" round @click="myFattNonDisp()" :loading="downloading" loading-type="spinner">Fattura non disp. </van-button>
        </div>
        <div v-else>
          <van-button icon="down" size="small" type="info" round @click="downloadFattura(fattura.idfattura, fattura.numeroFattura)" :loading="downloading" loading-type="spinner">PDF </van-button>
          <van-button icon="down" size="small" type="info" round @click="downloadFatturaDETT(fattura.idfattura, fattura.numeroFattura)" :loading="downloading2" loading-type="spinner">DETT</van-button>
        </div> 

      </div>

    </div>
  </div>
</template>

<script>
import {loadStripe} from '@stripe/stripe-js/pure';

import moment from 'moment'
export default {
props:{
    fattura:{
      type: Object,
      required: true,
      default: () => []
    },
  },
data() {
  return {
    show:false,
    downloading: false,
    downloading2: false,
    payment: false
  }
},
  computed: {
    fatturaDel(){
      return moment(this.fattura.dataEmissione).format('DD/MM/YYYY');
    },
    fatturaScadenza(){
      return moment(this.fattura.dataScadenza).format('DD/MM/YYYY');
    }
  },

  methods: {

    fatturaNotAvailable(data){
      return moment.utc(data).isAfter('01/02/2024')
    },

    myFattNonDisp(){
      this.$dialog.alert({
        message: 'La fattura non è disponibile. Si prega di contattare il servizio clienti.',
        confirmButtonText: 'Chiudi',
        closeOnClickOverlay: true
      })
    },


    showNotify() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3500);
    },
    async paga(InvoiceId) {
      this.payment = true
      const pkStripe = await this.$axios.$get('api/Payment/stripe-public-key').catch(e => {
        this.$dialog.alert({
          message: 'Questa funzionalità è attualmente in manutenzione, ti invitiamo a riprovare più tardi. Grazie',
          confirmButtonText: 'Chiudi',
          closeOnClickOverlay: true
        })
      })

    if(!pkStripe.publicKey) {
      this.$dialog.alert({
        message: 'Si è verificato un errore di connessione, ti invitiamo a riprovare. Grazie',
        confirmButtonText: 'Chiudi',
        closeOnClickOverlay: true
      })
    }
    setTimeout(() => {
      this.payment = false
    }, 5000);
    // Stripe.js will not be loaded until `loadStripe` is called
    const stripe = await loadStripe(pkStripe.publicKey);
    this.$axios.$post('api/Payment/invoice-checkout', {
      InvoiceId: InvoiceId,
      SuccessUrl: `${process.env.pay_success_url}`,
      FailureUrl: `${process.env.pay_failure_url}`,
      PaymentType: 0
    })
    .then(function(session) {
      return stripe.redirectToCheckout({ sessionId: session.data.postData.sessionId});
    })
    .then(function(result) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using `error.message`.
      if (result.error) {
          this.$dialog.alert({
          message: 'Si è verificato un errore di connessione, ti invitiamo a riprovare. Grazie',
          confirmButtonText: 'Chiudi',
          closeOnClickOverlay: true
        })
      }
    });
    },

    async isPdfUrl(url) {
        try {
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`Errore nella richiesta: ${response.status} ${response.statusText}`);
          }

          const responseBody = await response.text();
          var rjson = JSON.parse(responseBody)
          return rjson.name;
        } catch (error) {
          console.error(`Si è verificato un errore: ${error.message}`);
          return null;
        }
    },


    async downloadFattura(id) {
      this.downloading = true
      this.$axios.$get('/api/authorization/auth-operation-token?operationType=downloadfattura&operationData='+id)
      .then(async (data)=>{
        let url = `${process.env.api_endpoint}/bolletta?url=${process.env.api_endpoint2}/api/fattura/pdf?permissionToken=${data.access_token}&dettaglio=false`
        
        
        this.downloading = false
        //return this.myBlob(url, "bolletta.pdf")
        
         
        var ispdf = await this.isPdfUrl(url)
        if( ispdf == "Error" ){
          
          return this.$dialog.alert({
            message: 'La fattura è in fase di contabilizzazione. Il PDF sarà disponibile a breve per il download.',
            confirmButtonText: 'Chiudi',
            closeOnClickOverlay: true
          })

        }

        if(!navigator.userAgent.match(/iPhone/i) && !navigator.userAgent.match(/iPod/i) && !navigator.userAgent.match(/iPad/i)){
            this.showNotify()
            window.location.href =url
          }
          else{
          window.open(url,'_self')
          }
          
     
      }).catch((e)=> {
        console.log(e)
        this.$dialog.alert({
          message: 'La fattura è in fase di contabilizzazione. Il PDF sarà disponibile a breve per il download.',
          confirmButtonText: 'Chiudi',
          closeOnClickOverlay: true
        })
      })
    },

    async myBlob(url, filename){

      const anchorElement = document.createElement('a');

      document.body.appendChild(anchorElement);

      anchorElement.style.display = 'none';

      var self = this;

      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';

      xhr.onload = function(e) {
        if (this.status == 200) {
          // Note: .response instead of .responseText


          
          var out;

            try {
                out = new Blob([this.response], {type: 'application/pdf'});
                //alert("ok")

            }
            catch (e) {
                window.BlobBuilder = window.BlobBuilder ||
                        window.WebKitBlobBuilder ||
                        window.MozBlobBuilder ||
                        window.MSBlobBuilder;

                if (e.name == 'TypeError' && window.BlobBuilder) {
                    var bb = new BlobBuilder();
                    bb.append(this.response);
                    out = bb.getBlob("application/pdf");
                    //alert("case 2");
                }
                else if (e.name == "InvalidStateError") {
                    // InvalidStateError (tested on FF13 WinXP)
                    out = new Blob([this.response], {type: "application/pdf"});
                    //alert("case 3");
                }
                else {
                    // We're screwed, blob constructor unsupported entirely   
                    //alert("Errore");
                }
            }




            var blob = out;










          //var blob = new Blob([this.response], {type: 'application/pdf'}),
          var myurl = window.URL.createObjectURL(blob);
          
          console.log(blob)
          if (blob.size == 0) {
            return this.$dialog.alert({
              message: 'La fattura è in fase di contabilizzazione. Il PDF sarà disponibile a breve per il download.',
              confirmButtonText: 'Chiudi',
              closeOnClickOverlay: true
            })

          }


          if(!navigator.userAgent.match(/iPhone/i) && !navigator.userAgent.match(/iPod/i) && !navigator.userAgent.match(/iPad/i)){
            self.showNotify()
            window.location.href =myurl
          }
          else{
          window.open(myurl,'_self')
        
          }

          /*anchorElement.href = myurl;
          anchorElement.download = filename;
          anchorElement.click();
          */
          //window.URL.revokeObjectURL(myurl);
        }
        else{
          return this.$dialog.alert({
              message: 'Fattura PDF al momento non disponibile',
              confirmButtonText: 'Chiudi',
              closeOnClickOverlay: true
            })
        }
      };

      xhr.send();
    },


    async downloadFatturaDETT(id) {
      this.downloading2 = true
      this.$axios.$get('/api/authorization/auth-operation-token?operationType=downloadfattura&operationData='+id)
      .then(async (data)=>{
        let url = `${process.env.api_endpoint}/bolletta_dett?url=${process.env.api_endpoint2}/api/fattura/pdf?permissionToken=${data.access_token}`

        this.downloading2 = false
        //return this.myBlob(url, "bolletta_dett.pdf")

        var ispdf = await this.isPdfUrl(url)
        if( ispdf == "Error" ){
          
          return this.$dialog.alert({
            message: 'La fattura è in fase di contabilizzazione. Il PDF sarà disponibile a breve per il download.',
            confirmButtonText: 'Chiudi',
            closeOnClickOverlay: true
          })

        }
        
        console.log(data)
        if(!navigator.userAgent.match(/iPhone/i) && !navigator.userAgent.match(/iPod/i) && !navigator.userAgent.match(/iPad/i)){
            this.showNotify()
            window.location.href =url
          }
          else{
          window.open(url,'_self')
        
        }

        
      
      }).catch((e)=> {
        console.log(e)
        this.$dialog.alert({
          message: 'La fattura è in fase di contabilizzazione. Il PDF sarà disponibile a breve per il download.',
          confirmButtonText: 'Chiudi',
          closeOnClickOverlay: true
        })
      })
    }
  }
}
</script>

<style scoped>
.wrapper {
    /* opacity: 0.9; */
    background-color: white;
    display: flex;
    flex-direction: inherit;
    align-items: center;
    justify-content: flex-start;
    height: 15%;
    border-radius: 10px;
  }
.fattura{
  margin : 10px 0 10px 0;
  padding:15px;
  justify-content: space-between;
  display: flex;
  background-color: #fff;
  box-shadow: 0 4px 9px rgba(0,0,0,0.1);
  border-radius: 25px;
  /* margin-top: 10px;  */
  /* margin-bottom: 20px; */
}
.fattura-item{
  margin: 5px;
  overflow: hidden;
  text-overflow: ellipsis; 
  max-width: 150px;

}
.fattura-item-left{
  text-overflow:ellipsis;

}
.fattura-item-right-top{
text-align: right;

}
.fattura-item-right-bottom{
text-align: right;
}

.van-button--small {
    height: 32px;
    padding: 0px 4px;
    font-size: 11px;
}


</style>
