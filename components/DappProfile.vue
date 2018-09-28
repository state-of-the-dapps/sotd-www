<template>
<div class="component-DappProfile">
  <div class="wrapper">
    <p class="description"><strong>Profile strength</strong> &nbsp;{{ Math.ceil(profileScore * 100) }}%</p>
    <div class="meter-wrapper">
      <div class="meter">
        <span class="score" :style="'width: ' + Math.ceil(profileScore * 100) + '%'"></span>
      </div>
    </div>
    <div
      v-if="profileScore !== 1"
      class="improve-wrapper">
      <button
        @click="setModal(true)"
        class="improve">Improve this profile</button>
    </div>
    <BaseModal v-if="modal">
      <div>
        <button
          @click="setModal(false)"
          class="cancel">Cancel</button>
      </div>
      <div>
        <button
          @click="setModal(false)"
          class="cancel">Cancel</button>
      </div>
    </BaseModal>
  </div>
</div>
</template>

<script>
import BaseModal from './BaseModal'

export default {
  data () {
    return {
      modal: false
    }
  },
  components: {
    BaseModal
  },
  props: {
    profileScore: Number
  },
  methods: {
    setModal (value) {
      this.modal = value
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.cancel {
  background: darken($color--gray, 7%);
  border-radius: 3px;
  padding: 7px 12px;
  text-transform: uppercase;
  font-size: .9rem;
  font-weight: 600;
}

.description {
  margin-bottom: 0;
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

.meter-wrapper {
  margin-top: 8px;
}

.meter {
  border-radius: 3px;
  width: 100%;
  height: 7px;
  background: darken($color--gray, 5%);
  overflow: hidden;
}

.improve-wrapper {
  padding-top: 5px; 
}

.improve {
  text-align: left;
  text-decoration: underline;
  font-size: .95rem;
}

.score {
  display: block;
  height: 100%;
  background: $color--black;
}
</style>
