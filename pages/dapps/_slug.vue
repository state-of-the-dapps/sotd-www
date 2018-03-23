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
      return axios
        .get('dapps/' + params.slug)
        .then(response => {
          const data = response.data
          const item = data.item
          store.dispatch('dapps/detail/setItem', item)
          store.dispatch('setSiteSection', 'dapps')
          if (!Object.keys(item).length > 0) {
            error({ statusCode: 404 })
          }
        })
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
