<template>
    <div class="page-content">
      <slot/>
    </div>
</template>

<script>
export default {
  name: 'PageLayout'
}
</script>

<style>
  .page-content {
    margin: 0px 10px;
    padding-bottom: 40px;
    padding-top: 30px
  }

  .page-content:first-child {
    /* position: relative; */
    /* padding-top:15px; */
    /* top: -20px; */
  }
</style>