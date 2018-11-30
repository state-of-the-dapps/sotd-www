<template>
  <div>
    <p class="heading">Social media links</p>
    <ul class="list">
      <li 
        v-if="(isEdit && facebookIsMissing) || !isEdit" 
        class="item">
        <div class="input-wrapper -facebook">
          <input 
            v-model="facebook" 
            class="input" 
            type="text" 
            placeholder="/facebookpage" 
            maxlength="100">
        </div>
      </li>
      <li 
        v-if="(isEdit && twitterIsMissing) || !isEdit" 
        class="item">
        <div class="input-wrapper -twitter">
          <input 
            v-model="twitter" 
            class="input" 
            type="text" 
            placeholder="@twitterhandle" 
            maxlength="100">
        </div>
      </li>
      <li 
        v-if="(isEdit && githubIsMissing) || !isEdit" 
        class="item">
        <div class="input-wrapper -github">
          <input 
            v-model="github" 
            class="input" 
            type="text" 
            placeholder="/githubproject" 
            maxlength="100">
        </div>
      </li>
      <li 
        v-if="(isEdit && redditIsMissing) || !isEdit" 
        class="item">
        <div class="input-wrapper -reddit">
          <input 
            v-model="reddit" 
            class="input" 
            type="text" 
            placeholder="/r/reddit" 
            maxlength="100">
        </div>
      </li>
      <li 
        v-if="(isEdit && chatIsMissing) || !isEdit" 
        :class="chatErrors && chatErrors.length > 0 ? '--has-errors' : ''" 
        class="item">
        <div class="input-wrapper -chat">
          <input 
            v-model="chat" 
            class="input" 
            type="text" 
            placeholder="chat invitation url" 
            maxlength="100" 
            @input="validate">
        </div>
        <ul 
          v-if="chatErrors && chatErrors.length > 0" 
          class="error-list -social">
          <li 
            v-for="(error, index) in chatErrors" 
            :key="index" 
            class="error-item -social">{{ error }}</li>
        </ul>
      </li>
      <li 
        v-if="(isEdit && blogIsMissing) || !isEdit" 
        class="item">
        <div class="input-wrapper -blog">
          <input 
            v-model="blog" 
            class="input" 
            type="text" 
            placeholder="medium.com/blog" 
            maxlength="100">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { dispatchErrors } from '~/helpers/mixins'

var validationTimer

export default {
  mixins: [dispatchErrors],
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    blogIsMissing: {
      type: Boolean,
      default: false
    },
    githubIsMissing: {
      type: Boolean,
      default: false
    },
    facebookIsMissing: {
      type: Boolean,
      default: false
    },
    redditIsMissing: {
      type: Boolean,
      default: false
    },
    chatIsMissing: {
      type: Boolean,
      default: false
    },
    twitterIsMissing: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    blog: {
      get() {
        return this.$store.getters['dapps/form/socialBlog']
      },
      set(value) {
        const field = {
          name: 'blog',
          value: value
        }
        this.$store.dispatch('dapps/form/setSocial', field)
      }
    },
    github: {
      get() {
        return this.$store.getters['dapps/form/socialGithub']
      },
      set(value) {
        const field = {
          name: 'github',
          value: value
        }
        this.$store.dispatch('dapps/form/setSocial', field)
      }
    },
    facebook: {
      get() {
        return this.$store.getters['dapps/form/socialFacebook']
      },
      set(value) {
        const field = {
          name: 'facebook',
          value: value
        }
        this.$store.dispatch('dapps/form/setSocial', field)
      }
    },
    reddit: {
      get() {
        return this.$store.getters['dapps/form/socialReddit']
      },
      set(value) {
        const field = {
          name: 'reddit',
          value: value
        }
        this.$store.dispatch('dapps/form/setSocial', field)
      }
    },
    chat: {
      get() {
        return this.$store.getters['dapps/form/socialChat']
      },
      set(value) {
        const field = {
          name: 'chat',
          value: value
        }
        this.$store.dispatch('dapps/form/setSocial', field)
      }
    },
    chatErrors() {
      return this.$store.getters['dapps/form/socialChatErrors']
    },
    twitter: {
      get() {
        return this.$store.getters['dapps/form/socialTwitter']
      },
      set(value) {
        const field = {
          name: 'twitter',
          value: value
        }
        this.$store.dispatch('dapps/form/setSocial', field)
      }
    }
  },
  methods: {
    validate() {
      clearTimeout(validationTimer)
      const errors = {
        field: 'socialChat',
        data: []
      }
      validationTimer = setTimeout(() => {
        this.chat.endsWith('.slack.com')
          ? errors.data.push(
              `Slack invitation url should not contain .slack.com`
            )
          : ''
        this.chat.length > 0 && !this.chat.includes('.')
          ? errors.data.push(`This should be a url`)
          : ''
        this.dispatchErrors(errors, 'dapps')
      }, 750)
    }
  }
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
  margin-top: 1.25rem !important;
  margin-bottom: 1rem !important;
}

.input {
  background: none;
  border: none;
  padding-left: 28px;
  width: 145px;
  overflow: hidden;
  &::placeholder {
    color: rgba($color--black, 0.5);
  }
  &:focus::placeholder {
    color: rgba($color--black, 0.5);
  }
}

.item {
  width: calc(50% - 10px);
  margin: 5px;
  border: 1px solid transparent;
  &.--has-errors {
    border-color: $color--error;
  }
}

.input-wrapper {
  background: rgba(lighten($color--gray, 100%), 0.9);
  padding: 10px;
  box-shadow: 0 0 20px rgba($color--black, 0.05);
  position: relative;
  &:before {
    content: ' ';
    position: absolute;
    top: 8px;
    left: 10px;
    width: 21px;
    height: 21px;
  }
  &.-facebook:before {
    background: url('~assets/images/social/facebook.png') center left no-repeat;
    background-size: 21px 21px;
  }
  &.-twitter:before {
    background: url('~assets/images/social/twitter.png') center left no-repeat;
    background-size: 21px 21px;
  }
  &.-github:before {
    background: url('~assets/images/social/github.png') center left no-repeat;
    background-size: 21px 21px;
  }
  &.-chat:before {
    background: url('~assets/images/social/chat.png') center left no-repeat;
    background-size: 21px 21px;
  }
  &.-reddit:before {
    background: url('~assets/images/social/reddit.png') center left no-repeat;
    background-size: 21px 21px;
  }
  &.-blog:before {
    background: url('~assets/images/social/blog.png') center left no-repeat;
    background-size: 21px 21px;
  }
  &.-etherian:before {
    background: url('~assets/images/social/etherian.png') center left no-repeat;
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
