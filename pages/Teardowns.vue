<template>
  <div class="page">
    <div class="wrapper">
      <h1 class="title">{{ $t('Teardowns.title') }}</h1>
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
          dapp: '',
          description: 'DApp Teardown',
          downloadUrl: '#',
          imageAlt: '',
          imageUrl: 'https://www.fillmurray.com/g/200/100'
        },
        {
          dapp: '',
          description: 'DApp Teardown',
          downloadUrl: '#',
          imageAlt: '',
          imageUrl: 'https://www.fillmurray.com/g/200/100'
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
