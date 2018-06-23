<template>
  <span class="component-Help" @mouseover="popoverIsActive = true" @mouseout="popoverIsActive = false">
    <span class="help-icon">?</span>
    <Popover v-if="popoverIsActive" :reversed="reversed" :text="text"/>
  </span>
</template>

<script>
import Popover from './Popover'

export default {
  data () {
    return {
      popoverIsActive: false
    }
  },
  components: {
    Popover
  },
  props: ['reversed', 'text']
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.component-Help {
  display: inline-block;
  margin-left: 5px;
  position: relative;
}

.help-icon {
  display: inline-block;
  background: rgba($color--black, .15);
  text-align: center;
  font-size: .9rem;
  width: 1.1rem;
  height: 1.1rem;
  line-height: 1.1rem;
  font-weight: 700;
  border-radius: 50%;
  cursor: help;
}
</style>

