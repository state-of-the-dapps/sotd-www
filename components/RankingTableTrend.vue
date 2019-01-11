<template>
  <trend
    :data="users"
    :gradient="['#333']"
    :stroke-width="3"
    :padding="4"
    smooth/>
</template>

<script>
import Trend from 'vuetrend'

export default {
  components: {
    Trend
  },
  props: {
    users: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>
