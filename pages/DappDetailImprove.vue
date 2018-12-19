<script>
import DappDetailEdit from './DappDetailEdit'

export default {
  extends: DappDetailEdit,
  data() {
    return {
      pageTitle: 'Improve'
    }
  },
  head() {
    return {
      title: this.dapp.name + ' — State of the ÐApps',
      meta: [
        { hid: 'description', name: 'description', content: this.dapp.teaser },
        { hid: 'image', property: 'og:image', content: this.dapp.productImage },
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>
