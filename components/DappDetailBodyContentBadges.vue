<template>
  <div class="DappDetailBodyContentBadges">
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
import Badge0x from './Badge0x'
import BadgeComplete from './BadgeComplete'
import BadgeConsensys from './BadgeConsensys'
import BadgeFeatured from './BadgeFeatured'
import BadgeHot from './BadgeHot'
import BadgeMetamask from './BadgeMetamask'
import BadgeSolidified from './BadgeSolidified'
import BadgeStatus from './BadgeStatus'
import BadgeToken from './BadgeToken'

export default {
  components: {
    Badge0x,
    BadgeComplete,
    BadgeConsensys,
    BadgeFeatured,
    BadgeHot,
    BadgeMetamask,
    BadgeSolidified,
    BadgeStatus,
    BadgeToken
  },
  props: {
    badges: {
      type: Array,
      required: true,
      default: () => []
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
  font-weight: normal;
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
