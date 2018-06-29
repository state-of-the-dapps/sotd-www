<template>
  <LayoutMain>
    <div class="page-my-list">
      <div class="heading-wrapper">
        <h1 class="title-1">My List</h1>
        <p class="description">Create a list of ÐApps to monitor and share with your friends.<span v-if="!dapps.length"> To begin, <nuxt-link :to="{name: 'dapps'}">visit some ÐApps</nuxt-link> and add them to your list!</span></p>
        <p class="notice"><strong>Please note:</strong> This is an experimental feature. For now, your list will only be available on your current browser/device.<br/>Email feedback to <a href="mailto:support@stateofthedapps.com">support@stateofthedapps.com</a></p>
      </div>
      <div class="wrapper">
        <div v-if="!dapps.length" class="instructions">
          <img class="instructions-image" src="~/assets/images/addtolist.jpg">
        </div>
        <div v-else>
          <div class="share-wrapper"><button class="share-button" @click="share(dapps)">Share this list &nbsp; <SvgIconShare fill="white" :width="10" :height="10"/></button></div>
          <DappCardList :dapps="dapps"/>
        </div>
      </div>
    </div>
  </LayoutMain>
</template>

<script>
import { trackMyListView } from '~/helpers/mixpanel'
import axios from '~/helpers/axios'
import DappCardList from '~/components/DappCardList'
import LayoutMain from '~/components/LayoutMain'
import SvgIconShare from '~/components/SvgIconShare'

export default {
  data () {
    return {
      dapps: []
    }
  },
  components: {
    DappCardList,
    LayoutMain,
    SvgIconShare
  },
  head () {
    return {
      title: 'State of the ÐApps — Share Your List of ÐApps'
    }
  },
  methods: {
    share (dapps) {
      const modal = {
        component: 'ModalMyListShare',
        mpData: {}
      }
      this.$store.dispatch('setSiteModal', modal)
    }
  },
  mounted () {
    let slugs = this.$localStorage.get('myList') || []
    if (slugs.length) {
      slugs = slugs.split(',')
      axios
        .get('dapps', {
          params: {
            included: slugs
          }
        })
        .then(response => {
          const dapps = response.data.items
          this.dapps = dapps
        })
    }
    const action = trackMyListView(slugs)
    this.$mixpanel.track(action.name, action.data)
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.description {
  margin: .5rem auto 0 auto;
  text-align: center;
  max-width: 700px;
}

.instructions-image {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: block;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba($color--black, .15);
}

.wrapper, .heading-wrapper {
  @include margin-wrapper-main;
}

.heading-wrapper {
  padding: 4rem 0 3rem 0;
}

.page-my-list {
  margin-bottom: 50px;
}

.notice {
  border-radius: 4px;
  box-shadow: 0 5px 20px rgba($color--black, .1);
  line-height: 1.4;
  font-size: 1rem;
  text-align: center;
  max-width: 700px;
  margin: 25px auto 35px;
  padding: 10px;
  background: lighten($color--white, 100%);
}

.share-button {
  background: $color--black;
  color: $color--white;
  padding: 12px 30px;
  box-shadow: 0 0 20px rgba($color--black, .2);
  margin-bottom: 25px;
  position: relative;
  &:active {
    top: 1px;
    box-shadow: none;
  }
}

.share-wrapper {
  text-align: center;
}

.title-1 {
  @include title-1;
  font-size: 3.5rem;
  text-align: center;
  margin: 0;
}
</style>
