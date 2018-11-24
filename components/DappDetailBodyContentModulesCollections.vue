<template>
  <div class="component-DappDetailBodyContentModulesCollections">
    <h4 class="subtitle">Featured in these collections</h4>
    <ul class="collection-list">
      <li class="collection-item">
        <span class="collection-icon"/>
        <span class="collection-name"><SvgBadgeFeatured 
          :width="12" 
          :height="14" 
          fill="black"/> <span class="collection-name-description"><a href="#">Best games of 2018</a></span></span>
      </li>
      <li class="collection-item">
        <span class="collection-icon"/>
        <span class="collection-name"><SvgBadgeFeatured 
          :width="12" 
          :height="14" 
          fill="black"/> <span class="collection-name-description"><a href="#">Best games of 2018</a></span></span>
      </li>
      <li class="collection-item">
        <span class="collection-icon"/>
        <span class="collection-name"><SvgBadgeFeatured 
          :width="12" 
          :height="14" 
          fill="black"/> <span class="collection-name-description"><a href="#">Best games of 2018</a></span></span>
      </li>
      <li class="collection-item">
        <span class="collection-icon"/>
        <span class="collection-name"><SvgBadgeFeatured 
          :width="12" 
          :height="14" 
          fill="black"/> <span class="collection-name-description"><a href="#">Best games of 2018</a></span></span>
      </li>
    </ul>
  </div>
</template>

<script>
import SvgBadgeFeatured from './SvgBadgeFeatured'

export default {
  components: {
    SvgBadgeFeatured
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.collection-list {
  margin-top: 9px;
}

.collection-item {
  padding: 3px 0;
}

.collection-name {
  display: flex;
  align-items: center;
}

.collection-name-description {
  margin-left: 5px;
}

.subtitle {
  margin: 0;
}
</style>
