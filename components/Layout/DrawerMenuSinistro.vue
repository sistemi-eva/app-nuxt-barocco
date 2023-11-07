<template>
<client-only>
  <van-popup @close="onClose" v-model="mutableValue" position="left" :style="{ background:'#FFF', height: '100%',width:'75%'}">
    <!-- <div v-if="utente.anagrafiche.length > 1" class="px-3"> -->
      <div>
        <div style="padding-top:10px;padding-bottom:10px">
          <van-cell class="title-2" :title="`${utente.userInfo ? utente.userInfo.nome + ' '+ utente.userInfo.cognome: ''} `"></van-cell>
        </div>
        <div class="selected" style="margin-bottom:20px">
            <van-icon size="30" color="#009fe2" style="padding-left:20px; padding-right:20px" name="user-circle-o" />
            <span style="padding-right:10px;color:#009fe2;font-weight: 400;">{{valueList.ragSoc}}</span>
          <!-- <van-cell icon="user-o" style="padding-left:20px" class="subtitle" :title="valueList.ragSoc"></van-cell> -->
        </div>
        <div style="background-color:grey; height:1px;margin-bottom:10px"/>

        <div v-if="!enableSearch" style="display:flex; align-items:center;padding-right:10px">
          <van-cell class="title-2" title="TUTTE LE ANAGRAFICHE" />
          <van-icon color="#009fe2" @click="enableSearch = true" size="20" name="search" />
        </div>
        <div v-if="enableSearch" style="display:flex; align-items:center;padding-right:10px">
          <van-field
            v-model="search"
            name="Cerca"
            placeholder="Cerca"
            :rules="[{ required: true, message: 'Username is required' }]"
          />
          <van-icon color="#009fe2" @click="enableSearch = false; search = ''" size="20" name="cross" />
        </div>
        <div v-for="(utente,index) in filterdAnagrafiche" :key="index">
            <div v-if="utente != valueList" @click="onConfirm(utente)" style="display:flex; align-items:center; padding-top:5px; padding-right:10px">
              <van-cell class="subtitle-2" :title="utente.ragSoc"></van-cell>
              <van-icon name="arrow" color="#009fe2" />
              <div style="background-color:#009fe2; height:2px;margin-bottom:20px"/>
            </div>
        </div>
      </div>
  <!-- </div> -->
  </van-popup>
</client-only>

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed:{
     ...mapGetters({
      utente: 'utente',
      idAnagrafica: 'id_anagrafica'
    }),
    filterdAnagrafiche(){
      const temps = this.utente.anagrafiche ? this.utente.anagrafiche.filter(data => !this.search 
       || data.idAnagrafica.toString().toLowerCase().includes(this.search.toLowerCase()) 
       || data.ragSoc.toString().toLowerCase().includes(this.search.toLowerCase()) 
       ): []
       return temps
    }
  },
    props: {
        value:{
          type: Boolean,
          required: true,
          default: false
      },
    },
    watch: {
        value() {
             this.mutableValue = JSON.parse(this.value)
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
      enableSearch: false,
      search: '',
      valueList: '',
      concatenated: []
    }},
    mounted() {
      this.concatenated = this.utente.anagrafiche.concat(this.utente.anagrafiche.concat(this.utente.anagrafiche.concat(this.utente.anagrafiche)))
      this.valueList = this.utente.anagrafiche.filter((el)=> {
        if(el.idAnagrafica == this.idAnagrafica) {
          let temp = el
          return temp
        }
      })[0]
    },
    methods: {
      onConfirm(value) {
        this.search = ''
        this.valueList = value;
        this.$store.commit("idAnagrafica", value.idAnagrafica);
        this.$emit('input', false)
        this.$router.go()
      },
      onClose(){
        console.log("close")
        this.$emit('input', false)
      },
    }
}
</script>
<style >
.selected{
  padding-top:10px;
  padding-bottom:10px;
  display: flex;
  align-items: center;
  background-color: rgba(13,101,164, 0.2);;
  border-top-right-radius: 20px 20px;
  border-bottom-right-radius: 20px 20px;
}
hr.solid {
  border-top: 3px solid #bbb;
}
</style>