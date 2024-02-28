
<template>
<div>
  <div class="login-wrap">
    <client-only>
    <van-notice-bar style="cursor: pointer;" @click.prevent="infoDialog = true"  mode="link" color="#1989fa" background="#64b230"  text="Problemi con il login? Clicca qui" left-icon="volume-o" />
    </client-only>
    <div class="login-html">
      <transition appear name="fade">
        <div style="max-width:500px; margin: 0 auto;">
          <client-only>
            <Logo />
          </client-only>
          <client-only>
            <input id="tab-1" type="radio" name="tab" class="sign-in" checked />
            <label for="tab-1" class="tab">Accedi</label>
            <input id="tab-2" type="radio" name="tab" class="sign-up" />
            <label for="tab-2" class="tab">Registrati</label>
            <div class="login-form">
              <div class="sign-in-htm no-scrollbar">
                <van-form>
                  <div class="group">
                    <label for="user" class="label">Username</label>
                    <input  autocomplete="username" id="user" v-model="username" type="text" class="input mt-1" />
                  </div>
                  <div class="group">
                    <label for="pass" class="label">Password</label>
                    <div class="container-password">
                      <input :type="changeTypePasswordLogin" 
                        autocomplete="current-password" 
                        id="pass" v-model="password" 
                        class="input-password mt-1" 
                      />
                      <van-icon class="icon" style="color:#009fe3 !important" v-if="changeTypePasswordLogin=='password'"  name="eye-o" @click="changeTypePasswordLogin = 'text'" />
                      <van-icon class="icon" v-else  style="color:#009fe3 !important" name="closed-eye" @click="changeTypePasswordLogin = 'password'" />
                    </div>
                  </div>
                  <div class="group mt-5" @click.prevent="login" @keyup.enter="login">
                      <van-button :loading="loadingLogin" block round class="button" native-type="submit">Accedi</van-button>
                    <!-- <input type="submit" class="button" value="Accedi" /> -->
                  </div>
                </van-form>
                <div class="hr"></div>
                <div class="foot-lnk" @click.prevent="lostPassword = true">
                  <a href>Password dimenticata?</a>
                </div>
              </div>
              <div class="sign-up-htm no-scrollbar">
                <van-form autocomplete="nope">
                  <div class="group">
                    <label for="codcli" class="label">Codice Cliente (OBBLIGATORIO)</label>
                    <input type="text" @keydown.space.prevent autocomplete="nope" class="input mt-1" v-model="form.idAnagrafica" />
                    <label for="codcli"  @click.prevent="openToggleCodice" style="color:#fff; font-weight:500;text-transform: inherit;  font-size: 1rem;" class="label mt-1">Problemi con il codice cliente?</label>
                  </div>
                  <div class="group">
                    <label for="codcli" class="label">Nome (OBBLIGATORIO)</label>
                    <input type="text" autocomplete="nope" class="input mt-1" v-model="form.nome" />
                  </div>
                  <div class="group">
                    <label for="codcli" class="label">Cognome (OBBLIGATORIO)</label>
                    <input type="text" autocomplete="nope" class="input mt-1" v-model="form.cognome" />
                  </div>
                <div class="group">
                  <label for="codcli" class="label">
                    Tipologia Cliente
                  </label>
                  <van-radio-group v-model="tipoUtente" class="ml-3 mt-2 mb-4 --text-white">
                    <van-radio name="F" class="pb-2">Persona fisica</van-radio>
                    <van-radio name="G">Persona giuridica (PART. IVA)</van-radio>
                  </van-radio-group>
                </div>
                <div class="group" >
                  <label for="codcli" class="label" v-if="tipoUtente =='G'" >Codice fiscale Legale Rapp. (16 caratteri)</label>
                  <label for="codcli" class="label" v-if="tipoUtente =='F'" >Codice fiscale (OBBLIGATORIO)</label>
                  <input type="text" @keydown.space.prevent  autocomplete="nope" class="input mt-1" v-model="form.cfiscContatto" />
                </div>                
                <div class="group"  v-if="tipoUtente =='G'">
                  <label for="codcli" class="label">Partita IVA (OBBLIGATORIO)</label>
                  <input type="text" @keydown.space.prevent autocomplete="nope" class="input mt-1" v-model="form.pivaAnagrafica" />
                </div>
                  <div class="group">
                    <label for="email" class="label">E-mail (OBBLIGATORIO)</label>
                    <input type="email" @keydown.space.prevent autocomplete="nope" class="input mt-1" v-model="form.email" />
                  </div>
                  <div class="group">
                    <label for="codcli" class="label">Cellulare</label>
                    <input type="text" @keydown.space.prevent  autocomplete="nope" class="input mt-1" v-model="form.cellulare" />
                  </div>
                  <div class="group">
                    <label for="codcli" class="label">Username (OBBLIGATORIO)</label>
                    <input type="text" @paste.prevent @keydown.space.prevent  autocomplete="nope" class="input mt-1" v-model="form.username" />
                  </div>
                  <div class="group">
                    <label for="codcli" class="label">Password (OBBLIGATORIO)</label>
                    <div class="container-password">
                      <input autocomplete="nope" @paste.prevent @keydown.space.prevent :type="changeTypePassword" class="input-password mt-1" v-model="form.password" />
                      <van-icon class="icon" v-if="changeTypePassword=='password'"  name="eye-o" @click="changeTypePassword = 'text'" />
                      <van-icon class="icon" v-else  name="closed-eye" @click="changeTypePassword = 'password'" />
                    </div>
                    <!-- <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span> -->
                  </div>
                  
                  <label for="codcli" style="color:#FFF;font-size:10pt; line-height:8px;" class="label">
                    Ho preso visione dell'
                    <span @click.stop="changePage({name:'web',iframe_url:'https://baroccolucegas.it/privacy-policy'})" style="text-decoration: underline; "> 
                      informativa
                    </span>
                    e autorizzo al trattamento dei miei dati ai sensi del Regolamento (UE) 2016/679
                  </label>
                  <van-radio-group v-model="form.privacyContratto" class="ml-3 mt-4 --text-white">
                    <van-radio :name="true" class="pb-2">do il consenso</van-radio>
                    <van-radio :name="false">nego il consenso</van-radio>
                  </van-radio-group>
                  <div class="group mt-4">
                    <input
                      type="submit"
                      class="button"
                      value="Registrati"
                      @click.prevent="registrati"
                      @keyup.enter="login"
                    />
                  </div>
                </van-form>
                <div class="hr"></div>
                <div class="foot-lnk mb-5">
                  <input id="tab-1" type="radio" name="tab" class="sign-in" />
                  <label
                    for="tab-1"
                    class="tab"
                    style="font-size: 16px; text-transform: none;"
                  >Sei già registrato?</label>
                </div>
              </div>
            </div>
          </client-only>
        </div>
      </transition>
    </div>
    <client-only>

      <van-popup
        v-if="PasswordExpiredModal"
        v-model="PasswordExpiredModal"
        class="center"
        closeable
        round
        position="bottom"
      >
        <div class="center mt-4 px-3 mb-5">
          <img src="icons/wrong-password.png" width="50px" />
          <h3 class="subtitle mt-3">La tua password è scaduta<br>Inserisci una nuova password per continuare</h3>
          <van-form @submit="updatePassword" class="mt-4 profilo">
              <VueInputUi  v-model="password_new" :type="changeTypePasswordExpiredNew" style="color:#009fe2" required class="mt-3" color="#009fe2" label="Nuova Password"/>
              <van-icon class="iconExpired" v-if="changeTypePasswordExpiredNew=='password'"  name="eye-o" @click="changeTypePasswordExpiredNew = 'text'" />
              <van-icon class="iconExpired" v-else  name="closed-eye" @click="changeTypePasswordExpiredNew = 'password'" />
              <van-cell class="cell" v-if="Object.keys(errors).length === 0" style="color:#009fe2" title="*Usa almeno 8 caratteri. Includi almeno un numero, una lettera minuscola, una lettera maiuscola e un carattere speciale."></van-cell>
              <van-field v-if="errors.password_new" :error-message="errors.password_new ? 'Usa almeno 8 caratteri. Includi almeno un numero, una lettera minuscola, una lettera maiuscola e un carattere speciale.': ''" />
              <van-field v-if="errors.waitTime" :error-message="errors.waitTime? 'Devi aspettare almeno 5 minuti per poter modificare nuovamente la password.': ''" />
              <van-field v-if="errors.notOkPassword" :error-message="errors.notOkPassword ? 'Non puoi utilizzare una password che hai già utilizzato.': ''" />
              <div class="center  px-5 mt-3">
                <van-button block round type="info" native-type="Submit">
                  Modifica Password
                </van-button>
              </div>
            </van-form>
        </div>
      </van-popup>

      <van-popup
        v-if="loginError"
        v-model="loginError"
        class="center"
        closeable
        round
        position="bottom"
      >
        <div class="center mt-4 px-3 mb-5">
          <img src="icons/wrong-password.png" width="50px" />
          <h3 class="subtitle mt-1" v-if="errors.credential && errors.credential.userNotActive">L'utenza non è stata ancora attivata</h3>
          <h3 class="subtitle mt-1" v-if="errors.credential && errors.credential.mailNotVerified">Verifica la tua email e conferma la registrazione</h3>
          <h3 class="subtitle mt-1" v-if="errors.credential && (errors.credential.PasswordExpired || errors.credential.passwordExpired)">Password Scaduta</h3>
          <h3 class="subtitle mt-1" v-if="errors.credential && (errors.credential.userNotFound || errors.credential.UserNotFound)">Utenza non trovata</h3>
          <h3 class="subtitle mt-1" v-if="errors.invalidCredential">Le credenziali non sono valide</h3>
          <h3 class="subtitle mt-1" v-if="errors.invalidEnvironment">Le credenziali non sono valide</h3>
          <van-button class="mt-4"  
           v-if="errors.credential && errors.credential.mailNotVerified"
           block round type="info" @click="sendNotification">Invia nuovamente l'email di verifica</van-button>
          <!-- <h3 class="subtitle mt-3">Username e/o password errata</h3> -->
          <h5 class="subtitle mt-3">Se hai problemi con l'accesso consulta <span style="color:red">"Problemi con il login?"</span> che trovi all'inizio della pagina</h5>
        </div>
      </van-popup>

      <van-popup
        v-if="registrazioneError"
        v-model="registrazioneError"
        class="center"
        closeable
        round
        position="bottom"
      >
        <div class="center mt-4 px-3 mb-5">
          <img src="/icons/warning.png" width="50px" />

          <h2 class="title mt-3">Errore registrazione</h2>

          <h3 class="body-12 mt-3" v-if="errors.anagraficaNotExists">Codice Cliente Errato</h3>
          <h3 class="body-12 mt-2" v-else-if="errors.usernameExists">Nome utente non disponibile</h3>
          <h3
            class="body-12 mt-2"
            v-else-if="errors.privacyContrattoRequired"
          >Consenso Privacy obbligatorio</h3>
          <h3
            class="body-12 mt-2"
            v-else-if="errors.passwordErrors"
          >La password deve essere lunga almeno 8 caratteri, e deve contenere: 1 numero, 1 carattere speciale e una lettera maiuscola</h3>
          <h3 class="body-12 mt-2" v-else-if="errors.cellulareRegex">Numero cellulare errato</h3>
          <h3 class="body-12 mt-2" v-else-if="errors.cfiscContattoRegex">Codice fiscale non valido</h3>
          <h3 class="body-12 mt-2" v-else-if="errors.emailRegex">Email non valida</h3>
          <h3 class="body-12 mt-2" v-else-if="errors.userExists">Utente già registrato</h3>
          <h3 class="body-12 mt-2" v-else>Verifica i campi obbligatori</h3>
        </div>
      </van-popup>

      <!-- VAN POPUP AGGIORANMENTO PASSWORD -->

      <!-- Custom Icon -->
      <van-popup
        v-if="showUtenzaScaduta"
        v-model="showUtenzaScaduta"
        class="center"
        closeable
        round
        position="bottom"
      >
        <div class="center mt-4 px-3 mb-5">
          <img src="/icons/warning.png" width="50px" />
          <h3 class="subtitle mt-3">{{responseUtenzaScaduta}}</h3>
        </div>
      </van-popup>

      <!-- VAN DIALOG LOGIN INFO -->
  <!-- VAN DIALOG togglecodiceCliente -->
      <van-dialog
        style="margin-top:20px"
        v-if="infoDialog"
        v-model="infoDialog"
        title="Assistenza Login"
        :closeOnClickOverlay="true"
        :showConfirmButton="false"
        class="title"
      >
        <div>
            <van-cell 
            >
            <template #title>
              <p style="font-size:10pt; font-weight: 300; line-height:22px; margin-top: 20px" class="textPrimary">
                Abbiamo aggiornato i nostri sistemi informativi, di conseguenza potresti avere problemi nell'accedere con le tue vecchie credenziali. <br>
                Se durante il login non ti viene chiesto di reimpostare la password, 
                devi obbligatoriamente effettuare una nuova registrazione.<br>
                Puoi reperire il tuo nuovo codice cliente sulla tua ultima fattura (Dopo il 31/12/20) oppure attraverso la voce "Problemi con il codice cliente?" nella sezione registrati.<br>
                Se ancora non riesci ad accedere puoi contattare il Servizio Clienti al numero <a href="tel:800210760" style="color:blue; text-align: center; text-decoration:underline;">800.210.760</a> che ti potrà fornire ulteriore assistenza.<br>
                Ti ringraziamo della disponibilità e ci scusiamo per il disagio.
              </p>
            </template>
            </van-cell>
        </div>
      </van-dialog>

      <!-- VAN DIALOG togglecodiceCliente -->
      <van-dialog
        v-if="togglecodiceCliente"
        v-model="togglecodiceCliente"
        title="Recupera nuovo codice cliente"
        :closeOnClickOverlay="true"
        :showConfirmButton="false"
        class="title"
      >
        <div>
          <van-form @submit="recoverNewCodiceCliente" class="mt-4" style="font-weight: 600;">
            <van-cell 
            >
            <template #title>
              <p style="font-size:10pt; font-weight: 300; line-height:16px; margin-top: 0" class="textPrimary">
                Abbiamo aggiornato i nostri sistemi informativi, il tuo codice cliente potrebbe essere cambiato. Ti invitiamo a inserire qui il tuo vecchio codice cliente per visualizzare il nuovo codice.
                <br> 
              </p>
            </template>
            </van-cell>
            
            <van-cell value="Codice Cliente" />
            <van-field
              v-model="codice_cliente"
              name="Codice Cliente"
              placeholder="Codice Cliente"
              :rules="[{ required: true, message: 'Campo obbligatorio' }]"
            />
            <van-cell value="Codice Fiscale" />
            <van-field
              v-model="codice_fiscale"
              placeholder="Codice Fiscale"
              :rules="[{ required: true, message: 'Campo obbligatorio' }]"
            />
            <div style="margin: 16px;" class="center">
              <van-button block round type="info" native-type="Submit">Conferma</van-button>
            </div>
          </van-form>
        </div>
      </van-dialog>

      <!-- VAN DIALOG LOST PASSWORD -->
      <van-dialog
        v-if="lostPassword"
        v-model="lostPassword"
        title="Recupera password"
        :closeOnClickOverlay="true"
        :showConfirmButton="false"
        class="title"
      >
        <div>
          <van-form @submit="sendPasswordLink" class="mt-4" style="font-weight: 600;">
            <van-cell value="E-mail" />

            <van-field
              v-model="email"
              name="E-mail"
              placeholder="E-mail"
              :error-message="errors.emailNotValid ? 'Email non valida per il recupero password': ''"
              :rules="[{ required: true, message: 'Campo obbligatorio' }]"
            />

            <van-cell value="Username" />

            <van-field
              v-model="username"
              placeholder="Username"
              :error-message="errors.userNotValid ? `Username non valida per il recupero password`: ''"
              :rules="[{ required: true, message: 'Campo obbligatorio' }]"
            />

            <div style="margin: 16px;" class="center">
              <van-button :loading="loadingReset" block round type="info" native-type="Submit">Conferma</van-button>
            </div>
          </van-form>
        </div>
      </van-dialog>
    </client-only>
  </div>
</div>
</template>

<script>
import { Dialog } from 'vant';
import { duration } from 'moment';
export default {
  name: "login",
  layout: "login",
  data: () => ({
    loadingLogin: false,
    loadingReset:false,
    infoDialog: false,
    changeTypePasswordExpiredNew: 'password',
    changeTypePasswordLogin: 'password',
    changeTypePassword: 'password',
    showUtenzaScaduta: false,
    PasswordExpiredModal: false,
    password_new: "",
    username: "",
    password: "",
    email: "",
    codice_cliente: "",
    codice_fiscale: "",
    lostPassword: false,
    tipoUtente: "F",
    togglecodiceCliente: false,
    form: {
      idAnagrafica: "",
      nome: "",
      cognome: "",
      username: "",
      password: "",
      privacyContratto: undefined,
      cfiscContatto: "",
      pivaAnagrafica: null,
      email: "",
      cellulare: ""
    },
    tab: "signin",
    loginError: false,
    registrazioneError: false,
    errors: {}
  }),

  mounted() {
    this.$cookies.remove('eva_access_token')
    this.$cookies.remove('eva_refresh_token')
    this.$cookies.remove('eva_fingerprint')
    this.$cookies.remove('eva_id_anagrafica')
    this.username = this.$cookies.get("eva_username");
  },

  methods: {
    updatePassword() {
      let fingerprint = this.makeid(22)
        this.$axios.$post('/api/change-password', 
          {
            fingerprint: fingerprint,
            username: this.username,
            password: this.password,
            password_new: this.password_new
          }
        
        ).then(res => {
          this.errors = {}
          this.$toast.success('Password modificata con successo!');
          res.data.fingerprint = fingerprint;
          this.$store.commit("login", res.data);
          this.$axios.$get("api/user/info").then(user => {
            this.$store.commit('idAnagrafica',user.userInfo.idAnagrafica)
            this.$store.commit("utente", user);
            this.$router.push("/");
          });
        }).catch(e => {
          this.errors = {}
          if(e.response.data.errors.invalidCredential) this.errors.password_old = true
          if(e.response.data.errors.passwordValidatorErrors) this.errors.password_new = true
          if(e.response.data.errors.minutesBetweenPasswordChanges) this.errors.waitTime = true
          if(e.response.data.errors.lastDistinctPasswordNumber) this.errors.notOkPassword = true
        })
    },

    sendNotification(){
      this.$axios
        .post("/api/user/resend-confirmation-email", {
          username: this.username,
          password: this.password,
          InvioForzato: true
        })
        .then(res => {
          this.loginError = false
          this.$toast.success("Email inviata correttamente!");
        })
        .catch(e => {
          this.$toast.fail("Errore nell'invio dell'email");
        });
    },
    openToggleCodice(){
      this.codice_cliente = this.form.idAnagrafica
      this.togglecodiceCliente = true
    },
    changePage({name,iframe_url}){
        this.$router.push({path: `/${name}`, query : {iframe_url}})
    },
    
    sendPasswordLink() {
      this.errors = {}
      this.loadingReset= true
      this.$axios
        .post("/api/user/recovery-password/send", {
          email: this.email,
          username: this.username,
        })
        .then(res => {
          this.loadingReset= false
          this.lostPassword = false;
          this.$toast.success("Ti abbiamo inviato un'e-mail per completare il recupero della password");
        })
        .catch(e => {
          this.loadingReset= false
          this.errors = e.response.data.errors;
        });
    },

    makeid(length) {
      var result = "";
      var characters = "0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return "eva_"+result;
    },

  recoverNewCodiceCliente() {
      if((this.codice_cliente.startsWith('C') || this.codice_cliente.startsWith('c')) && this.codice_cliente.length == 8) {
        this.togglecodiceCliente = false;
        this.form.idAnagrafica = this.codice_cliente
        this.codice_fiscale = ''
        this.codice_cliente = ''
        this.$toast.success("Il tuo codice cliente rispetta già i nuovi formati");
      }else{
        this.$axios({method: 'get', 
          url: `new-codice-cliente?codice_fiscale=${this.codice_fiscale}&codice_vecchio=${this.codice_cliente}&azienda=ugm`, 
          baseURL: `${process.env.api_endpoint}` 
        })
        .then(res => {
          if(res.data.code_message == 'FOUND') {
            this.togglecodiceCliente = false;
            this.$toast.success(res.data.message);
            this.form.idAnagrafica = res.data.value
            this.codice_fiscale = ''
            this.codice_cliente = ''
            
          }else{
            this.$toast.fail(res.data.message);
          }

        })
        .catch(e => {
          this.$toast.fail("Verifica i campi inseriti");
        });
      }
    },

  async login() {
    this.loadingLogin = true
    var fingerprint = this.makeid(22)
    if(this.username && this.password) {
      this.$axios({method: 'post', 
        url: `/pre-login`, 
        baseURL: `${process.env.api_endpoint}`,
        data: {
          email: this.username,
          azienda: 'ugm',
        }
      })
      .then(res => {
        if(res.data.code_message == 'RECOVERY_SEND_EMAIL') {
          this.loadingLogin = false
          this.showUtenzaScaduta = true
          this.responseUtenzaScaduta = res.data.message
          // this.$toast.success(res.data.message);
        }else{
          this.$axios
        .$post("api/login", {
          username: this.username,
          password: this.password,
          fingerprint: fingerprint,
          app: true
        })
        .then(res => {
          res.data.fingerprint = fingerprint;
          this.loadingLogin = false
          this.$store.commit("login", res.data);
          this.$cookies.set("bitmask", "257");
          this.$axios.$get("api/user/info").then(user => {
            this.$store.commit('idAnagrafica',user.userInfo.idAnagrafica)
            this.$store.commit("utente", user);
            
            this.$router.push("/");
          });
        })
        .catch(e => {
          this.loadingLogin = false
          this.errors = e.response.data.errors;
          if(this.errors.credential && (this.errors.credential.PasswordExpired || this.errors.credential.passwordExpired)) {
            this.PasswordExpiredModal = true
          }
          else{
            this.loginError = true;
          } 
        });
        }

      })
      .catch(e => {
        this.loadingLogin = false
        this.$toast.fail("Verifica i campi inseriti");
      });
    }else{
      this.loadingLogin = false
      this.$toast.fail("Tutti i campi sono obbligatori");
    }
  },

    registrati() {
      var tempPhone = this.form.cellulare
      if (this.form.cellulare.length > 0) {
       tempPhone = "+39" + this.form.cellulare;
      }
      var formattedCodice = ''
      if(this.form.idAnagrafica != '') formattedCodice = Number(this.form.idAnagrafica.replace(/[^\d]/g, ''))
      this.$axios
        .post("/api/registrazione/contatto/save",{
          idAnagrafica: formattedCodice, 
          nome: this.form.nome,
          cognome: this.form.cognome,
          username: this.form.username,
          password: this.form.password,
          privacyContratto: this.form.privacyContratto,
          cFiscAnagrafica: this.tipoUtente =='G' ? null : this.form.cfiscContatto,
          cfiscContatto: this.form.cfiscContatto,
          pivaAnagrafica: this.tipoUtente =='F' ? null : this.form.pivaAnagrafica,
          email: this.form.email,
          cellulare: tempPhone,
          })
        .then(res => {
          Dialog.alert({
            confirmButtonText: 'Continua',
            title: 'Registrazione Effettuata',
            message: 'La registrazione è stata effettuata con successo, <br> Ti abbiamo inviato una email di conferma per il tuo account. <br> <strong>Controlla la tua email e clicca sul link per confermare la tua registrazione!</strong>',
            theme: 'round-button',
          })
          this.errors = {
            email: false,
            cellulare: false,
            telefono1: false
          };
          this.form = {
            idAnagrafica: "",
            nome: "",
            cognome: "",
            username: "",
            password: "",
            privacyContratto: undefined,
            cfiscContatto: "",
            email: "",
            cellulare: ""
          };
        })
        .catch(e => {
          this.errors = e.response.data.errors;
          this.registrazioneError = true;
        });
    }
  }
};
</script>

<style scoped>
.input-password{


  
  width: 100%;
  border: none;
  padding-right:38px;
  padding-left: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
}
.iconExpired { 
    position: fixed;
    min-width: 40px;
    font-size: 1.5rem;
    margin-top: -33px;
    color: #30b23f;
    right: 20px;
} 

.icon { 
    position: fixed;
    min-width: 40px;
    font-size: 1.5rem;
    margin-top: 3px;
    color: #30b23f;
    right: 0px;
} 
.container-password-eye{
  width: 100%; 
  margin-bottom: 10px; 
}
.container-password{
  display: flex;
  align-items: center;
}
.login-html .van-radio__label {
  margin-left: 8px;
  color: #fff !important;
  line-height: 20px;
}

.login-wrap {
  color: #fff;
}
*,
:after,
:before {
  box-sizing: border-box;
}
.clearfix:after,
.clearfix:before {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
  display: block;
}
a {
  color: inherit;
  text-decoration: none;
}

.login-wrap {
  width: 100%;
  height: 100vh;
  margin: auto;

  position: relative;
  background: url(/background-login.jpg) no-repeat center;
  background-size: cover;
}
.login-html {
  opacity: 0.94;
  width: 100%;
  max-height: calc(100vh - 40px);
  /* height: calc(100%-40px); */
  position: absolute;
  padding: 0px 30px 0px 30px;
  background: linear-gradient(120deg, #9ad696,#729e6f);
  overflow: hidden;
  backface-visibility: hidden;

}
.login-html .sign-in-htm {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  transition: all 0.4s linear;
  min-height: 342px;
}
.login-html .sign-up-htm {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  transition: all 0.4s linear;
  min-height: 342px;
}


.login-html .sign-in,
.login-html .sign-up,
.login-form .group .check {
  display: none;
}
.login-html .tab,
.login-form .group .label,
.login-form .group .button {
  text-transform: uppercase;
}
.login-html .tab {
  font-size: 20px;
  margin-right: 15px;
  padding-bottom: 5px;
  margin: 0 15px 10px 0;
  display: inline-block;
  border-bottom: 2px solid transparent;
}
.login-html .sign-in:checked + .tab,
.login-html .sign-up:checked + .tab{
  color: #09471c;
  border-color: #30b23f;
}
.login-form {
  position: relative;
  perspective: 1000px;
  height: 100vh;
  transform-style: preserve-3d;
}
.login-form .group {
  margin-bottom: 15px;
}
.login-form .group .label,
.login-form .group .input,
.login-form .group .button {
  width: 100%;
  color: #fff;
  display: block;
}
.login-form .group .input,
.login-form .group .button {
  border: none;
  padding: 15px 20px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
}
.login-form .group input[data-type="password"] {
  /*text-security:circle;*/
  -webkit-text-security: circle;
}
.login-form .group .label {
  color: #dcdcdc;
  font-size: 12px;
}
.login-form .group .button {
  background: #2fa151;
  -webkit-appearance: none;  
  /*background:#1161ee;*/
}
.login-form .group label .icon {
  width: 15px;
  height: 15px;
  border-radius: 2px;
  position: relative;
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
}
.login-form .group label .icon:before,
.login-form .group label .icon:after {
  content: "";
  width: 10px;
  height: 2px;
  background: #fff;
  position: absolute;
  transition: all 0.2s ease-in-out 0s;
}
.login-form .group label .icon:before {
  left: 3px;
  width: 5px;
  bottom: 6px;
  transform: scale(0) rotate(0);
}
.login-form .group label .icon:after {
  top: 6px;
  right: 0;
  transform: scale(0) rotate(0);
}
.login-form .group .check:checked + label {
  color: #fff;
}
.login-form .group .check:checked + label .icon {
  background: #30b23f;
}
.login-form .group .check:checked + label .icon:before {
  transform: scale(1) rotate(45deg);
}
.login-form .group .check:checked + label .icon:after {
  transform: scale(1) rotate(-45deg);
}
.login-html
  .sign-in:checked
  + .tab
  + .sign-up
  + .tab
  + .login-form
  .sign-in-htm {
  transform: rotate(0);
}
.login-html .sign-up:checked + .tab + .login-form .sign-up-htm {
  transform: rotate(0);
  overflow: scroll;
  padding-bottom: 250px;
}

.hr {
  height: 2px;
  margin: 30px 0 20px 0;
  background: rgba(255, 255, 255, 0.2);
}
.foot-lnk {
  text-align: center;
}
</style>



