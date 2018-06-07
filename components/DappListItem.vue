<template>
  <li class="component-DappListItem">
    <ul>
      <li>{{ dapp.name }}</li>
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    dapp: {
      required: true
    }
  }
}
</script>

