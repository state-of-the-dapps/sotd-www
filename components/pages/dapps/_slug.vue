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
      }
    },
    mounted () {
      return axios
        .get('dapps/' + this.$route.params.slug)
        .then(response => {
          this.$store.dispatch('dapp/setActive', response.data)
        })
    },
    head () {
      return {
        title: 'State of the ÐApps - ' + this.active.name
      }
    }
  }
</script>
