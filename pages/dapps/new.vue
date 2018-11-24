<template>
  <LayoutMain>
    <div>
      <section class="section -intro">
        <div class="container">
          <h1 class="heading">Submit a ÐApp</h1>
          <p class="description">
            Use this form to submit a new Ethereum, EOS or POA decentralized app. Submitting is free.<br >
            Looking to update an existing ÐApp? Use the &nbsp;<img 
              src="~/assets/images/icons/edit.png" 
              width="14" 
              class="image"> <strong>Edit</strong>&nbsp; option on the respective ÐApp details page.
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
  </LayoutMain>
</template>

<script>
import Fields from '~/components/dapps/form/Fields'
import LayoutMain from '~/components/LayoutMain'
import PreviewSave from '~/components/dapps/form/PreviewSave'

export default {
  components: {
    Fields,
    LayoutMain,
    PreviewSave
  },
  head() {
    return {
      title: 'State of the ÐApps — Submit a ÐApp'
    }
  },
  mounted() {
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
  margin: 0.5rem auto 0 auto;
  font-size: 1.1rem;
}

.section {
  &.-intro {
    background: rgba(lighten($color--gray, 100%), 1);
    box-shadow: 0 0 5px rgba($color--black, 0.05);
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
