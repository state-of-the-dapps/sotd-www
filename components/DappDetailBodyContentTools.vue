<template>
<div class="component-DappDetailBodyContentBadges">
  <div class="wrapper">
    <ul class="tool-list">
      <li class="tool-item">
        <a href="#" class="tool-link"><img src="~/assets/images/icons/edit.png" width="14"> <span class="description">Edit this ÐApp</span></a>
      </li>
      <li class="tool-item">
        <a href="#" class="tool-link"><img src="~/assets/images/icons/share.png" width="14"> <span class="description">Share this ÐApp</span></a>
      </li>
      <li class="tool-item">
        <a href="#" class="tool-link"><img src="~/assets/images/icons/flag.png" width="14"> <span class="description">Flag as inappropriate</span></a>
      </li>
      <li class="tool-item">
        <a href="#" class="tool-link"><SvgIconFeatured :width="14" :height="14"/> <span class="description">Promote this ÐApp</span></a>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import SvgIconFeatured from './SvgIconFeatured'

export default {
  components: {
    SvgIconFeatured
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.description {
  margin-left: 6px;
}

.tool-item {
  margin-bottom: 5px;
  &:last-child {
    margin-top: 25px;
  }
}

.tool-link {
  display: flex;
  align-items: center;
  justify-content: center;
  @include tweakpoint('min-width', 1000px) {
    justify-content: flex-start;
  }
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
}
</style>
