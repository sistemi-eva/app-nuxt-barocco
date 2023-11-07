<template>
  <div @click.stop="" class="lettura">
    <div class="lettura-item-container">
      <!--h5 class="lettura-item" style="color:grey">Ultima lettura</h5-->
      <div class="lettura-item-shared">
        <h3 class="lettura-item textDefault"  >{{letturaDate}}</h3>
        <h3 class="lettura-item textDefault"  >{{lettura.lettura}} m3</h3>

      </div>
      <h5 class="lettura-item" style="color:grey" >{{lettura.origineDati}}</h5>
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
}
.lettura-item-container{
  width: 100%;
}
.lettura-item-right-top{
text-align: right;
}
.lettura-item-right-bottom{
text-align: right;
}
.lettura-item-shared{
  display: flex;
  justify-content: space-between;
}

</style>
