export default function ({ $axios, redirect, store, app, $cookies }) {

  $axios.onRequest(config => {

    config.headers.authorization = 'Bearer ' + $cookies.get('eva_access_token')
    //config.headers.refresh_token = 'Bearer ' + store.getters['refresh_token']

    // config.headers.authorization = 'Bearer ' + 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3VwbiI6IlBhb2xvIiwiaWF0IjoxNjExMzA2MTU2LCJqdGkiOiI3NWJjYzA0N2JiZDc0NzU1YTBhNGU2YTliZjRkODA3YyIsIm5iZiI6MTYxMTMwNjE1NiwiZXhwIjoxNjExMzA3MDU2LCJpc3MiOiJUZXJyYW5vdmEiLCJhdWQiOiJVYmlrIn0.12zxpVWNsT71Sd6G7rGSZjhrzxdczdvO19PkJzZ_6eM'
    
  })

  //

  var isRefreshing = false;
  var refreshSubscribers = [];
  var i = 0;


  $axios.onError(async error => {
    if(error.toJSON().message == 'Network Error') {
      redirect('/maintenance')
    }
    const refreshToken = $cookies.get('eva_refresh_token')
    const fingerprint = $cookies.get('eva_fingerprint')
    const username = $cookies.get('eva_username')

    if(error.response.status === 401) {
      // if(error.response && error.response.data && error.response.data.errors && error.response.data.errors.invalidRefreshToken && error.response.data.errors.invalidRefreshToken === true){
      //   console.log("entroo")  
      //   // store.commit('logout')
      //     // redirect('/login') 
      // }
      if(error.response.config.url == 'api/login') {
        return Promise.reject(error)
      }
      
      if($cookies.get('eva_access_token') && refreshToken && username && fingerprint && i < 10 && error.response.config.url != '/api/refresh-token') {
        i++
        if (!isRefreshing) {
          isRefreshing = true;
  
          await $axios.post('/api/refresh-token', {refresh_token: refreshToken, username: username, fingerprint: fingerprint } )
            .then(async newToken => {
  
              isRefreshing = false;
  
              onRrefreshed(newToken);
              refreshSubscribers = []
  
            }, err => {
  
            });
  
            isRefreshing = false;
  
        }
  
        const retryOrigReq = new Promise((resolve, reject) => {
          subscribeTokenRefresh(res => {
            store.commit('updateToken', res.data.data)
  
            // replace the expired token and retry
            error.config.headers.authorization = 'Bearer ' + res.data.data.access_token;
            resolve($axios(error.config));
          });
        });
        return retryOrigReq;
      }
      else {
        i = 0
        if(error.response.status === 401) {
          store.commit('logout')
          redirect('/login')
        } 
      }
    }
    return Promise.reject(error)
  })



  function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb);
  };
  
  function onRrefreshed(res) {
    refreshSubscribers.map(cb => cb(res));
  
  }

  
}