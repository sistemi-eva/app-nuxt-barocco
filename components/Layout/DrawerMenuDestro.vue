<template>
<client-only>
  <van-popup @close="onClose" v-model="mutableValue" position="right" :style="{ background:'#009fe2', height: '100%',width:'75%'}">
      <div style="display:flex; justify-content:center; ">
         <img src="/ugm-white-orizz.png" height="160px"/>
      </div>

      <van-sidebar v-model="active" style="padding-top:0px; padding-left:0px; width: 100%"  @change="$emit('input', false)" >
        <van-sidebar-item :class="[active == 'index' ? 'van-sidebar-item--select' : ' ']" name="index" to="/" title="Home" />
        <van-sidebar-item :class="[active == 'profilo' ? 'van-sidebar-item--select' : ' ']" name="profilo" to="/profilo" title="Profilo" />
        <van-sidebar-item  name="privacy" @click="changePage({name:'web',iframe_url:'https://baroccolucegas.it/privacy-policy/'})" title="Privacy Policy" />
        <van-sidebar-item  name="login" @click="logout" title="Esci" />
      </van-sidebar>
      <van-row type="flex" justify="center" style="align-items: end" class="mt-4" >
          <div class="px-4">
          <p style="color:#fff; text-align: center">
          Servizio clienti: <b><a href="tel:800171710 " style="color:#fff; text-align: center; text-decoration:underline;">800 17 17 10 </a></b> (da rete fissa)<br>
          oppure <b><a href="tel:0836311372" style="color:#fff; text-align: center; text-decoration:underline;">0836 311372</a></b><br>
          attivo dal lunedì al venerdì <br> dalle ore 9 alle ore 13 e dalle ore 14 alle ore 18
          </p>
          </div>
      </van-row>

    </van-popup>
</client-only>

</template>

<script>
export default {
    props: {
        value:{
        type: Boolean,
        required: false,
        default: false
      },
    },
    watch: {
        value() {
            this.mutableValue= JSON.parse(this.value)
        },
        '$route' (to, from){
          if(to.name != from.name) {
            this.active = to.name
          }
        }
    },
      data() {
        return {
          mutableValue: false,
          active: '',
          useless: ''
        }
      },

      mounted() {
          this.active= this.$router.history.current.name
      },
    methods: {
      changePage({name,iframe_url}){
        this.$router.push({name, query : {iframe_url}})
      },
      onClose(){
        this.$emit('input', false)
      },
      logout(){
        this.$router.push('/login')
        this.$store.commit('logout')
        this.$emit('input', false)
      }
    }
}
</script>
