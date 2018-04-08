<template>
  <li class="component-DappCardsItem">
    <nuxt-link :to="{ name: 'dapps-slug', params: { slug: dapp.slug } }">
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

