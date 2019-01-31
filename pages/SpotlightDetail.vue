<template>
  <div class="page">
    <PageHeading title="Spotlight Title"/>
    <p>'Wafer lemon drops biscuit ice cream. Dragée biscuit carrot cake biscuit powder. Candy soufflé bonbon marzipan chocolate cake. Bear claw apple pie halvah powder. Bonbon cupcake lollipop fruitcake pastry icing jelly-o sugar plum wafer. Icing pastry sesame snaps. Toffee cotton candy jelly beans. Bear claw apple pie halvah powder. Bonbon cupcake lollipop fruitcake pastry icing jelly-o sugar plum wafer. Icing pastry sesame snaps.'</p>
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
  max-width: 700px;
  margin: 0 auto;
  padding: 0 10px;
}

p {
  max-width: 550px;
  margin: 0 auto;
  font-size: 1.15rem;
  line-height: 1.3;
}
</style>
