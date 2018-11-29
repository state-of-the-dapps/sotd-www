<template>
  <div class="item">
    <div class="file-upload">
      File upload
    </div>
    <p class="help">Dimensions must be 1200px width by 630px height <br><a 
      href="https://cdn.stateofthedapps.com/image_guidelines_08152018.png"
      target="_blank">View the guidelines</a></p>
  </div>
</template>

<script>
export default {
  computed: {
    productImage: {
      get() {
        return this.$store.getters['dapps/form/productImage']
      },
      set(value) {
        const field = {
          name: 'productImage',
          value: value
        }
        this.$store.dispatch('dapps/form/setField', field)
      }
    }
  }
}
</script>
