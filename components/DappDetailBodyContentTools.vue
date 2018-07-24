<template>
<div class="component-DappDetailBodyContentBadges">
  <div class="wrapper">
    <ul class="tool-list">
      <li class="tool-item">
        <a class="tool-link" @click="viewDappEdit">
          <SvgIconEdit :width="14" :height="14"/> <span class="description">Edit this ÐApp</span>
        </a>
      </li>
      <li class="tool-item">
        <a :href="'mailto:?subject=Check out this DApp: ' + name + '&body=https://www.stateofthedapps.com/dapps/' + slug" @click="trackDappShare" class="tool-link">
          <SvgIconShare :width="14" :height="14"/> <span class="description">Share this ÐApp</span>
        </a>
      </li>
      <li class="tool-item">
        <a :href="'mailto:support@stateofthedapps.com?subject=Please review this ÐApp: ' + name + '&body=https://www.stateofthedapps.com/dapps/' + slug" @click="trackDappFlag" class="tool-link">
          <SvgIconFlag :width="14" :height="14"/> <span class="description">Flag as inappropriate</span>
        </a>
      </li>
      <li class="tool-item">
        <nuxt-link :to="{ name: 'promoted-dapps' }" @click.native="trackPromotedDappsView" class="tool-link">
          <SvgIconFeatured :width="14" :height="14"/> <span class="description">Promote this ÐApp</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { trackDappEdit, trackDappShare, trackDappFlag, trackPromotedDappsView } from '~/helpers/mixpanel'
import SvgIconEdit from './SvgIconEdit'
import SvgIconFeatured from './SvgIconFeatured'
import SvgIconFlag from './SvgIconFlag'
import SvgIconShare from './SvgIconShare'

export default {
  data () {
    return {
      sourcePath: this.$route.path
    }
  },
  components: {
    SvgIconEdit,
    SvgIconFeatured,
    SvgIconFlag,
    SvgIconShare
  },
  computed: {
    userEntryRoute () {
      return this.$store.getters['userEntryRoute']
    }
  },
  methods: {
    trackDappShare () {
      const action = trackDappShare(this.slug)
      this.$mixpanel.track(action.name, action.data)
    },
    trackDappFlag () {
      const action = trackDappFlag(this.slug)
      this.$mixpanel.track(action.name, action.data)
    },
    trackPromotedDappsView () {
      const sourceComponent = 'DappDetailBodyContentTools'
      const action = trackPromotedDappsView(sourceComponent, this.sourcePath, this.userEntryRoute)
      this.$mixpanel.track(action.name, action.data)
    },
    viewDappEdit () {
      const action = trackDappEdit(this.slug)
      this.$mixpanel.track(action.name, action.data)
      const modal = {
        component: 'ModalDappsDetailEdit',
        mpData: {},
        props: {
          dapp: this.name,
          path: `https://www.stateofthedapps.com${this.$route.path}`,
          slug: this.slug
        }
      }
      this.$store.dispatch('setSiteModal', modal)
    }
  },
  props: {
    name: {
      required: true
    },
    slug: {
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.description {
  margin-left: 6px;
}

.tool-item {
  margin-bottom: 5px;
  &:last-child {
    margin-top: 25px;
  }
}

.tool-link {
  display: flex;
  align-items: center;
  justify-content: center;
  @include tweakpoint('min-width', 1000px) {
    justify-content: flex-start;
  }
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
}
</style>
