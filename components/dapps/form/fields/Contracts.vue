<template>
  <div>
    <p class="heading">Contract addresses</p>
    <ul class="list">
      <li class="item">
        <div class="name">Mainnet</div>
        <div class="input-wrapper" :class="mainnetErrors && mainnetErrors.length > 0 ? '--has-errors' : ''">
          <textarea class="input" @input="validate('mainnet')" v-model="mainnet" placeholder="Enter addresses (one per line)" maxlength="11000"/>
          <ul v-if="mainnetErrors && mainnetErrors.length > 0" class="error-list -contracts">
            <li v-for="(error, index) in mainnetErrors" :key="index" class="error-item">{{ error }}</li>
          </ul>
        </div>
      </li>
      <li class="item">
        <div class="name">Ropsten</div>
        <div class="input-wrapper" :class="ropstenErrors && ropstenErrors.length > 0 ? '--has-errors' : ''">
          <textarea class="input" @input="validate('ropsten')" v-model="ropsten" placeholder="Enter addresses (one per line)" maxlength="11000"/>
          <ul v-if="ropstenErrors && ropstenErrors.length > 0" class="error-list -contracts">
            <li v-for="(error, index) in ropstenErrors" :key="index" class="error-item">{{ error }}</li>
          </ul>
        </div>
      </li>
      <li class="item">
        <div class="name">Kovan</div>
        <div class="input-wrapper" :class="kovanErrors && kovanErrors.length > 0 ? '--has-errors' : ''">
          <textarea class="input" @input="validate('kovan')" v-model="kovan" placeholder="Enter addresses (one per line)" maxlength="11000"/>
          <ul v-if="kovanErrors && kovanErrors.length > 0" class="error-list -contracts">
            <li v-for="(error, index) in kovanErrors" :key="index" class="error-item">{{ error }}</li>
          </ul>
        </div>
      </li>
      <li class="item">
        <div class="name">Rinkeby</div>
        <div class="input-wrapper" :class="rinkebyErrors && rinkebyErrors.length > 0 ? '--has-errors' : ''">
          <textarea class="input" @input="validate('rinkeby')" v-model="rinkeby" placeholder="Enter addresses (one per line)" maxlength="11000"/>
          <ul v-if="rinkebyErrors && rinkebyErrors.length > 0" class="error-list -contracts">
            <li v-for="(error, index) in rinkebyErrors" :key="index" class="error-item">{{ error }}</li>
          </ul>
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
      contracts () {
        return this.$store.getters['dapps/form/contracts']
      },
      mainnet: {
        get () {
          return this.$store.getters['dapps/form/contracts'].mainnet.address
        },
        set (value) {
          const field = {
            name: 'mainnet',
            value: value
          }
          this.$store.dispatch('dapps/form/setContract', field)
        }
      },
      mainnetErrors () {
        return this.$store.getters['dapps/form/mainnetErrors']
      },
      ropsten: {
        get () {
          return this.$store.getters['dapps/form/contracts'].ropsten.address
        },
        set (value) {
          const field = {
            name: 'ropsten',
            value: value
          }
          this.$store.dispatch('dapps/form/setContract', field)
        }
      },
      ropstenErrors () {
        return this.$store.getters['dapps/form/ropstenErrors']
      },
      kovan: {
        get () {
          return this.$store.getters['dapps/form/contracts'].kovan.address
        },
        set (value) {
          const field = {
            name: 'kovan',
            value: value
          }
          this.$store.dispatch('dapps/form/setContract', field)
        }
      },
      kovanErrors () {
        return this.$store.getters['dapps/form/kovanErrors']
      },
      rinkeby: {
        get () {
          return this.$store.getters['dapps/form/contracts'].rinkeby.address
        },
        set (value) {
          const field = {
            name: 'rinkeby',
            value: value
          }
          this.$store.dispatch('dapps/form/setContract', field)
        }
      },
      rinkebyErrors () {
        return this.$store.getters['dapps/form/rinkebyErrors']
      }
    },
    methods: {
      validate (network) {
        const field = network
        clearTimeout(validationTimer)
        const errors = {
          field: field,
          data: []
        }
        validationTimer = setTimeout(() => {
          if (this[field].length > 0) {
            this[field].length > 11000 ? errors.data.push(`No more than 20 addresses are allowed`) : ''
          }
          this.dispatchErrors(errors, 'dapps')
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .error-list {
    &.-contracts {
      padding: 10px;
    }
  }

  .heading {
    text-align: center;
    margin-top: 1.5rem;
    margin-bottom: .5rem;
  }

  .input-wrapper {
    &.--has-errors {
      border-color: $color--error;
    }
  }

  .item {
    margin-bottom: 5px;
  }

  .name {
    padding: 8px 0 8px 20px;
  }

  .input-wrapper {
    padding: 10px 0;
    flex-grow: 1;
    box-shadow: 0 0 20px rgba($color--black,.05);
    border: 1px solid transparent;
    background: rgba(lighten($color--gray, 100%),.9);
  }

  .input {
    @include font-monospace;
    display: block;
    resize: none;
    min-height: 75px;
    width: 100%;
    padding: 0 20px;
    border: none;
  }
</style>
