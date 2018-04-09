<template>
<div class="component-SecondaryCtaMailingList" id="component-SecondaryCtaMailingList">
  <div class="wrapper">
    <SvgIconMail fill="white" :width="30" :height="30" />
    <h2 class="title-2">Stay in the loop</h2>
    <p class="description">Subscribe to receive updates.</p>
    <div class="input-wrapper">
      <input id="component-SecondaryCtaMailingList-input" v-model="email" @input="validateEmail" class="input" type="text" placeholder="Enter your email here" />
    </div>
    <button class="cta" :class="emailIsValid ? '-is-valid' : ''">Join</button>
  </div>
</div>
</template>

<script>
import { isValidEmail } from '~/helpers/validators'
import SvgIconMail from './SvgIconMail'

export default {
  components: {
    SvgIconMail
  },
  data () {
    return {
      email: '',
      emailIsValid: false
    }
  },
  methods: {
    validateEmail () {
      let isValid = false
      if (this.email.length > 0) {
        isValid = isValidEmail(this.email)
      } else {
        isValid = false
      }
      this.emailIsValid = isValid
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.cta {
  padding: 4px 75px;
  border: 1px solid lighten($color--white, 100%);
  position: relative;
  opacity: 0;
  transition: all .5s ease;
  &:active {
    top: 1px;
  }
  &.-is-valid {
    opacity: 1;
  }
}

.component-SecondaryCtaMailingList {
  color: lighten($color--white, 100%);
  padding: 20px 0;
  overflow: hidden;
  text-align: center;
}

.description {
  margin-top: 0;
}

.input {
  width: 100%;
  border: none;
  padding: 11px;
  text-align: center;
  background: rgba($color--black, .15);
  color: lighten($color--white, 100%);
  font-size: 1.05rem;
  &:focus::placeholder {
    color: rgba($color--white, .5);
  }
  &::placeholder {
    color: lighten($color--white, 100%);
  }
}

.input-wrapper {
  width: 90%;
  max-width: 400px;
  margin: 0 auto 20px;
}

.title-2 {
  font-size: 3rem;
  margin-top: .25rem;
  margin-bottom: .25rem;
}

.wrapper {
  @include margin-wrapper-main;
  padding-top: 30px;
  padding-bottom: 30px;
  @include tweakpoint('min-width', 575px) {
    padding-top: 40px;
    padding-bottom: 40px;
  }
}
</style>
