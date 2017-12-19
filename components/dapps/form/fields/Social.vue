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
      <li class="item">
        <div class="input-wrapper -github">
          <input v-model="github" class="input" type="text" placeholder="/githubproject" maxlength="100">
        </div>
      </li>
      <li class="item">
        <div class="input-wrapper -reddit">
          <input v-model="reddit" class="input" type="text" placeholder="/r/reddit" maxlength="100">
        </div>
      </li>
      <li class="item" :class="slackErrors && slackErrors.length > 0 ? '--has-errors' : ''">
        <div class="input-wrapper -slack">
          <input v-model="slack" class="input" type="text" placeholder="slack invitation url" maxlength="100" @input="validate">
        </div>
        <ul v-if="slackErrors && slackErrors.length > 0" class="error-list -social">
          <li v-for="(error, index) in slackErrors" :key="index" class="error-item -social">{{ error }}</li>
        </ul>
      </li>
      <li class="item">
        <div class="input-wrapper -blog">
          <input v-model="blog" class="input" type="text" placeholder="medium.com/blog" maxlength="100">
        </div>
      </li>
      <li class="item">
        <div class="input-wrapper -other">
          <input v-model="other" class="input" type="text" placeholder="www.othersite.com" maxlength="100">
        </div>
      </li>
      <li class="item">
        <div class="input-wrapper -wiki">
          <input v-model="wiki" class="input" type="text" placeholder="yourwikiurl.com" maxlength="100">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { dispatchErrors } from '~/helpers/mixins'

  var validationTimer

  export default {
    computed: {
      blog: {
        get () {
          return this.$store.getters['dapps/form/socialBlog']
        },
        set (value) {
          const field = {
            name: 'blog',
            value: value
          }
          this.$store.dispatch('dapps/form/setSocial', field)
        }
      },
      github: {
        get () {
          return this.$store.getters['dapps/form/socialGithub']
        },
        set (value) {
          const field = {
            name: 'github',
            value: value
          }
          this.$store.dispatch('dapps/form/setSocial', field)
        }
      },
      facebook: {
        get () {
          return this.$store.getters['dapps/form/socialFacebook']
        },
        set (value) {
          const field = {
            name: 'facebook',
            value: value
          }
          this.$store.dispatch('dapps/form/setSocial', field)
        }
      },
      other: {
        get () {
          return this.$store.getters['dapps/form/socialOther']
        },
        set (value) {
          const field = {
            name: 'other',
            value: value
          }
          this.$store.dispatch('dapps/form/setSocial', field)
        }
      },
      reddit: {
        get () {
          return this.$store.getters['dapps/form/socialReddit']
        },
        set (value) {
          const field = {
            name: 'reddit',
            value: value
          }
          this.$store.dispatch('dapps/form/setSocial', field)
        }
      },
      slack: {
        get () {
          return this.$store.getters['dapps/form/socialSlack']
        },
        set (value) {
          const field = {
            name: 'slack',
            value: value
          }
          this.$store.dispatch('dapps/form/setSocial', field)
        }
      },
      slackErrors () {
        return this.$store.getters['dapps/form/socialSlackErrors']
      },
      twitter: {
        get () {
          return this.$store.getters['dapps/form/socialTwitter']
        },
        set (value) {
          const field = {
            name: 'twitter',
            value: value
          }
          this.$store.dispatch('dapps/form/setSocial', field)
        }
      },
      wiki: {
        get () {
          return this.$store.getters['dapps/form/socialWiki']
        },
        set (value) {
          const field = {
            name: 'wiki',
            value: value
          }
          this.$store.dispatch('dapps/form/setSocial', field)
        }
      }
    },
    methods: {
      validate () {
        clearTimeout(validationTimer)
        const errors = {
          field: 'socialSlack',
          data: []
        }
        validationTimer = setTimeout(() => {
          this.slack.endsWith('.slack.com') ? errors.data.push(`Slack invitation url should not contain .slack.com`) : ''
          this.slack.length > 0 && !this.slack.includes('.') ? errors.data.push(`Slack invitation should be a url`) : ''
          this.dispatchErrors(errors)
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .error-list {
    &.-social {
      padding: 5px 10px;
    }
  }

  .error-item {
    text-align: left;
  }

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
    &.-github:before {
      background: url('~/assets/images/social/github.png') center left no-repeat;
      background-size: 21px 21px;
    }
    &.-slack:before {
      background: url('~/assets/images/social/slack.png') center left no-repeat;
      background-size: 21px 21px;
    }
    &.-reddit:before {
      background: url('~/assets/images/social/reddit.png') center left no-repeat;
      background-size: 21px 21px;
    }
    &.-blog:before {
      background: url('~/assets/images/social/blog.png') center left no-repeat;
      background-size: 21px 21px;
    }
    &.-etherian:before {
      background: url('~/assets/images/social/etherian.png') center left no-repeat;
      background-size: 21px 21px;
    }
    &.-other:before {
      background: url('~/assets/images/social/other2.png') center left no-repeat;
      background-size: 21px 21px;
    }
    &.-wiki:before {
      background: url('~/assets/images/social/wiki.png') center left no-repeat;
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
