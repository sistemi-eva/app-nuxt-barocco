<template>

<van-row type="flex" justify="center">
  <van-col>
    
  <img class="NuxtLogo" :src="url" :width="width" />

  </van-col>
</van-row>


</template>

<script>
export default {

    props: {
      width: {
        type: Number,
        required: false,
        default: 280
      },
      url: {
        type: String,
        required: false,
        default: '/ugm-white-orizz.png'
      },
    }


}
</script>

<style>
.NuxtLogo {
  animation: 1s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
