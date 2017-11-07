<template>
  <div>
    <p class="heading">Contract addresses</p>
    <ul>
      <li v-for="(contract, key) in contracts">
        <div>{{ key | capitalize }}</div>
        <div><input type="text"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    computed: {
      contracts () {
        return this.$store.getters['submit/contracts']
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .heading {
    text-align: center;
    margin-top: 1.25rem;
    margin-bottom: .75rem;
  }
</style>
