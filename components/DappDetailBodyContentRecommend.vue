<template>
<div class="component-DappDetailBodyContentRecommend">
  <div class="wrapper">
    <p>Would you recommend this ÐApp to a friend?</p>
    <ul class="reaction-list">
      <li class="reaction-item">
        <SvgReactionPositive/>
      </li>
      <li class="reaction-item">
        <SvgReactionNeutral/>
      </li>
      <li class="social-item">
        <SvgReactionNegative/>
      </li>
    </ul>
  </div>
</div>
</template>

<style lang="scss" scoped>
@import '~assets/css/settings';

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid $color--gray;
}
</style>
