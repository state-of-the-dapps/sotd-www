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
import IconBadge0x from './IconBadge0x'
import IconBadgeComplete from './IconBadgeComplete'
import IconBadgeConsensys from './IconBadgeConsensys'
import IconBadgeFeatured from './IconBadgeFeatured'
import IconBadgeHot from './IconBadgeHot'
import IconBadgeMetamask from './IconBadgeMetamask'
import IconBadgeSolidified from './IconBadgeSolidified'
import IconBadgeStatus from './IconBadgeStatus'
import IconBadgeToken from './IconBadgeToken'

export default {
  components: {
    IconBadge0x,
    IconBadgeComplete,
    IconBadgeConsensys,
    IconBadgeFeatured,
    IconBadgeHot,
    IconBadgeMetamask,
    IconBadgeSolidified,
    IconBadgeStatus,
    IconBadgeToken
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
