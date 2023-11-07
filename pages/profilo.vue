<template>
<div>

  <Page class="dashboard">
        <van-cell class="cell title" title="Profilo"></van-cell>
        <van-cell class="cell subtitle" title=" In questa sezione puoi facilmente modificare le tue informazioni di profilo, le privacy e la password del tuo account."></van-cell>


<van-form @submit="updateProfilo" class="mt-4">

  <van-cell class="cell title" title="Recapiti"></van-cell>
  <VueInputUi v-model="form.email" required type="email" color="#009fe2" label="E-mail"/>
  <VuePhoneNumberInput color="#009fe2" valid-color="#41ca85" class="mt-3" v-model="form.cellulare" :error="errors.cellulare" :translations="{
    countrySelectorLabel: 'Prefisso',
    countrySelectorError: 'Scegli un paese',
    phoneNumberLabel: 'Cellulare',
    example: 'Esempio :'
  }" @update="changeCellulare" />
  <van-field v-if="errors.cellulare" :error-message="errors.cellulare ? 'Formato non corretto': ''" />

  <VuePhoneNumberInput color="#009fe2" valid-color="#41ca85" v-model="form.telefono1" class="mt-3" :error="errors.telefono1"  :translations="{
    countrySelectorLabel: 'Prefisso',
    countrySelectorError: 'Scegli un paese',
    phoneNumberLabel: 'Telefono fisso',
    example: 'Esempio :'
  }" @update="changeTelefono" />
  <van-field v-if="errors.telefono1" :error-message="errors.telefono1 ? 'Formato non corretto': ''" />
  <div class="center  px-5 mt-3">
    <van-button block round type="info" native-type="Submit">
      Aggiorna profilo
    </van-button>
  </div>
</van-form>
<van-form @submit="updatePassword" class="mt-4 profilo">
<van-cell class="cell title" title="Modifica Password"></van-cell>
  <VueInputUi v-model="form.password" type="password" :error="errors.password_old" required color="#009fe2" label="Password attuale"/>
  <van-field v-if="errors.password_old" :error-message="errors.password_old ? 'La password non è valida': ''" />
  <VueInputUi v-model="form.password_new" :type="changeTypePassword"  required class="mt-3" color="#009fe2" label="Nuova Password"/>
  <van-icon class="icon" v-if="changeTypePassword=='password'"  name="eye-o" @click="changeTypePassword = 'text'" />
  <van-icon class="icon" v-else  name="closed-eye" @click="changeTypePassword = 'password'" />
  <van-field v-if="errors.password_new" :error-message="errors.password_new? 'Usa almeno 8 caratteri. Includi almeno un numero, una lettera minuscola, una lettera maiuscola e un carattere speciale.': ''" />
  <van-field v-if="errors.waitTime" :error-message="errors.waitTime? 'Devi aspettare almeno 5 minuti per poter modificare nuovamente la password.': ''" />
  <van-field v-if="errors.notOkPassword" :error-message="errors.notOkPassword ? 'Non puoi utilizzare una password che hai già utilizzato.': ''" />
  
  <div class="center  px-5 mt-3">
    <van-button block round type="info" native-type="Submit">
     Modifica Password
    </van-button>
  </div>
</van-form>
<van-form @submit="updatePrivacy" class="mt-4 profilo">
<van-cell class="cell title" title="Preferenze Privacy"></van-cell>
<van-cell class="" >Presa visione dell'
  <span @click.stop="changePage({name:'web',iframe_url:'https://www.uniongaseluce.it/page/privacy-policy'})" style="text-decoration: underline; "> 
    informativa
  </span>
   privacy ai sensi dell'art. 13 del Regolamento UE n. 2016/679 (GDPR)</van-cell>
  <van-radio-group v-model="form.privacyCommerciale" class="ml-3 mt-4">
    <van-radio :name="true" class="pb-2">presto il consenso</van-radio>
    <van-radio :name="false">nego il consenso</van-radio>
</van-radio-group>
<van-cell class="" >al trattamento dei miei dati per ricevere informazioni commerciali e offerte da Union Gas e Luce</van-cell>


  <van-radio-group v-model="form.privacyCommercialeTerzi" class="ml-3 mt-4">
    <van-radio :name="true" class="pb-2">presto il consenso</van-radio>
    <van-radio :name="false">nego il consenso</van-radio>
</van-radio-group>
<van-cell class="" >al trattamento dei miei dati per ricevere informazioni commerciali da Società terze</van-cell>


  <van-radio-group v-model="form.privacyProfilazioneConsumo" class="ml-3 mt-4">
    <van-radio :name="true" class="pb-2">presto il consenso</van-radio>
    <van-radio :name="false">nego il consenso</van-radio>
</van-radio-group>
<van-cell class="" >al trattamento dei miei dati per la profilazioni delle abitudini di consumo e ricevere un'offerta sempre più fedele alle mie esigenze</van-cell>





  <div class="center mb-5 px-5">
    <van-button block round type="info" native-type="Submit">
      Aggiorna privacy
    </van-button>
  </div>
</van-form>




<!--van-form @submit="updatePassword" class="mt-4">


<van-cell class="cell title" title="Password"></van-cell>

  <van-field v-model="password" type="password" label="Nuova Password" placeholder="Min 8 caratteri" />




  <div style="margin: 16px;" class="center">
    <van-button block round type="info" native-type="Submit">
      Cambia Password
    </van-button>
  </div>
</van-form-->






  </Page>
</div>
</template>

<script>

import {mapGetters} from 'vuex'
export default {
  name: 'profilo',
  layout: 'default',



  data() {
    return {
      changeTypePassword: 'password',
      formattedCellulare: null,
      formattedTelefono: null,
      password: '',
      form: {},
      errors: {
        email:false,
        cellulare: false,
        telefono1: false,
        password_old: false,
        password_new: false,
        waitTime: false,
        notOkPassword: false
      }
    }
  },

  computed: {
     ...mapGetters({
      utente: 'utente'
    }),
  },

  mounted() {
      this.form = JSON.parse(JSON.stringify(this.utente.userInfo))
 
  },
  methods: {
    changePage({name,iframe_url}){
        this.$router.push({path: `/${name}`, query : {iframe_url}})
    },

    changeCellulare(e) {
      this.formattedCellulare = e.formattedNumber

    },

    changeTelefono(e) {
      this.formattedTelefono = e.formattedNumber

    },
    updateProfilo() {


        this.$axios.post('/api/user/info/update', 
            {
              email: this.form.email,
              cellulare: this.form.cellulare ? this.formattedCellulare : null,
              telefono1:  this.form.telefono1 ?  this.formattedTelefono : null
            } 
        ).then(res => {
          this.$toast.success('Recapiti aggiornati!');
          this.errors = {
              email:false,
              cellulare: false,
              telefono1: false
          }
            
        }).catch(e => {

            this.$toast.fail('Errore aggiornamento recapiti');

            let errors = e.response.data.errors
            this.errors.cellulare = errors.cellulareRegex ? true :  false
            this.errors.telefono1 =errors.telefono1Regex ? true : false
            this.errors.email = errors.emailRegex ? true : false

         

          
        })


    },

    updatePrivacy() {

      this.$axios.post('/api/user/privacy/update', 
        
        {
          privacyCommerciale: this.form.privacyCommerciale,
          privacyCommercialeTerzi: this.form.privacyCommercialeTerzi,
          privacyProfilazioneConsumo: this.form.privacyProfilazioneConsumo
        }
        
        ).then(res => {
            this.$toast.success('Preferenze privacy aggiornate!');

        }).catch(e => {
            this.$toast.fail('Errore aggiornamento privacy');

        })
    },

    updatePassword() {


        this.$axios.post('/api/change-password', 
          {
            password: this.form.password,
            password_new: this.form.password_new
          }
        
        ).then(res => {
            this.$toast.success('Password modificata!');
            this.form.password = ''
            this.form.password_new = ''
            this.errors.password_old = false
            this.errors.password_new = false
            this.errors.waitTime = false
            this.errors.notOkPassword = false
        }).catch(e => {
            let errors = e.response.data.errors
            this.errors.password_old = errors.invalidCredential ? true :  false
            this.errors.password_new = errors.passwordValidatorErrors ? true :  false
            this.errors.waitTime = errors.minutesBetweenPasswordChanges ? true : false
            this.errors.notOkPassword = errors.lastDistinctPasswordNumber ? true : false
            this.$toast.fail('Errore Aggiornamento Password');
        })
    }
  }
}
</script>

<style >


.profilo .van-radio__label {
    margin-left: 8px;
    color: #41ca85;
    line-height: 20px;
}
.icon { 
  float: right;
  margin-left: -25px;
  margin-top: -31.5px;
  position: relative;
  z-index: 2;
  min-width: 40px;
  font-size: 1.5rem;
  color: #41ca85;
  right: 0px;
} 

.container-password{
  display: flex;
  align-items: center;
}

</style>
