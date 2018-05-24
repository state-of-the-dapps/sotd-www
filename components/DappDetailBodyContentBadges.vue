<template>
<div class="component-DappDetailBodyContentBadges">
  <div class="wrapper">
    <h4 class="subtitle">Badges</h4>
    <ul class="badge-list">
      <li class="badge-item">
        <SvgBadge0x
          fill="black"
          :width="14"
          :height="14"/> <span class="description">0x</span>
      </li>
      <li class="badge-item">
        <SvgBadgeComplete
          fill="black"
          :width="14"
          :height="14"/> <span class="description">Has a complete profile</span>
      </li>
      <li class="badge-item">
        <SvgBadgeConsensys
          fill="black"
          :width="14"
          :height="14"/> <span class="description">Part of <a href="https://new.consensys.net/" target="_blank">Consensys</a></span>
      </li>
      <li class="badge-item">
        <SvgBadgeFeatured
          fill="black"
          :width="14"
          :height="14"/> <span class="description">Currently featured</span>
      </li>
      <li class="badge-item">
        <SvgBadgeHot
          fill="black"
          :width="14"
          :height="14"/> <span class="description">Currently hot</span>
      </li>      
      <li class="badge-item">
        <SvgBadgeMetamask
          fill="black"
          :width="14"
          :height="14"/> <span class="description">Works with <a href="https://www.metamask.io" target="_blank">Metamask</a></span>
      </li>
      <li class="badge-item">
        <SvgBadgeSolidified
          fill="black"
          :width="14"
          :height="14"/> <span class="description">Audited by <a href="https://solidified.io/" target="_blank">Solidified</a></span>
      </li>
      <li class="badge-item">
        <SvgBadgeStatus
          fill="black"
          :width="14"
          :height="14"/> <span class="description">On <a href="https://status.im/" target="_blank">Status.im</a></span>
      </li>
      <li class="badge-item">
        <SvgBadgeToken 
          fill="black"
          :width="14"
          :height="14"/> <span class="description">Has a token</span>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
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
  margin-bottom: .75rem;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
  }
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid darken($color--gray, 6%);
}
</style>
