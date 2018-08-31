<template>
<div class="component-DappProfile">
  <div class="wrapper">
    <p class="description"><strong>Profile strength</strong> &nbsp;{{ Math.ceil(profileScore * 100) }}%</p>
    <div class="meter-wrapper">
      <div class="meter">
        <span class="score" :style="'width: ' + Math.ceil(profileScore * 100) + '%'"></span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    profileScore: Number
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.description {
  margin-bottom: 0;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
  }
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid darken($color--gray, 6%);
}

.meter-wrapper {
  margin-top: 8px;
}

.meter {
  border-radius: 3px;
  width: 100%;
  height: 7px;
  background: darken($color--gray, 5%);
  overflow: hidden;
}

.score {
  display: block;
  height: 100%;
  background: $color--black;
}
</style>
