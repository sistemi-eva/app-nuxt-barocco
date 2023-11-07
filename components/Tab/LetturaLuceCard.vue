<template>
  <div @click.stop="" class="lettura">
    <div class="lettura-item-left">
      <h5 class="lettura-item textDefault" >Data: {{letturaDate}}</h5>
      <h5 class="lettura-item" style="color:grey" >Tipo: </h5>
      <h5 class="lettura-item" style="color:grey">Rif. fattura </h5>
    </div>
    <div class="lettura-item-right-top">
      <h5 class="lettura-item" style="color:grey">F1: {{lettura.f1}}</h5>
      <h5 class="lettura-item" style="color:grey" >F2: {{lettura.f2}}</h5>
      <h5 class="lettura-item" style="color:grey" >F3: {{lettura.f3}}</h5>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props:{
      lettura:{
        type: Object,
        required: true,
        default: () => []
      },
    },
  computed: {
    letturaDate(){
      return moment(this.lettura.data).format('DD/MM/YYYY');
    }
  }
}
</script>

<style scoped>
.lettura{
  margin : 10px;
  padding:15px;
  justify-content: space-between;
  display: flex;
  background-color: #fff;
  box-shadow: 0 4px 9px rgba(0,0,0,0.1);
  border-radius: 25px;
}
.lettura-item{
  margin: 5px;
  overflow: hidden;
  text-overflow: ellipsis; 
  max-width: 180px;

}
.lettura-item-left{
  text-overflow:ellipsis;

}
.lettura-item-right-top{
text-align: right;

}
.lettura-item-right-bottom{
text-align: right;
}

</style>
