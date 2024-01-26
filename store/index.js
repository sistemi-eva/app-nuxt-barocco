


export const getters = {

  utente: state => {
    return state.utente
  },

  id_anagrafica: state => {
    return state.id_anagrafica
  },
 
  access_token: state => {
    return state.access_token
  },

  fingerprint: state => {
    return state.fingerprint
  },

  refresh_token: state => {
    return state.refresh_token
  },
  authenticated: state => {
    return state.authenticated
  }

}

export const mutations = {

  idAnagrafica(state, payload){
    state.id_anagrafica = payload
    this.$cookies.set('eva_id_anagrafica', payload, {
      path: '/',
      maxAge: 31536000,
      secure: process.env.NODE_ENV !== 'production' ? false : true 
    })
  },

  logout(state) {
    state.utente ={}
    state.access_token = null
    state.refresh_token = null
    state.authenticated = false
    this.$cookies.remove('eva_access_token')
    this.$cookies.remove('eva_refresh_token')
    this.$cookies.remove('eva_fingerprint')
    this.$cookies.remove('eva_id_anagrafica')
  },

  utente(state, payload) {
      state.utente = payload
      this.$cookies.set('eva_username', payload.userInfo.userName, {
        path: '/',
        maxAge: 31536000,
        secure: process.env.NODE_ENV !== 'production' ? false : true 
      })     
  },

  updateToken(state,payload) {

    state.access_token = payload.access_token
    state.refresh_token = payload.refresh_token
    state.authenticated = true

    var username = this.$cookies.get('eva_username')
    var fingerprint = this.$cookies.get('eva_fingerprint')

    this.$cookies.set('eva_fingerprint', fingerprint, {
      path: '/',
      maxAge: 7689600,
      secure: process.env.NODE_ENV !== 'production' ? false : true 
    })

    this.$cookies.set('eva_username', username, {
      path: '/',
      maxAge: 7689600,
      secure: process.env.NODE_ENV !== 'production' ? false : true 
    })  

    this.$cookies.set('eva_access_token', payload.access_token, {
      path: '/',
      maxAge: 7689600,
      secure: process.env.NODE_ENV !== 'production' ? false : true 
    })

    this.$cookies.set('eva_refresh_token', payload.refresh_token, {
      path: '/',
      maxAge: 7689600,
      secure: process.env.NODE_ENV !== 'production' ? false : true 
    })
  },

  login(state, payload) {
      state.access_token = payload.access_token
      state.refresh_token = payload.refresh_token
      state.fingerprint = payload.fingerprint
      state.authenticated = true

      this.$cookies.set('eva_access_token', payload.access_token, {
        path: '/',
        maxAge: 7689600,
        secure: process.env.NODE_ENV !== 'production' ? false : true 
      })

      this.$cookies.set('eva_refresh_token', payload.refresh_token, {
        path: '/',
        maxAge: 7689600,
        secure: process.env.NODE_ENV !== 'production' ? false : true 
      })

      this.$cookies.set('eva_fingerprint', payload.fingerprint, {
        path: '/',
        maxAge: 7689600,
        secure: process.env.NODE_ENV !== 'production' ? false : true 
      })
  },

}


export const actions = {
  async nuxtServerInit ({ commit }, { redirect, store, error, route, $axios, $cookies }) {
    // if ($cookies.get('eva_access_token') && $cookies.get('eva_refresh_token') &&  $cookies.get('eva_fingerprint') && $cookies.get('eva_username')  ) {
    if ($cookies.get('eva_refresh_token') && $cookies.get('eva_access_token') &&  $cookies.get('eva_fingerprint') && $cookies.get('eva_username')  ) {
      await $axios.post('/api/refresh-token', {refresh_token: $cookies.get('eva_refresh_token'), username: $cookies.get('eva_username'), fingerprint: $cookies.get('eva_fingerprint') } )
          .then(async res => {
            store.commit('updateToken', res.data.data)
            await $axios.$get('api/user/info').then(user => {
              store.commit('utente', user)
              if ($cookies.get('eva_id_anagrafica')) commit('idAnagrafica',$cookies.get('eva_id_anagrafica'))
              else commit('idAnagrafica',user.userInfo.idAnagrafica)
            }).catch(()=>{
              store.commit('logout')
              redirect('/login')
              return
            })
          }).catch(err=>{
            console.log("err",err)
          })
      // commit('login', {access_token : $cookies.get('eva_access_token'), refresh_token: $cookies.get('eva_refresh_token'), fingerprint: $cookies.get('eva_fingerprint'), username: $cookies.get('eva_username')})
    }else{
      store.commit('logout')
      redirect('/login')
      return
    }
  }  
}


export const state = () => ({
  access_token: null,
  fingerprint: null,
  refresh_token: null,
  authenticated: false,
  utente: {},
  id_anagrafica: null
})


