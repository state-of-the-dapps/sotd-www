<template>
  <div>
    <section class="section -intro">
      <div class="container">
        <h1 class="heading">Submit a ÐApp</h1>
        <p class="description">
          Use this form to submit a new Ethereum decentralized app.<br />
          Looking to update an existing ÐApp? <a @click="$mixpanel.track('New DApp - Suggest a change')" :href="'mailto:support@stateofthedapps.com?subject=The following ÐApp needs an update: [DAPP NAME]&body=Please update the following: [CHANGE THIS]'" class="link -suggest"><img src="~/assets/images/icons/suggest.png" width="14" class="image"> Suggest a change</a>
        </p>
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
  import Fields from '~/components/dapps/form/Fields'
  import PreviewSave from '~/components/dapps/form/PreviewSave'

  export default {
    components: {
      Fields,
      PreviewSave
    },
    head () {
      return {
        title: 'State of the ÐApps — Submit a ÐApp'
      }
    },
    mounted () {
      this.$store.dispatch('setSiteSection', 'dapps')
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

  .description {
    text-align: center;
    max-width: 600px;
    margin: .5rem auto 0 auto;
    font-size: 1.1rem;
  }

  .section {
    &.-intro {
      background: rgba(lighten($color--gray, 100%), 1);
      box-shadow: 0 0 5px rgba($color--black, .05);
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
