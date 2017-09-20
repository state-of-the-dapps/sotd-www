<template>
  <div>
    <p class="heading">Social media links</p>
    <ul class="list">
      <li class="item -facebook"><input v-model="facebook" class="input" type="text" placeholder="/facebookpage" maxlength="100"></li>
      <li class="item -twitter"><input v-model="twitter" class="input" type="text" placeholder="@twitterhandle" maxlength="100"></li>
      <li class="item -github"><input v-model="github" class="input" type="text" placeholder="/github/project" maxlength="100"></li>
      <li class="item -reddit"><input v-model="reddit" class="input" type="text" placeholder="/u/reddit" maxlength="100"></li>
      <li class="item -slack"><input v-model="slack" class="input" type="text" placeholder="your.slack.team" maxlength="100"></li>
      <li class="item -blog"><input v-model="blog" class="input" type="text" placeholder="medium.com/blog" maxlength="100"></li>
      <li class="item -other"><input v-model="other" class="input" type="text" placeholder="www.othersite.com" maxlength="100"></li>
      <li class="item -wiki"><input v-model="wiki" class="input" type="text" placeholder="yourwikiurl.com" maxlength="100"></li>
    </ul>
  </div>
</template>

<script>
  export default {
    computed: {
      blog: {
        get () {
          return this.$store.getters['submit/socialBlog']
        },
        set (value) {
          const field = {
            name: 'blog',
            value: value
          }
          this.$store.dispatch('submit/updateSocial', field)
        }
      },
      github: {
        get () {
          return this.$store.getters['submit/socialGithub']
        },
        set (value) {
          const field = {
            name: 'github',
            value: value
          }
          this.$store.dispatch('submit/updateSocial', field)
        }
      },
      facebook: {
        get () {
          return this.$store.getters['submit/socialFacebook']
        },
        set (value) {
          const field = {
            name: 'facebook',
            value: value
          }
          this.$store.dispatch('submit/updateSocial', field)
        }
      },
      other: {
        get () {
          return this.$store.getters['submit/socialOther']
        },
        set (value) {
          const field = {
            name: 'other',
            value: value
          }
          this.$store.dispatch('submit/updateSocial', field)
        }
      },
      reddit: {
        get () {
          return this.$store.getters['submit/socialReddit']
        },
        set (value) {
          const field = {
            name: 'reddit',
            value: value
          }
          this.$store.dispatch('submit/updateSocial', field)
        }
      },
      slack: {
        get () {
          return this.$store.getters['submit/socialSlack']
        },
        set (value) {
          const field = {
            name: 'slack',
            value: value
          }
          this.$store.dispatch('submit/updateSocial', field)
        }
      },
      twitter: {
        get () {
          return this.$store.getters['submit/socialTwitter']
        },
        set (value) {
          const field = {
            name: 'twitter',
            value: value
          }
          this.$store.dispatch('submit/updateSocial', field)
        }
      },
      wiki: {
        get () {
          return this.$store.getters['submit/socialWiki']
        },
        set (value) {
          const field = {
            name: 'wiki',
            value: value
          }
          this.$store.dispatch('submit/updateSocial', field)
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
    background: rgba(lighten($color--gallery, 100%),.9);
    padding: 10px;
    box-shadow: 0 0 20px rgba($color--mine-shaft,.05);
    border: 1px solid transparent;
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
      background: url('~/images/social/facebook.png') center left no-repeat;
      background-size: 21px 21px;
    }
    &.-twitter:before {
      background: url('~/images/social/twitter.png') center left no-repeat;
      background-size: 21px 21px;
    }
    &.-github:before {
      background: url('~/images/social/github.png') center left no-repeat;
      background-size: 21px 21px;
    }
    &.-slack:before {
      background: url('~/images/social/slack.png') center left no-repeat;
      background-size: 21px 21px;
    }
    &.-reddit:before {
      background: url('~/images/social/reddit.png') center left no-repeat;
      background-size: 21px 21px;
    }
    &.-blog:before {
      background: url('~/images/social/blog.png') center left no-repeat;
      background-size: 21px 21px;
    }
    &.-etherian:before {
      background: url('~/images/social/etherian.png') center left no-repeat;
      background-size: 21px 21px;
    }
    &.-other:before {
      background: url('~/images/social/other2.png') center left no-repeat;
      background-size: 21px 21px;
    }
    &.-wiki:before {
      background: url('~/images/social/wiki.png') center left no-repeat;
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
