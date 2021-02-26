<template>
  <div class="DappDetailBodyContentOwner">
    <div class="wrapper">
      <div class="description"><strong>{{ $t(namespace('isOwner')) }}</strong></div>
      <ul class="tool-list">
        <li class="tool-item">
          <span
            class="tool-link"
            role="button"
            @click="viewDappEdit()">
            <IconEdit
              :width="14"
              :height="14"/> <span class="description">{{ $t(namespace('edit')) }}</span>
          </span>
        </li>
        <li class="tool-item">
          <nuxt-link
            :to="localePath({ name: 'promoted-dapps' })"
            class="tool-link"
            @click.native="trackPromotedDappsView">
            <IconFeatured
              :width="14"
              :height="14"/> <span class="description">{{ $t(namespace('promote')) }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { trackDappEdit } from '~/helpers/mixpanel'
import IconEdit from './IconEdit'
import IconFeatured from './IconFeatured'

export default {
  components: {
    IconEdit,
    IconFeatured
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
      sourcePath: this.$route.path
    }
  },
  computed: {
    userEntryRoute() {
      return this.$store.getters['userEntryRoute']
    }
  },
  methods: {
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
    }
  }
}
</script>


<style lang="scss" scoped>
.description {
  margin-left: 6px;
}

.tool-list {
  margin-top: 15px;
  padding-left: 8px;
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
