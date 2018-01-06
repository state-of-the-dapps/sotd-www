<template>
  <div>
    <section class="section -intro">
      <div class="container">
        <h1 class="heading">Submit an event</h1>
      </div>
    </section>
    <section class="section -form">
      <div class="container">
        <Fields/>
        <PreviewSave/>
      </div>
    </section>
  </div>
</template>

<script>
  import Fields from '~/components/events/form/Fields'
  import PreviewSave from '~/components/events/form/PreviewSave'

  export default {
    components: {
      Fields,
      PreviewSave
    },
    head () {
      return {
        title: 'State of the ÐApps — Submit an event'
      }
    },
    mounted () {
      this.$store.dispatch('setSiteSection', 'events')
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .heading {
    text-align: center;
    margin: 0;
    font-size: 1.75rem;
    font-weight: 700;
  }

  .message {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    font-size: 1.1rem;
  }

  .section {
    &.-intro {
      background: rgba(lighten($color--gallery, 100%), 1);
      box-shadow: 0 0 50px rgba($color--mine-shaft, .15);
      position: relative;
      z-index: 15;
      .container {
        padding-top: 50px;
        padding-bottom: 50px;
      }
    }
    &.-form {
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
    }
  }
</style>
