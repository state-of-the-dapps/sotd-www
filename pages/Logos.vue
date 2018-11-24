<template>
  <LayoutMain>
    <div class="page-logos">
      <div class="wrapper">
        <h1 class="title-1">Download our logos</h1>
        <p>The logos and icons below can be used to link to State of the ÐApps. Please do not modify them.</p>
        <p>Below are some examples. The <a 
          href="/logos.zip" 
          download 
          @click="trackLogosDownload">full set</a> has more color options.</p>
        <ul class="logo-list">
          <li class="logo-item">
            <a 
              class="button"
              href="/logos.zip"
              download
              @click="trackLogosDownload">Download all logos (.zip)</a>
          </li>
          <li
            v-for="(logo, index) in logos"
            :key="index"
            class="logo-item">
            <a
              href="/logos.zip"
              download
              @click="trackLogosDownload">
              <img 
                :width="logo.width" 
                :src="require(`~/assets/images/press/${logo.url}`)">
            </a>
          </li>
        </ul>
      </div>
    </div>
  </LayoutMain>
</template>

<script>
import LayoutMain from '~/components/LayoutMain'
import { trackLogosDownload } from '~/helpers/mixpanel'

export default {
  components: {
    LayoutMain
  },
  data() {
    return {
      logos: [
        {
          width: '140',
          url: 'logo-reverse.png'
        },
        {
          width: '140',
          url: 'logo.png'
        },
        {
          width: '50',
          url: 'monogram.png'
        },
        {
          width: '50',
          url: 'rounded-outlined.png'
        },
        {
          width: '50',
          url: 'rounded-square.png'
        }
      ]
    }
  },
  methods: {
    trackLogosDownload() {
      const action = trackLogosDownload()
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.button {
  display: inline-block;
  background: $color--black;
  color: $color--gray;
  padding: 15px 20px;
  border-radius: 4px;
  text-decoration: none;
}

.description {
  text-align: center;
  font-size: 1.2rem;
  max-width: 500px;
  margin: 0 auto;
}

.logo-list {
  padding: 20px 10px;
}

.logo-item {
  padding-bottom: 20px;
}

.title-1 {
  font-size: 3rem;
  text-transform: initial;
  text-align: center;
  margin-bottom: 0.75rem;
}

.wrapper {
  @include margin-wrapper-main;
  position: relative;
  padding-top: 25px;
  padding-bottom: 25px;
  text-align: center;
}
</style>
