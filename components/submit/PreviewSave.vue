<template>
  <div class="wrapper">
    <div class="sticky">
      <div class="item -preview" :class="'-' + status">
          <div class="new-banner" @click="$mixpanel.track('New DApp - Preview new flag')"><span class="new-message" :class="'-' + status">New</span></div>
          <div class="info">
              <div @click="$mixpanel.track('New DApp - Preview icon')" class="icon-wrapper" :class="'-' + status">
                  <p class="icon-placeholder"><span v-if="name">{{ name | firstLetter | capitalize }}</span><span v-else>N</span></p>
              </div>
              <div class="description-wrapper">
                  <h3 class="title" @click="$mixpanel.track('New DApp - Preview title')"><span v-if="name">{{ name | truncate(25) }}</span><span v-else>ÐApp preview</span></h3>
                  <p class="attribution" @click="$mixpanel.track('New DApp - Preview author')">by <strong><span v-if="author">{{ author }}</span><span v-else>Founder</span></strong> {{ additionalAuthors | additionalAuthorsCount }}</p>
                  <p class="description" @click="$mixpanel.track('New DApp - Preview teaser')"><span v-if="teaser">{{ teaser | truncate(75) }}</span><span v-else>Teaser description</span></p>
              </div>
          </div>
          <p class="status" :class="'-' + status" @click="$mixpanel.track('New DApp - Preview status')">{{ status | formatStatus }}</p>
      </div>
      <input type="text" class="yumyum" v-model="honeypot">
      <input v-if="errorFields.length == 1" @click.prevent="$mixpanel.track('New DApp - Submit', { disabled: true })" class="submit" type="submit" :value="'1 field needs your attention'">
      <input v-else-if="errorFields.length > 0 && errorFields.length !== 1" @click.prevent="$mixpanel.track('New DApp - Submit', { disabled: true })" class="submit" type="submit" :value="errorFields.length + ' fields need your attention'">
      <input v-else-if="sending" @click.prevent="$mixpanel.track('New DApp - Submit', { disabled: true })" class="submit" type="submit" :value="'Please wait'">
      <input v-else="errorFields.length == 0" class="submit --is-ready" type="submit" :value="'Submit'" @click.prevent="submit">      
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    computed: {
      author () {
        return this.$store.getters['submit/author']
      },
      additionalAuthors () {
        return this.$store.getters['submit/additionalAuthors']
      },
      errorFields () {
        return this.$store.getters['submit/errorFields']
      },
      name () {
        return this.$store.getters['submit/name']
      },
      status () {
        return this.$store.getters['submit/status']
      },
      teaser () {
        return this.$store.getters['submit/teaser']
      }
    },
    data: () => {
      return {
        sending: false,
        honeypot: null
      }
    },
    methods: {
      submit () {
        if (this.honeypot === null) {
          const obj = {}
          obj.data = this.$store.state.submit.fields
          this.sending = true
          axios.post('/dapps.json', obj)
            .then((response) => {
              this.sending = false
              this.$store.dispatch('submit/reset')
              this.$mixpanel.track('New DApp - Submit', { disabled: false })
              this.$router.replace({ path: '/confirmation' })
            })
            .catch((error) => {
              console.log(error)
              alert('There was an error submitting. Please try again.')
            })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';
  
  .attribution {
    margin: 0;
  }
  
  .badge-item {
    margin-left: 2px;
  }
  
  .badge-list {
    position: absolute;
    display: flex;
    right: 10px;
    top: -2px;
    z-index: 5;
  }
  
  .description {
    margin: 0;
    @include tweakpoint('min-width', 900px) {
      margin-top: 10px;
    }           
  }
  
  .description-wrapper {
    flex: 1;
  }
  
  .icon-image {
    max-width: 100%;
  }
  
  .icon-wrapper {
    width: 60px;
    height: 60px;
    background: rgba(0,0,0,.1);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 50%;
    font-size: 1.95rem;
    margin-right: 10px;
    transition: background .2s ease;
    &.-live {
      background: $color--bright-green;
    }
    &.-demo {
      background: $color--gorse;
    }
    &.-prototype {
      background: $color--koromiko;
    }
    &.-wip {
      background: $color--malibu;
    }
    &.-concept {
      background: $color--portage;
    }
    @include tweakpoint('min-width', 900px) {
      margin-right: 0;
      width: 75px;
      height: 75px;
    }
  }
  
  .info {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    margin-top: -10px;
    @include tweakpoint('min-width', 900px) {
      flex-direction: column;
      justify-content: center;
      text-align: center;
      margin-top: 25px;
    }
  }
  
  .item {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    width: 100%;
    height: 125px;
    margin: 0 10px 10px 10px;
    background: white;
    box-shadow: 0 0 20px rgba($color--mine-shaft,.1);
    transition: background .2s ease, opacity .4s ease;
    @include tweakpoint('min-width', 750px) {
      width: calc(50% - 20px);
    }
    @include tweakpoint('min-width', 900px) {
      width: calc(33.33% - 20px);
      height: 285px;
      justify-content: center;
      align-items: flex-start;
      margin-bottom: 20px;
    }
    @include tweakpoint('min-width', 1000px) {
      width: calc(25% - 20px);
    }
    @include tweakpoint('min-width', 1150px) {
      width: calc(20% - 20px);
    }
    @include tweakpoint('min-width', 1450px) {
      width: calc(16.66667% - 20px);
    }
    @include tweakpoint('min-width', 1750px) {
      width: calc(14.2857142857% - 20px);
    }
    &:hover {
      cursor: pointer;
      transform: scale3d(1.015, 1.015, 1);
    }
    &.-live {
      background: $color--screamin-green;
    }
    &.-demo {
      background: $color--paris-daisy;            
    }
    &.-prototype {
      background: $color--golden-tainoi;            
    }
    &.-wip {
      background: $color--anakiwa;            
    }
    &.-concept {
      background: $color--perfume;            
    }
    &.-stealth {
      background: $color--alabaster; 
    }
    &.-abandoned, &.-unknown {
      background: $color--alabaster;   
      &:after {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(white,.7);
        pointer-events: none;
      }
    }
    &.-preview {
      width: 300px;
      margin: 0 auto;
      @include tweakpoint('min-width', $tweakpoint--default) {
        margin-left: 0;
      }
      &:hover {
        transform: none;
        cursor: default;
      }
    }
    &.--unfocused {
      opacity: .6;
    }
  }
  
  .new-banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 47px;
    height: 47px;
    background: url('/images/ribbon.png') top left no-repeat;
    background-size: 47px 47px;
    margin: 0;
    z-index: 5;
  }
  
  .new-message {
    color: $color--gallery;
    display: inline-block;
    font-size: .7rem;
    text-transform: uppercase;
    margin-top: 6px;
    margin-left: 6px;
    transition: color .2s ease;
    &.-live {
      color: $color--screamin-green;
    }
    &.-demo {
      color: $color--paris-daisy;
    }
    &.-prototype {
      color: $color--golden-tainoi;
    }
    &.-wip {
      color: $color--anakiwa;
    }
    &.-concept {
      color: $color--perfume;
    }
    &.-inactive {
      color: $color--alabaster;
    }
  }
  
  .status {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    border-bottom: 4px solid rgba($color--mine-shaft,.2);
    margin: 0;
    padding: 5px;
    font-size: .8rem;
    text-transform: uppercase;
    font-weight: 700;
    transition: border .2s ease;
    &.-live {
      border-color: $color--bright-green;
    }
    &.-demo {
      border-color: $color--gorse;
    }
    &.-prototype {
      border-color: $color--koromiko;            
    }
    &.-wip {
      border-color: $color--malibu;            
    }
    &.-concept {
      border-color: $color--portage;            
    }
  }
  
  .sticky {
    position: sticky;
    top: 19px;
  }
  
  .submit {
    display: block;
    margin: 0 auto;
    width: 300px;
    margin-top: 15px;
    border: none;
    background: rgba($color--mine-shaft, .1);
    color: $color--mine-shaft;
    font-size: 1rem;
    font-weight: 600;
    padding: 15px;
    position: relative;
    transition: all .5s ease;
    @include tweakpoint('min-width', $tweakpoint--default) {
      margin-left: 0;
      margin-right: 0;
    }
    &.--is-ready {
      background: rgba($color--mine-shaft, 1);
      box-shadow: 0 17px 70px rgba($color--mine-shaft, 0.3);
      color: $color--gallery;
      &:hover {
        cursor: pointer;
      }
      &:active {
        top: 1px;
      }
    }
  }
  
  .title {
    margin: 0;
    font-size: 1.5rem;
    @include tweakpoint('min-width', 900px) {
      margin-top: 15px;
    }
  }
  
  .url {
      width: 300px;
  }
  
  .wrapper {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    margin: 0 auto;
    margin-top: 1px;
    position: relative;
    @include tweakpoint('min-width', $tweakpoint--default) {
      margin-left: 0;
      margin-right: 0;
    }
  }
  
  .yumyum {
    display: none;
  }
</style>
