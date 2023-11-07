<template>
  <!-- <div class="card site-card"> -->
  <van-card class="card site-card" 
    :tag="item.tipo"
    currency=""
    price="168.00 €"
    title="CZY4131Xaaaaaaaaaaaaaaaaaaa"
    desc="Via Prova Test "
    origin-price="Bolletta"
    thumb= "https://img.yzcdn.cn/vant/ipad.jpeg"
    >
    <template #title>
      <p>
        <b>
          Codice Cliente:
        </b>
      </p>
      <p class="title codice-cliente" >
        {{item.codice_cliente}}
      </p>
    </template>
    <template #desc>
      <p><b>Indrizzo:</b></p>
      <p class="title codice-cliente" >
        {{item.indirizzo}}
      </p>
      <p><b>Cap:</b></p>
      <p class="title codice-cliente" >
        {{item.cap}}
      </p>
      <p><b>Città:</b></p>
      <p class="title codice-cliente" >
        {{item.citta}}
      </p>
    </template>
    <!-- <template #tags>
      <van-tag plain type="danger">Tag</van-tag>
      <van-tag plain type="danger">Tag</van-tag>
    </template> -->

    <template class="footer-card" #footer>
      <van-button type="primary" size="mini">Dettaglio Utenza</van-button>
      <van-button type="info" size="mini">Paga Ora</van-button>
    </template>
  </van-card> 

  <!-- </div> -->
</template>

<script>
export default {
props:{
    item:{
      type: Object,
      required: true,
      default: () => []
    },
  }
}
</script>

<style>
.title{ 
}
.codice-cliente{
  overflow: hidden;
  text-overflow: ellipsis;
}
.van-card__origin-price{
  text-decoration: none;
}
/* //AUMENTARE ALTEZZA CARD */
.van-card__footer{
  padding: 10px;
}
.van-card__header{
  height: 180px;
}
.van-card__content{
  padding-top: 10px;
}
.van-card__thumb{
  width: 150px ;
  height: 100%;
}

.site-card {
  margin-left: 5px;
  padding: 0; 
  margin-right: 5px;
}
.footer-card {
  height: 210px;
}
</style>
