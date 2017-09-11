<template>
  <section class="section">
    <div class="container">
      <Fields/>
      <PreviewSave/>
    </div>
  </section>
</template>

<script>
  import Fields from '~/components/submit/Fields'
  import PreviewSave from '~/components/submit/PreviewSave'

  export default {
    components: {
      Fields,
      PreviewSave
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';
  
  .container {
    display: flex;
    flex-direction: column;
    margin: 20px auto;
    @include tweakpoint('min-width', $tweakpoint--default) {
      margin: 30px auto 200px;
      flex-direction: row;
      width: 800px;
    }
  }
</style>
