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
              :height="14"/> <span class="description">{{ $t(namespace('edit')) }}</span>
          </span>
        </li>
        <li class="tool-item">
          <span 
            class="tool-link" 
            role="button" 
            @click="viewDappShare()">
            <SvgIconShare 
              :width="14" 
              :height="14"/> <span class="description">{{ $t(namespace('share')) }}</span>
          </span>
        </li>
        <li class="tool-item">
          <span 
            class="tool-link" 
            role="button" 
            @click="viewDappFlag('flag')">
            <SvgIconFlag 
              :width="14" 
              :height="14"/> <span class="description">{{ $t(namespace('flag')) }}</span>
          </span>
        </li>
        <li class="tool-item">
          <nuxt-link 
            :to="localePath({ name: 'promoted-dapps' })" 
            class="tool-link" 
            @click.native="trackPromotedDappsView">
            <SvgIconFeatured 
              :width="14" 
              :height="14"/> <span class="description">{{ $t(namespace('promote')) }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <BaseModal v-if="shareModal">
      <ModalDappsDetailShare
        :dapp-name="name"
        :dapp-slug="slug"
        @close="closeShareModal"/>
    </BaseModal>
  </div>
</template>

<script>
import {
  trackDappEdit,
  trackDappShare,
  trackDappFlag,
  trackPromotedDappsView
} from '~/helpers/mixpanel'
import BaseModal from './BaseModal'
import ModalDappsDetailShare from './ModalDappsDetailShare'
import SvgIconEdit from './SvgIconEdit'
import SvgIconFeatured from './SvgIconFeatured'
import SvgIconFlag from './SvgIconFlag'
import SvgIconShare from './SvgIconShare'

export default {
  components: {
    BaseModal,
    ModalDappsDetailShare,
    SvgIconEdit,
    SvgIconFeatured,
    SvgIconFlag,
    SvgIconShare
  },
  props: {
    name: {
      type: String,
      required: true,
      default: ''
    },
    slug: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      shareModal: false,
      sourcePath: this.$route.path
    }
  },
  computed: {
    userEntryRoute() {
      return this.$store.getters['userEntryRoute']
    }
  },
  methods: {
    closeShareModal() {
      this.shareModal = false
    },
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
      let action = trackDappEdit(this.slug)
      this.$mixpanel.track(action.name, action.data)
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
      this.$router.push(this.localePath(route))
    },
    viewDappFlag(flag = false) {
      let action = trackDappFlag(this.slug)
      this.$mixpanel.track(action.name, action.data)
      let route = {
        name: 'dapp-detail-flag',
        params: {
          slug: this.slug
        }
      }
      if (flag) {
        route.query = {
          flag: true
        }
      }
      this.$router.push(this.localePath(route))
    },
    viewDappShare() {
      this.shareModal = true
      const action = trackDappShare(this.slug)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>


<style lang="scss" scoped>
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
