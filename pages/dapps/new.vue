<template>
  <div>
    <section class="section -intro">
      <div class="container">
        <h1 class="heading">Submit a ÐApp</h1>
        <p class="message">{{ content.message }}</p>
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
  import Fields from '~/components/dapps/new/Fields'
  import PreviewSave from '~/components/dapps/new/PreviewSave'

  export default {
    components: {
      Fields,
      PreviewSave
    },
    computed: {
      content () {
        return // TODO
      }
    }
    head () {
      return {
        title: 'State of the ÐApps — Submit a ÐApp'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .heading {
    text-align: center;
    margin: 0 0 .5rem 0;
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
      border-bottom: 8px solid darken($color--gallery, 5%);
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
