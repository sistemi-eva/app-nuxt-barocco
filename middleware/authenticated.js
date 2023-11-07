

export default async function ({ store, redirect, $cookies, $axios }) {


  // If the user is not authenticated
  if ( !$cookies.get('eva_access_token') || !$cookies.get('eva_refresh_token')  || !$cookies.get('eva_fingerprint')   ) {
  // if (!$cookies.get('eva_refresh_token')  || !$cookies.get('eva_fingerprint')   ) {
    store.commit('logout')
    redirect('/login')
  } 

}