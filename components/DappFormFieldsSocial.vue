<template>
  <div>
    <p class="heading">Social media links</p>
    <ul class="list">
      <li class="item">
        <div class="input-wrapper -github">
          <input 
            :value="github" 
            class="input" 
            type="text" 
            placeholder="/githubproject" 
            maxlength="100"
            @input="updateSocial('github', $event.target.value)">
        </div>
      </li>
      <li class="item">
        <div class="input-wrapper -twitter">
          <input 
            :value="twitter" 
            class="input" 
            type="text" 
            placeholder="@twitterhandle" 
            maxlength="100"
            @input="updateSocial('twitter', $event.target.value)">
        </div>
      </li>
      <li
        :class="chatErrors && chatErrors.length > 0 ? '--has-errors' : ''" 
        class="item">
        <div class="input-wrapper -chat">
          <input 
            :value="chat" 
            class="input" 
            type="text" 
            placeholder="chat invitation url" 
            maxlength="100" 
            @input="updateAndValidate('chat', $event.target.value)">
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
      <li class="item">
        <div class="input-wrapper -blog">
          <input 
            :value="blog" 
            class="input" 
            type="text" 
            placeholder="blog.com/@user"
            maxlength="100"
            @input="updateSocial('blog', $event.target.value)">
        </div>
      </li>
      <li class="item">
        <div class="input-wrapper -reddit">
          <input 
            :value="reddit" 
            class="input" 
            type="text" 
            placeholder="/r/reddit" 
            maxlength="100"
            @input="updateSocial('reddit', $event.target.value)">
        </div>
      </li>
      <li class="item">
        <div class="input-wrapper -facebook">
          <input 
            :value="facebook" 
            class="input" 
            type="text" 
            placeholder="/facebookpage" 
            maxlength="100"
            @input="updateSocial('facebook', $event.target.value)">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    blog: {
      type: String,
      required: true
    },
    github: {
      type: String,
      required: true
    },
    facebook: {
      type: String,
      required: true
    },
    reddit: {
      type: String,
      required: true
    },
    chat: {
      type: String,
      required: true
    },
    chatErrors: {
      type: Array,
      required: true
    },
    twitter: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      validationTimer: ''
    }
  },
  methods: {
    updateSocial(field, value) {
      this.$emit('updateSocial', field, value)
    },
    updateAndValidate(field, value) {
      this.$emit('updateSocial', field, value)
      clearTimeout(this.validationTimer)
      const errors = {
        field: 'socialChat',
        data: []
      }
      this.validationTimer = setTimeout(() => {
        this.chat.endsWith('.slack.com')
          ? errors.data.push(
              `Slack invitation url should not contain .slack.com`
            )
          : ''
        this.chat.length > 0 && !this.chat.includes('.')
          ? errors.data.push(`This should be a url`)
          : ''
        this.$emit('updateErrors', errors)
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
  width: 100%;
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
  text-align: left;
  margin: -5px -5px 10px;
}
</style>
