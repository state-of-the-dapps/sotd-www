<template>
  <div class="item">
    <div class="wrapper">
      <span v-if="location.length">{{ location }}</span><span v-else>Add a location <span class="required">(required)</span></span>
    </div>
    <div class=""></div>
  </div>
</template>

<script>
  export default {
    computed: {
      location () {
        return this.$store.getters['events/form/location']
      }
    }
  }
</script>
