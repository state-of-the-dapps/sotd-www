<template>
  <div class="component-DappDetailBodyContent">
    <div class="main">
      <DappDetailBodyContentImage/>
      <DappDetailBodyContentDescription/>
      <DappDetailBodyContentModules/>
    </div>
    <div class="actions-related">
      <DappDetailBodyContentSites/>
    </div>
  </div>
</template>

<script>
import Media from 'vue-media'
import DappDetailBodyContentDescription from './DappDetailBodyContentDescription'
import DappDetailBodyContentImage from './DappDetailBodyContentImage'
import DappDetailBodyContentModules from './DappDetailBodyContentModules'
import DappDetailBodyContentSites from './DappDetailBodyContentSites'

export default {
  components: {
    DappDetailBodyContentDescription,
    DappDetailBodyContentImage,
    DappDetailBodyContentModules,
    DappDetailBodyContentSites,
    Media
  }
}
</script>
