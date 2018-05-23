<template>
<div class="component-DappDetailBodyContentRecommend">
  <div class="wrapper">
    <p class="description">Would you recommend this ÐApp to a friend?</p>
    <ul class="reaction-list">
      <li class="reaction-item">
        <SvgReactionPositive/>
      </li>
      <li class="reaction-item">
        <SvgReactionNeutral/>
      </li>
      <li class="reaction-item">
        <SvgReactionNegative/>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import SvgReactionNegative from './SvgReactionNegative'
import SvgReactionNeutral from './SvgReactionNeutral'
import SvgReactionPositive from './SvgReactionPositive'

export default {
  components: {
    SvgReactionNegative,
    SvgReactionNeutral,
    SvgReactionPositive
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.description {
  margin-bottom: 5px;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
  }
}

.reaction-item {
  padding: 3px;
  cursor: pointer;
  opacity: .5;
  transition: opacity .2s ease;
  &:hover {
    opacity: 1;
  }
}

.reaction-list {
  margin: 0 -3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @include tweakpoint('min-width', 1000px) {
    justify-content: flex-start;
  }
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid darken($color--gray, 6%);
}
</style>
