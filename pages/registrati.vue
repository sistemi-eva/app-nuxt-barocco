<template>
  <div class="container">
    <div>
      <Logo />

      <mt-field label="Username" placeholder="" v-model="username"></mt-field>
      <mt-field label="Password" placeholder="" type="password" v-modal="password"></mt-field>

      <mt-button type="primary" plain @click="$router.push('/')">Accedi</mt-button>
      <mt-button type="danger" plain @click="$router.push('/registrati')">Registrati</mt-button>

            <mt-button type="default" plain @click="$router.push('/password-dimenticata')">Password dimenticata?</mt-button>

    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      form: {}


    }
  }






}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}



.links {
  padding-top: 15px;
}
</style>
