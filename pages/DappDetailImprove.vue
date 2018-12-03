<template>
  <LayoutMain>
    <div 
      ref="page" 
      class="page-dapp-detail-improve">
      <div class="hero-wrapper">
        <p style="text-align: center;">
          Head back to <nuxt-link :to="{name: 'dapp-detail', params: {}}">{{ dapp.name }}</nuxt-link>
        </p>
      </div>
      <div v-if="!sent">
        <div>
          <h1 class="title-1">Improve {{ dapp.name }}'s profile</h1>
          <div class="fields">
            <div class="basic-info">
              <h3 class="title-3">Your name <span class="required">required</span></h3>
              <div class="field"><input 
                v-model="suggesterName" 
                class="input-text" 
                placeholder="Enter your name here" 
                type="text"></div>
              <h3 class="title-3">Your email <span class="required">required</span></h3>
              <div class="field"><input 
                v-model="email" 
                class="input-text" 
                placeholder="Enter your email here" 
                type="text" 
                @input="validateEmail"></div>
              <h3 class="title-3 -suggestions">Help improve these missing fields</h3>
            </div>
            <DappEdit
              :suggestions="suggestions"/>
            <button
              :class="formIsValid ? 'is-valid' : ''"
              class="submit"
              @click="submit"><span v-if="formIsValid">Submit</span><span v-else>Enter your name and a valid email address</span></button>
          </div>
        </div>
        <div/>
      </div>
      <div v-else>
        <p class="confirmation">Thanks! We will review your suggestions and be in touch.</p>
      </div>
    </div>
  </LayoutMain>
</template>

<script>
import DappEdit from '~/components/DappEdit'
import LayoutMain from '~/components/LayoutMain'
import { trackDappImproveProfileView } from '~/helpers/mixpanel'
import { validateEmail } from '~/helpers/mixins'

export default {
  components: {
    DappEdit,
    LayoutMain
  },
  mixins: [validateEmail],
  data() {
    return {
      suggesterName: '',
      email: '',
      emailIsValid: false,
      suggestions: [],
      sent: false
    }
  },
  computed: {
    userEntryRoute() {
      return this.$store.getters['userEntryRoute']
    },
    suggesterEmail() {
      return this.email
    },
    formIsValid() {
      return this.emailIsValid && this.suggesterName.length && this.email.length
    },
    fields() {
      return this.$store.getters['dapps/form/fields']
    }
  },
  asyncData({ store, params, error, app }) {
    return app.$axios.get('dapps/' + params.slug).then(response => {
      const data = response.data
      const dapp = data.item
      if (!Object.keys(dapp).length > 0) {
        error({ statusCode: 404 })
      }
      return {
        dapp
      }
    })
  },
  mounted() {
    this.$axios.get(`dapps/${this.dapp.slug}/suggestions`).then(response => {
      const profile = response.data
      const suggestions = profile.suggestions
      this.suggestions = suggestions
    })
    const action = trackDappImproveProfileView(this.dapp.slug)
    this.$mixpanel.track(action.name, action.data)
  },
  methods: {
    submit() {
      if (this.formIsValid) {
        const data = {
          fields: this.fields
        }
        if (typeof Intercom !== 'undefined') {
          data.visitorId = Intercom('getVisitorId')
        }
        data.fields.dapp = this.dapp.name
        data.fields.slug = this.dapp.slug
        data.fields.suggesterName = this.suggesterName
        data.fields.suggesterEmail = this.suggesterEmail
        data.fields.platform = ''
        this.sent = true
        this.$refs.page.scrollIntoView()
        this.$axios
          .post(`dapps/${this.dapp.slug}/suggestions`, data)
          .then(response => {
            this.$mixpanel.track('Improve DApp - Submit', {
              slug: this.dapp.slug
            })
            this.$mixpanel.setUser({
              $email: this.suggesterEmail,
              $name: this.suggesterName,
              hasWeb3: typeof web3 !== 'undefined',
              lastUpdated: new Date().toISOString(),
              lastSessionEntryRoute: this.userEntryRoute
            })
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.hero-wrapper {
  padding: 2rem 0 0 0;
}

.basic-info {
  max-width: 378px;
  margin: 0 auto;
  padding-top: 5px;
}

.required {
  color: $color--required;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  position: relative;
  top: -5px;
}

.input-text {
  @include form-input-text;
  display: block;
  background: lighten($color--white, 100%);
  text-align: left;
  padding: 10px;
  max-width: 300px;
  margin-left: 0;
  margin-right: 0;
}

.page-dapp-detail-improve {
  margin: 0 auto;
  max-width: 500px;
  padding: 20px 0;
}

.title-1 {
  font-size: 3rem;
  text-transform: initial;
  margin: 0;
}

.title-3 {
  @include title-3;
  text-align: left;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  &.-suggestions {
    margin-bottom: 0;
    padding-bottom: 0;
  }
}

.fields {
  border-radius: 4px;
  background: darken($color--gray, 4%);
  padding: 10px 20px;
  margin-top: 20px;
}

.field {
  text-align: left;
}

.confirmation {
  font-size: 1.2rem;
  text-align: center;
  padding-bottom: 15px;
}

.cancel {
  border-radius: 3px;
  padding: 7px 12px;
  text-transform: uppercase;
  text-decoration: underline;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 auto;
  display: block;
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
  font-size: 0.95rem;
}

.score {
  display: block;
  height: 100%;
  background: $color--black;
}

.title-1 {
  text-align: center;
}

.submit {
  opacity: 0.3;
  background: $color--black;
  color: $color--white;
  margin: 0 auto;
  display: block;
  width: 300px;
  margin-bottom: 15px;
  padding: 10px;
  position: relative;
  cursor: not-allowed;
  &:active {
    top: 1px;
  }
  &.is-valid {
    opacity: 1;
    cursor: pointer;
  }
}
</style>
