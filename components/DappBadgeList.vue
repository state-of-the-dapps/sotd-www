<template>
  <ul class="component-DappBadgeList">
    <li 
      v-for="(badge, index) in badges" 
      :key="index" 
      class="item">
      <span class="popover">{{ badge | formatDappBadge }}</span>
      <component 
        :is="mapSvgBadge(badge, 'component')" 
        :width="12" 
        :height="14"/>
    </li>
  </ul>
</template>

<script>
import { dappBadgeMap } from '~/helpers/constants'
import SvgBadge0x from './SvgBadge0x'
import SvgBadgeComplete from './SvgBadgeComplete'
import SvgBadgeConsensys from './SvgBadgeConsensys'
import SvgBadgeFeatured from './SvgBadgeFeatured'
import SvgBadgeHot from './SvgBadgeHot'
import SvgBadgeMetamask from './SvgBadgeMetamask'
import SvgBadgeSolidified from './SvgBadgeSolidified'
import SvgBadgeStatus from './SvgBadgeStatus'
import SvgBadgeToken from './SvgBadgeToken'

export default {
  components: {
    SvgBadge0x,
    SvgBadgeComplete,
    SvgBadgeConsensys,
    SvgBadgeFeatured,
    SvgBadgeHot,
    SvgBadgeMetamask,
    SvgBadgeSolidified,
    SvgBadgeStatus,
    SvgBadgeToken
  },
  props: {
    badges: {
      type: Array,
      required: true
    }
  },
  methods: {
    mapSvgBadge(badge, prop) {
      const badgeObj = dappBadgeMap[badge]
      if (badgeObj) {
        return badgeObj[prop]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappBadgeList {
  display: flex;
  align-items: center;
}

.item {
  display: flex;
  align-items: center;
  margin-left: 3px;
  position: relative;
}

.popover {
  opacity: 0;
  position: absolute;
  right: -5px;
  bottom: 20px;
  white-space: nowrap;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 600;
  height: 25px;
  line-height: 26px;
  padding: 0 10px;
  border-radius: 4px;
  background: rgba($color--white, 0.85);
  transition: opacity 0.3s ease;
  box-shadow: 0 5px 10px rgba($color--black, 0.15);
  &:after {
    content: '';
    position: absolute;
    right: 6px;
    bottom: -5px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid rgba($color--white, 0.9);
  }
  .item:hover & {
    opacity: 1;
  }
}
</style>
