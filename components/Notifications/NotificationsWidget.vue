<template>
  <div class="card notifications-wrapper">
    <div class="notifications-header">
      Notifiche 
      <span class="custom-indicator">{{ current + 1 }}/4</span>
    </div>
    <div class="notifications-content">
      <van-swipe @change="onChange" :show-indicators="false">
        <van-swipe-item><b>Lettura</b> Ricordati di inserire la lettura</van-swipe-item>
        <van-swipe-item><b>Lettura</b> Ricordati di inserire la lettura</van-swipe-item>
        <van-swipe-item><b>Lettura</b> Ricordati di inserire la lettura</van-swipe-item>
        <van-swipe-item><b>Lettura</b> Ricordati di inserire la lettura</van-swipe-item>
      </van-swipe>
    </div>
    <div class="notifications-footer">
      leggo tutte >
    </div>    
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      notification: [
        {id:1,title: 'ciao'}
      ]
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
  }
}
</script>

<style>

</style>
