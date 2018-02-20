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
    fetch ({ store, params, error }) {
      console.log('running')
      return axios
        .get('dapps/' + params.slug)
        .then(response => {
          const data = response.data
          const item = data.item
          store.dispatch('dapps/detail/setItem', item)
          if (!Object.keys(item).length > 0) {
            error({ statusCode: 404 })
          }
        })
    },
    mounted () {
      this.$store.dispatch('setSiteSection', 'dapps')
      if (this.viewMethod === 'popup') {
        axios
          .get('dapps/' + this.$route.params.slug)
          .then(response => {
            const data = response.data
            const item = data.item
            this.$store.dispatch('dapps/detail/setItem', item)
          })
      }
      this.$mixpanel.track('DApp - View', {
        targetDapp: this.$route.params.slug,
        method: this.viewMethod
      })
      this.$store.dispatch('dapps/detail/resetViewMethod')
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
