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
      title: this.fields.name + ' — State of the ÐApps',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.fields.teaser
        },
        {
          hid: 'image',
          property: 'og:image',
          content: this.fields.productImage
        },
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>
