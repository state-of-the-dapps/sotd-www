<template>
  <div>
    <Lead/>
    <StatusSocial/>
    <MainInfo/>
    <Tools/>
    <Related/>
  </div>
</template>

<script>
  import axios from '~/helpers/axios'
  import MainInfo from '~/components/dapps/detail/MainInfo.vue'
  import Lead from '~/components/dapps/detail/Lead.vue'
  import Related from '~/components/dapps/detail/Related.vue'
  import StatusSocial from '~/components/dapps/detail/StatusSocial.vue'
  import Tools from '~/components/dapps/detail/Tools.vue'

  export default {
    components: {
      MainInfo,
      Lead,
      Related,
      StatusSocial,
      Tools
    },
    computed: {
      item () {
        return this.$store.getters['dapps/detail/item']
      },
      viewMethod () {
        return this.$store.getters['dapps/detail/viewMethod']
      }
    },
    destroyed () {
      this.$store.dispatch('dapps/detail/resetItem')
    },
    fetch ({ store, params, redirect, isServer, error }) {
      if (isServer) {
        return axios
          .get('dapps/' + params.slug)
          .then(response => {
            store.dispatch('dapps/detail/setItem', response.data)
            if (!Object.keys(response.data).length > 0) {
              error({ statusCode: 404 })
            }
          })
      }
    },
    mounted () {
      this.$mixpanel.track('DApp - View', {
        targetDapp: this.$route.params.slug,
        method: this.viewMethod
      }, this.$store.dispatch('dapps/detail/resetViewMethod'))
      if (!Object.hasOwnProperty('slug')) {
        axios
          .get('dapps/' + this.$route.params.slug)
          .then(response => {
            this.$store.dispatch('dapps/detail/setItem', response.data)
          })
      }
    },
    head () {
      return {
        title: this.item.name + ' — State of the ÐApps',
        meta: [
          { hid: 'description', name: 'description', content: this.item.teaser }
        ]
      }
    }
  }
</script>
