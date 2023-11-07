import Vue from 'vue';

Vue.filter('currency', function (value) {
  if (!value) return '0,00' + ' €'
  let val = (value/1).toFixed(2).replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' €'
})


import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

Vue.component('VuePhoneNumberInput', VuePhoneNumberInput);


import VueInputUi from 'vue-input-ui';
import 'vue-input-ui/dist/vue-input-ui.css';

Vue.component('VueInputUi', VueInputUi);