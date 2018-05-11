<template>
  <div class="page-promote">
    <div class="wrapper">
      <h1 class="title-1">Promote your ÐApp</h1>
      <p class="description">Show off your amazing decentralized application to thousands of crypto investors, thought leaders, blockchain innovators, and technologists.
</p>
      <h2 class="title-2">Get started now!</h2>
      <div class="fields">
        <div><input class="input" v-model="name" type="text" placeholder="Your name"></div>
        <div><input class="input" v-model="email" @input="validateEmail" type="text" placeholder="Your email"></div>   
        <div><input class="input" v-model="dapp" type="text" placeholder="Your ÐApp's name"></div>  
        <div class="submitted-wrapper">
          Have you already submitted your ÐApp on this website?
          <p>
            <button class="selection" @click="selectSubmittedDapp('yes')">Yes</button>
            <button class="selection" @click="selectSubmittedDapp('no')">No</button>
          </p>
        </div>
      </div>
      <div class="send-wrapper"><button class="send" @click="send">Send</button></div>
    </div>
  </div>
</template>

<script>
import axios from '~/helpers/axios'
import { validateEmail } from '~/helpers/mixins'

export default {
  data () {
    return {
      email: '',
      dapp: '',
      name: '',
      hasSubmittedDapp: '',
      isValidEmail: false,
      isValidForm: false
    }
  },
  methods: {
    selectSubmittedDapp (selection) {
      this.hasSubmittedDapp = selection
    },
    send () {
      const data = {
        fields: {
          email: this.email,
          dapp: this.dapp,
          name: this.name,
          hasSubmittedDapp: this.hasSubmittedDapp
        }
      }
      axios.post('promoted/dapps', data)
        .then((response) => {
          this.store.dispatch()
        })
    }
  },
  mixins: [validateEmail],
  mounted () {
    this.$store.dispatch('setSiteSection', 'dapps')
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.description {
  text-align: center;
  font-size: 1.2rem;
  max-width: 500px;
  margin: 0 auto;
}

.fields {
  max-width: 300px;
  margin: 40px auto 30px;
}

.input {
  border: none;
  background: rgba($color--white,.9);
  width: 100%;
  padding: 10px 5px;
  margin-bottom: 8px;
}

.selection {
  display: inline-block;
  padding: 5px 10px;
  margin: 0 2px;
  background: rgba($color--white,.9);
  width: 45px;
  text-align: center;
}

.send {
  background: $color--black;
  color: $color--white;
  text-transform: uppercase;
  font-size: .9rem;
  padding: 12px 75px;
}

.send-wrapper {
  text-align: center;
}

.submitted-wrapper {
  padding-top: 15px;
}

.title-1 {
  font-size: 3rem;
  text-transform: initial;
  text-align: center;
  margin-bottom: .75rem;
}

.title-2 {
  font-size: 2.5rem;
  text-transform: initial;
  text-align: center;
  margin-bottom: .75rem;
}

.wrapper {
  @include margin-wrapper-main;
  position: relative;
  padding-top: 25px;
  padding-bottom: 25px;
}
</style>

