<template>
  <div>
    <IntroCtaSection/>
    <StatusSocialSection/>
    <MainInfoSection/>
    <ToolsSection/>
    <RelatedDappsSection/>
  </div>
</template>

<script>
  import MainInfoSection from '~/components/sections/detail/MainInfo.vue'
  import IntroCtaSection from '~/components/sections/detail/IntroCta.vue'
  import RelatedDappsSection from '~/components/sections/detail/RelatedDapps.vue'
  import StatusSocialSection from '~/components/sections/detail/StatusSocial.vue'
  import ToolsSection from '~/components/sections/detail/Tools.vue'
  import axios from '~/plugins/axios'

  export default {
    components: {
      MainInfoSection,
      IntroCtaSection,
      RelatedDappsSection,
      StatusSocialSection,
      ToolsSection
    },
    computed: {
      active () {
        return this.$store.getters['dapp/active']
      },
      viewMethod () {
        return this.$store.getters['dapp/viewMethod']
      }
    },
    destroyed () {
      this.$store.dispatch('dapp/reset')
    },
    fetch ({ store, params, redirect, isServer }) {
      if (isServer) {
        return axios
          .get('dapps/' + params.slug)
          .then(response => {
            store.dispatch('dapp/setActive', response.data)
            if (!Object.keys(response.data).length > 0) {
              redirect('/404')
            }
          })
      }
    },
    mounted () {
      this.$mixpanel.track('DApp - View', {
        targetDapp: this.$route.params.slug,
        method: this.viewMethod
      }, this.$store.dispatch('dapp/resetViewMethod'))
      if (!Object.keys(this.active).length > 0) {
        axios
          .get('dapps/' + this.$route.params.slug)
          .then(response => {
            this.$store.dispatch('dapp/setActive', response.data)
          })
      }
    },
    head () {
      return {
        title: 'State of the ÐApps - ' + this.active.name
      }
    }
  }
</script>
