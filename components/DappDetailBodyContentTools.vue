<template>
  <div class="DappDetailBodyContentTools">
    <div class="wrapper">
      <ul class="tool-list">
        <li class="tool-item">
          <span
            class="tool-link"
            role="button"
            @click="viewDappShare()">
            <IconShare
              :width="14"
              :height="14"/> <span class="description">{{ $t(namespace('share')) }}</span>
          </span>
        </li>
        <li class="tool-item">
          <span
            class="tool-link"
            role="button"
            @click="viewDappFlag('flag')">
            <IconFlag
              :width="14"
              :height="14"/> <span class="description">{{ $t(namespace('flag')) }}</span>
          </span>
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
  trackDappFlag
} from '~/helpers/mixpanel'
import BaseModal from './BaseModal'
import ModalDappsDetailShare from './ModalDappsDetailShare'
import IconEdit from './IconEdit'
import IconFlag from './IconFlag'
import IconShare from './IconShare'

export default {
  components: {
    BaseModal,
    ModalDappsDetailShare,
    IconEdit,
    IconFlag,
    IconShare
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
      this.$router.push(this.localePath(route)).catch(err => {})
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
      this.$router.push(this.localePath(route)).catch(err => {})
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
