<template>
  <div class="component-DappDetailBodyContentBadges">
    <div class="wrapper">
      <ul class="badge-list">
        <li 
          v-for="(badge, index) in badges" 
          :key="index" 
          class="badge-item">
          <component 
            :is="mapSvgBadge(badge, 'component')" 
            :width="16" 
            :height="18" 
            fill="black"/>
          <span 
            class="description" 
            v-html="mapSvgBadge(badge, 'description')"/>
        </li>
      </ul>
    </div>
  </div>
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

.badge-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  justify-content: center;
  @include tweakpoint('min-width', 1000px) {
    justify-content: flex-start;
  }
}

.description {
  margin-left: 6px;
}

.subtitle {
  font-weight: 300;
  margin-bottom: 0.75rem;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
  }
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid darken($color--gray, 6%);
}
</style>
