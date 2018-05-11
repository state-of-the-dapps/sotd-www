<template>
  <div class="page-promote">
      <h1 class="title-1">Promote your ÐApp</h1>
      <p>Description</p>
      <div>Name: <input v-model="name" type="text"></div>
      <div>Email: <input v-model="email" @input="validateEmail" type="text"></div>   
      <div>DApp name: <input v-model="dapp" type="text"></div>  
      <div>
        Have you already submitted your ÐApp to this website?
        <button @click="selectSubmittedDapp('yes')">Yes</button>
        <button @click="selectSubmittedDapp('no')">No</button>
      </div>
      <div><button @click="send">Send</button></div>
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
  mixins: [validateEmail]
}
</script>

<style lang="scss" scoped>

</style>

