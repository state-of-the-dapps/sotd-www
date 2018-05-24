<template>
<div class="component-DappDetailBodyContentBadges">
  <div class="wrapper">
    <h4 class="subtitle">Tags</h4>
    <ul class="tag-list">
      <li class="tag-item">
        <a class="tag-link" href="#">#smart-contract</a>
      </li>
      <li class="tag-item">
        <a class="tag-link" href="#">#tag</a>
      </li>
      <li class="tag-item">
        <a class="tag-link" href="#">#tag</a>
      </li>
    </ul>
  </div>
</div>
</template>

<style lang="scss" scoped>
@import '~assets/css/settings';

.subtitle {
  font-weight: 300; 
  margin-bottom: .75rem;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
  }
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  margin: -4px;
  justify-content: center;
  @include tweakpoint('min-width', 1000px) {
    justify-content: flex-start;
  }
}

.tag-link {
  text-decoration: none;
  display: block;
  padding: 5px 8px;
  margin: 4px;
  background: lighten($color--gray, 2%);
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid darken($color--gray, 6%);
}
</style>
