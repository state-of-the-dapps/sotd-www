<template>
  <div>
    <p class="heading">Social media links</p>
    <ul class="list">
      <li class="item">
        <div class="input-wrapper -facebook">
          <input v-model="facebook" class="input" type="text" placeholder="/facebookpage" maxlength="100">
        </div>
      </li>
      <li class="item">
        <div class="input-wrapper -twitter">
          <input v-model="twitter" class="input" type="text" placeholder="@twitterhandle" maxlength="100">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    computed: {
      facebook: {
        get () {
          return this.$store.getters['events/form/socialFacebook']
        },
        set (value) {
          const field = {
            name: 'facebook',
            value: value
          }
          this.$store.dispatch('events/form/setSocial', field)
        }
      },
      twitter: {
        get () {
          return this.$store.getters['events/form/socialTwitter']
        },
        set (value) {
          const field = {
            name: 'twitter',
            value: value
          }
          this.$store.dispatch('events/form/setSocial', field)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .heading {
    text-align: center;
    margin-top: 1.25rem;
    margin-bottom: .75rem;
  }

  .input {
    background: none;
    border: none;
    padding-left: 28px;
    width: 145px;
    overflow: hidden;
    &::placeholder {
        color: rgba($color--mine-shaft, .5);
    }
    &:focus::placeholder {
        color: rgba($color--mine-shaft,.5);
    }
  }

  .item {
    width: calc(50% - 10px);
    margin: 5px;
    border: 1px solid transparent;
    &.--has-errors {
      border-color: $color--tart-orange;
    }
  }

  .input-wrapper {
    background: rgba(lighten($color--gallery, 100%),.9);
    padding: 10px;
    box-shadow: 0 0 20px rgba($color--mine-shaft,.05);
    position: relative;
    &:before {
      content: " ";
      position: absolute;
      top: 8px;
      left: 10px;
      width: 21px;
      height: 21px;
    }
    &.-facebook:before {
      background: url('~/assets/images/social/facebook.png') center left no-repeat;
      background-size: 21px 21px;
    }
    &.-twitter:before {
      background: url('~/assets/images/social/twitter.png') center left no-repeat;
      background-size: 21px 21px;
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    margin: -5px -5px 10px;
  }
</style>
