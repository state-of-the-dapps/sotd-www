<template>
  <div class="wrapper">
    <div class="sticky">
      <div class="item -preview" :class="'-' + status">
        <div class="info">
          <div class="wrapper -dates">
            <div @click="$mixpanel.track('New event - Preview date', { detail: true })" class="wrapper -date --start">
              <div class="month-year -date">Dec 2018</div>
              <div class="day -date">21</div>
            </div>
            <div class="wrapper -date --to">to</div>
            <div @click="$mixpanel.track('New event - Preview date', { detail: true })" class="wrapper -date --end">
              <div class="month-year -date">Dec 2018</div> 
              <div class="day -date">31</div>         
            </div>
          </div>
          <div class="description-wrapper">
              <h3 class="title" @click="$mixpanel.track('New event - Preview title')"><span v-if="name">{{ name | truncate(25) }}</span><span v-else>Event name</span></h3>
              <p class="attribution" @click="$mixpanel.track('New event - Preview organizer')">by <strong><span v-if="authors.length > 0">{{ organizer }}</span><span v-else>the organizer</span></strong><span v-if="authors.length > 1"> +{{ authors.length - 1 }}</span></p>
              <p class="description" @click="$mixpanel.track('New event - Preview teaser')"><span v-if="teaser">{{ teaser | truncate(75) }}</span><span v-else>Teaser description</span></p>
          </div>
        </div>
      </div>
      <div class="checkboxes">
        <div class="checkbox-field">
          <input class="checkbox-input" type="checkbox" id="subscribe-newsletter-checkbox" v-model="subscribeNewsletter">
          <label class="checkbox-label" for="subscribe-newsletter-checkbox">Email me (very occasional) updates</label>
        </div>
        <div class="checkbox-field">
          <input class="checkbox-input" type="checkbox" id="join-slack-checkbox" v-model="joinSlack">
          <label class="checkbox-label" for="join-slack-checkbox">Invite me to the SoTÐ slack community</label>
        </div>
        <div class="checkbox-field">
          <input class="checkbox-input" type="checkbox" id="accepted-terms-checkbox" v-model="acceptedTerms">
          <label class="checkbox-label" for="accepted-terms-checkbox">I accept the&nbsp;<nuxt-link @click.native="$mixpanel.track('New DApp - Terms of Service')" to="/terms">Terms of Service</nuxt-link>&nbsp;<span class="required">(required)</span></label>
        </div>
      </div>
      <input type="text" class="yumyum" v-model="honeypot">
      <input v-if="errorFields.length == 1" @click.prevent="$mixpanel.track('New DApp - Submit', { disabled: true })" class="submit" type="submit" :value="'1 field needs your attention'">
      <input v-else-if="errorFields.length > 0 && errorFields.length !== 1" @click.prevent="$mixpanel.track('New DApp - Submit', { disabled: true })" class="submit" type="submit" :value="errorFields.length + ' fields need your attention'">
      <input v-else-if="sending" @click.prevent="$mixpanel.track('New DApp - Submit', { disabled: true })" class="submit" type="submit" :value="'Please wait'">
      <input v-else-if="errorFields.length == 0" class="submit --is-ready" type="submit" :value="'Submit'" @click.prevent="submit">
    </div>
  </div>
</template>

<script>
  import axios from '~/helpers/axios'

  export default {
    computed: {
      organizer () {
        return this.$store.getters['events/form/organizer']
      },
      errorFields () {
        return this.$store.getters['events/form/errorFields']
      },
      fields () {
        return this.$store.getters['events/form/fields']
      },
      dates () {
        return this.$store.getters['events/form/name']
      },
      subscribeNewsletter: {
        get () {
          return this.$store.getters['events/form/subscribeNewsletter']
        },
        set () {
          this.$store.dispatch('events/form/toggleCheckbox', 'subscribeNewsletter')
        }
      },
      joinSlack: {
        get () {
          return this.$store.getters['events/form/joinSlack']
        },
        set () {
          this.$store.dispatch('events/form/toggleCheckbox', 'joinSlack')
        }
      },
      teaser () {
        return this.$store.getters['events/form/teaser']
      },
      acceptedTerms: {
        get () {
          return this.$store.getters['events/form/acceptedTerms']
        },
        set () {
          this.$store.dispatch('events/form/toggleCheckbox', 'acceptedTerms')
          if (this.acceptedTerms === false) {
            this.$store.dispatch('events/form/addErrorField', 'acceptedTerms')
          } else {
            this.$store.dispatch('events/form/removeErrorField', 'acceptedTerms')
          }
        }
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
          const data = {
            payload: {
              fields: this.fields
            }
          }
          this.sending = true
          axios.post('events', data)
            .then((response) => {
              this.sending = false
              this.$store.dispatch('events/form/resetForm')
              this.$mixpanel.track('New event - Submit', {
                disabled: false,
                name: this.fields.name,
                email: this.fields.email,
                author: this.fields.author,
                joinSlack: this.fields.joinSlack,
                subscribeNewsletter: this.fields.subscribeNewsletter
              })
              this.$router.replace({ name: 'events-new-confirmation' })
            })
            .catch((error) => {
              alert(error.response.data.message)
              this.sending = false
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
    z-index: 8;
  }

  .checkboxes {
    margin: 12px auto 0;
    width: 300px;
    @include tweakpoint('min-width', 900px) {
      margin-left: 0;
    }
  }

  .checkbox-field {
    margin-top: 9px;
    display: flex;
  }

  .checkbox-input {
    display: none;
    position: relative;
    &:checked + .checkbox-label:after {
      transform: scale(1);
    }
  }

  .checkbox-label {
    padding-left: 22px;
    position: relative;
    display: flex;
    &:before {
      cursor: pointer;
      content: '';
      display: block;
      width: 13px;
      height: 13px;
      border: 1px solid $color--mine-shaft;
      position: absolute;
      top: 1px;
      left: 0;
    }
    &:after {
      cursor: pointer;
      content: '';
      display: block;
      background: $color--mine-shaft;
      transition: transform .1s ease;
      transform: scale(0);
      width: 9px;
      height: 9px;
      position: absolute;
      top: 3px;
      left: 2px;
    }
  }

  .-dates {
    &.wrapper {
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .-date {
    &.day {
      display: flex;
      width: 100%;
      height: 30px;
      justify-content: center;
      align-items: center;
      @include tweakpoint('min-width', $tweakpoint--default) {
        height: 55px;
      }
    }
    &.wrapper {
      padding: 0;
      width: 50px;
      height: 50px;
      background: $color--gallery;
      overflow: hidden;
      font-size: 1.25rem;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      @include tweakpoint('min-width', $tweakpoint--default) {
        width: 75px;
        height: 75px;
        font-size: 1.5rem;
      }
      &.--to {
        background: none;
        font-size: .9rem;
        width: 30px;
        flex-direction: row;
        justify-content: center;
        padding-top: 18px;
        @include tweakpoint('min-width', $tweakpoint--default) {
          font-size: 1.1rem;
        }        
      }
    }
    &.month-year {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 20px;
      width: 100%;
      font-size: .75rem;
      font-weight: 600;
      background: darken($color--gallery, 10%);
      text-transform: uppercase;
      @include tweakpoint('min-width', $tweakpoint--default) {
        font-size: .9rem;
      }
    }
  }

  .description {
    margin: 0;
    @include tweakpoint('min-width', 900px) {
      margin-top: 10px;
    }
  }

  .description-wrapper {
    flex-grow: 1;
  }

  .icon-image {
    max-width: 100%;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 20px;
    margin-top: -10px;
    @include tweakpoint('min-width', 900px) {
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
      height: 240px;
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
    &.-beta {
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

  .required {
    display: inline-block;
    padding-left: 2px;
    color: $color--tart-orange;
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
