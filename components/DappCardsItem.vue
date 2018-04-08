<template>
<li class="component-DappCardsItem">
  <nuxt-link class="dapp-link" :to="{ name: 'dapps-slug', params: { slug: dapp.slug } }">
    {{ dapp.name }}
  </nuxt-link>
</li>
</template>

<script>
export default {
  props: {
    dapp: {
      required: true,
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappCardsItem {
  position: relative;
  height: 250px;
  margin: 10px;
  box-shadow: 0 15px 20px rgba($color--black, .1);
  transition: all .2s ease;
  border-radius: 4px;
  overflow: hidden;
  &:hover {
    transform: translateY(-2px);
  }
}

.dapp-link {
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;  
}

</style>
