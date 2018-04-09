<template>
<ul class="component-DappBadgeList">
  <li class="item" v-for="(badge, index) in badges" :key="index">
    <component :is="svgBadge(badge)" :width="12" :height="12"></component>
  </li>
</ul>
</template>

<script>
import { dappBadgeComponentMap } from '~/helpers/constants'
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
  methods: {
    svgBadge (badge) {
      const badgeComponent = dappBadgeComponentMap[badge]
      return badgeComponent
    }
  },
  props: {
    badges: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
.component-DappBadgeList {
  display: flex;
  align-items: center;
}

.item {
  display: flex;
  align-items: center;
  margin-left: 3px;
}
</style>
