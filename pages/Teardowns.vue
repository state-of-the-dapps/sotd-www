<template>
  <div class="page">
    <div class="wrapper">
      <h1 class="title">{{ $t('Teardowns.title') }}</h1>
      <p class="intro">User Onboarding is the process of increasing the likelihood that new users become successful when adopting your product. Let's see how these DApps onboard new users:</p>
      <ul class="teardown-list">
        <li
          v-for="(teardown, index) in teardowns"
          :key="index"
          class="teardown-item"
        >
          <a
            :href="teardown.downloadUrl"
            target="_blank"
            class="teardown-image-wrapper"
            @click="trackDownload(teardown.dapp)"
          >
            <img
              :src="teardown.imageUrl"
              :alt="`Preview image of ${teardown.description}`"
              width="150"
              class="teardown-image"
            >
          </a>
          <a
            :href="teardown.downloadUrl"
            target="_blank"
            class="teardown-link"
            @click="trackDownload(teardown.dapp)"
          >{{ teardown.description }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teardowns: [
        {
          dapp: 'cent',
          description: 'Cent',
          downloadUrl:
            'https://cdn.stateofthedapps.com/teardowns/SotD+User+Onboarding+%26+Teardown+-+Cent+-+2019-03-05.pdf',
          imageAlt: 'How Cent Onboards New Users',
          imageUrl:
            'https://cdn.stateofthedapps.com/dapps/cent/product_image_small_cent_8f8704657ed397d3d163440cd83f7a32b35e2880cd451d99c803348853955f7f_opti.jpg'
        },
        {
          dapp: 'my-crypto-heroes',
          description: 'My Crypto Heroes',
          downloadUrl:
            'https://cdn.stateofthedapps.com/teardowns/SotD+User+Onboarding+%26+Teardown+-+My+Crypto+Heroes+-+2019-03-05.pdf',
          imageAlt: 'How My Crypto Heroes Onboards New Users',
          imageUrl:
            'https://cdn.stateofthedapps.com/dapps/my-crypto-heroes/product_image_small_my-crypto-heroes_43bd2158020e0a0956f9a585918589c6d90d9d96c44bd8a9c23e9d9b47ff4baa_opti.jpg'
        },
        {
          dapp: 'uniswap',
          description: 'UniSwap',
          downloadUrl:
            'https://cdn.stateofthedapps.com/teardowns/SotD+User+Onboarding+%26+Teardown+-+UniSwap+-+2019-03-05.pdf',
          imageAlt: 'How UniSwap Onboards New Users',
          imageUrl:
            'https://cdn.stateofthedapps.com/dapps/uniswap/product_image_small_uniswap_df282b3dd09b08988cb62267974923f369df0a31a0bf4fdf37e95e26a8064b19_opti.jpg'
        },
        {
          dapp: 'world-of-ether',
          description: 'World of Ether',
          downloadUrl:
            'https://cdn.stateofthedapps.com/teardowns/SotD+User+Onboarding+%26+Teardown+-+World+of+Ether+-+2019-03-05.pdf',
          imageAlt: 'How World of Ether Onboards New Users',
          imageUrl:
            'https://cdn.stateofthedapps.com/dapps/world-of-ether/product_image_small_world-of-ether_e54a108e6f24b2b7692e2f8d8cc4c397b32c063159673eac4426bf473bab2d4d_opti.jpg'
        }
      ]
    }
  },
  methods: {
    trackDownload(dapp) {
      this.$mixpanel.track('Teardown Download', { dapp })
    }
  }
}
</script>


<style lang="scss" scoped>
.title {
  @include title-1;
  font-size: 3rem;
  text-transform: initial;
  text-align: center;
  margin-bottom: 0.75rem;
}

.intro {
  font-size: 1.4rem;
  line-height: 1.275;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.teardown-link {
  font-weight: 600;
  font-size: 1.35rem;
}

.teardown-list {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px 0;
}

.teardown-image {
  border-radius: 4px;
  display: block;
}

.teardown-image-wrapper {
  margin-right: 20px;
}

.teardown-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
  border-top: 1px solid rgba($color--black, 0.1);
  padding-top: 10px;
}

.wrapper {
  @include margin-wrapper-main;
  position: relative;
  padding-top: 25px;
  padding-bottom: 25px;
  text-align: center;
}
</style>
