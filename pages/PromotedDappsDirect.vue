<template>
  <div class="page">
    <PromotedDapps
      :description="description"
      :direct-view="true"
    />
  </div>
</template>

<script>
import { setPromotedDappsPage } from '~/helpers/mixins'
import PromotedDapps from '~/components/PromotedDapps'

export default {
  components: {
    PromotedDapps
  },
  mixins: [setPromotedDappsPage]
}
</script>
