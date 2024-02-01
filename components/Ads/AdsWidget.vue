<template>
  <div>
    <transition name="fade">
      <van-swipe
        v-if="!loading"
        autoplay="4000"
        class="sites-swipe  mt-3"
        :loop="false"
        :width="320"
        :height="225"
      >
        <van-swipe-item v-for="ad in ads" :key="ad.iframe_url">
          <div class="pr-3">
            <img
              @click="changePage({ name: 'web', iframe_url: ad.iframe_url })"
              class="ads-image"
              :src="ad.url_image"
            />
          </div>
        </van-swipe-item>
      </van-swipe>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      search: false,
      query: "",
      ads: [
        {
          url_image: "/union_fattura.png",
          iframe_url:
            "https://baroccolucegas.it/fattura-digitale/ "
        },

        {
          url_image: "/union_business.png",
          iframe_url: "https://baroccolucegas.it/offerte-business/"
        },
        {
          url_image: "/union_offerta.png",
          iframe_url: "https://baroccolucegas.it/offerte-casa/"
        }
      ]
    };
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    changePage({ name, iframe_url }) {
      this.$router.push({ name, query: { iframe_url } });
    }
  }
};
</script>

<style scoped>
.cell {
  margin-left: -5px;
  margin-right: -10px;
  margin-bottom: 5px;
  border-radius: 50px;
}
.search {
  margin-left: -12px;

  color: rgb(68, 68, 68);
}

.ads-image {
  height: 100%;
  width: 100%;
  border-radius: 35px;
}
.my-swipe .van-swipe-item {
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}
</style>
