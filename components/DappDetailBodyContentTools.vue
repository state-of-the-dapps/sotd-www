<template>
  <div class="component-DappDetailBodyContentTools">
    <div class="wrapper">
      <ul class="tool-list">
        <li class="tool-item">
          <span 
            class="tool-link" 
            role="button" 
            @click="viewDappEdit()">
            <SvgIconEdit 
              :width="14" 
              :height="14"/> <span class="description">Edit this ÐApp</span>
          </span>
        </li>
        <li class="tool-item">
          <span 
            class="tool-link" 
            role="button" 
            @click="viewDappShare()">
            <SvgIconShare 
              :width="14" 
              :height="14"/> <span class="description">Share this ÐApp</span>
          </span>
        </li>
        <li class="tool-item">
          <span 
            class="tool-link" 
            role="button" 
            @click="viewDappEdit('flag')">
            <SvgIconFlag 
              :width="14" 
              :height="14"/> <span class="description">Flag as inappropriate</span>
          </span>
        </li>
        <li class="tool-item">
          <nuxt-link 
            :to="{ name: 'promoted-dapps' }" 
            class="tool-link" 
            @click.native="trackPromotedDappsView">
            <SvgIconFeatured 
              :width="14" 
              :height="14"/> <span class="description">Promote this ÐApp</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  trackDappEdit,
  trackDappShare,
  trackDappFlag,
  trackPromotedDappsView
} from '~/helpers/mixpanel'
import SvgIconEdit from './SvgIconEdit'
import SvgIconFeatured from './SvgIconFeatured'
import SvgIconFlag from './SvgIconFlag'
import SvgIconShare from './SvgIconShare'

export default {
  components: {
    SvgIconEdit,
    SvgIconFeatured,
    SvgIconFlag,
    SvgIconShare
  },
  props: {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      sourcePath: this.$route.path
    }
  },
  computed: {
    userEntryRoute() {
      return this.$store.getters['userEntryRoute']
    }
  },
  methods: {
    trackPromotedDappsView() {
      const sourceComponent = 'DappDetailBodyContentTools'
      const action = trackPromotedDappsView(
        sourceComponent,
        this.sourcePath,
        this.userEntryRoute
      )
      this.$mixpanel.track(action.name, action.data)
    },
    viewDappEdit(flag = false) {
      if (flag) {
        let action = trackDappFlag(this.slug)
        this.$mixpanel.track(action.name, action.data)
      } else {
        let action = trackDappEdit(this.slug)
        this.$mixpanel.track(action.name, action.data)
      }
      let route = {
        name: 'dapp-detail-edit',
        params: {
          slug: this.slug
        }
      }
      if (flag) {
        route.query = {
          flag: true
        }
      }
      this.$router.push(route)
    },
    viewDappShare() {
      const action = trackDappShare(this.slug)
      this.$mixpanel.track(action.name, action.data)
      const modal = {
        component: 'ModalDappsDetailShare',
        mpData: {},
        props: {
          dapp: this.name,
          path: `https://www.stateofthedapps.com${this.$route.path}`
        }
      }
      this.$store.dispatch('setSiteModal', modal)
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
  text-decoration: underline;
  cursor: pointer;
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
  border-bottom: 1px solid darken($color--gray, 6%);
}
</style>
