<template>
  <div class="page">
    <PageHeading title="Spotlight Title"/>
  </div>
</template>

<script>
import PageHeading from '@/components/PageHeading'

export default {
  components: {
    PageHeading
  }
}
</script>

<style lang="scss" scoped>
.page {
  max-width: 600px;
  margin: 0 auto;
}
</style>
