<template>
  <LayoutMain>
    <div>
      <section class="section">
        <div class="text-container">
          <h1 class="title-1">It looks like you came from Metamask!</h1>
        </div>
      </section>
    </div>
  </LayoutMain>
</template>

<script>
import LayoutMain from '~/components/LayoutMain'

export default {
  components: {
    LayoutMain
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.page-tech-metamask {
  padding-bottom: 50px;
}

.text-container p {
  max-width: 100%;
  font-size: 1.2rem;
}

.title-1 {
  @include title-1;
  font-size: 3.5rem;
  text-align: center;
  margin: 0;
}
</style>
