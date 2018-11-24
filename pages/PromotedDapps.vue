<template>
  <LayoutMain>
    <div class="page-promoted-dapps">
      <PromotedDapps
        :description="description"
      />
    </div>
  </LayoutMain>
</template>

<script>
import { setPromotedDappsPage } from '~/helpers/mixins'
import LayoutMain from '~/components/LayoutMain'
import PromotedDapps from '~/components/PromotedDapps'

export default {
  components: {
    LayoutMain,
    PromotedDapps
  },
  mixins: [setPromotedDappsPage]
}
</script>
