<template>
  <LayoutMain>
    <section class="section -intro">
      <div class="container">
        <PageTitle :title="pageTitle + ' <DApp>'"/>
      </div>
    </section>
    <DappForm
      :endpoint="`dapps/<slug>/edit`"
      :dapp="dapp"
      :mp-event-name="pageTitle + ' DApp - Submit'"
      form-type="edit"/>
  </LayoutMain>
</template>

<script>
import { openIntercom } from '~/helpers/mixins'
import DappForm from '~/components/DappForm'
import LayoutMain from '~/components/LayoutMain'
import PageTitle from '~/components/PageTitle'

export default {
  components: {
    DappForm,
    LayoutMain,
    PageTitle
  },
  mixins: [openIntercom],
  data() {
    return {
      pageTitle: 'Edit'
    }
  },
  asyncData({ $axios, params, error }) {
    return $axios
      .get(`dapps/${params.slug}/edit`)
      .then(response => {
        const dapp = response.data
        if (dapp.slug && dapp.slug !== params.slug) {
          const redirectPath =
            `/dapps/${dapp.slug}/edit` || constants.dappFallbackRedirectPath
          redirect(301, redirectPath)
          return
        }
        return { dapp }
      })
      .catch(e => {
        error({ statusCode: 404 })
      })
  },
  head() {
    return {
      title: 'Edit ' + this.dapp.name + ' — State of the ÐApps'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.title-1 {
  @include title-1;
  text-align: center;
  font-size: 3.2rem;
  margin: 0;
}

.description {
  text-align: left;
  max-width: 600px;
  margin: 0.5rem auto 0 auto;
  font-size: 1.1rem;
}

.container {
  padding-top: 0;
  padding-bottom: 0;
}

.help-wrapper {
  margin: 0 auto;
  max-width: 735px;
  font-size: 1.15rem;
  line-height: 1.4;
  @include tweakpoint('min-width', $tweakpoint--default) {
    display: flex;
    flex-direction: row-reverse;
  }
}

.section {
  &.-intro {
    position: relative;
    z-index: 15;
  }
}

.text-wrapper {
  flex: 1;
  padding: 0 10px;
  @include tweakpoint('min-width', $tweakpoint--default) {
    padding: 0;
    padding-right: 20px;
  }
}
</style>
