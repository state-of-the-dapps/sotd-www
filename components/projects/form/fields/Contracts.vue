<template>
  <div>
    <p class="heading">Contract addresses</p>
    <ul class="list">
      <li class="item">
        <div class="name">Mainnet</div>
        <div class="input-wrapper" :class="mainnetErrors && mainnetErrors.length > 0 ? '--has-errors' : ''">
          <input class="input" type="text" @input="validate('mainnet')" v-model="mainnet" placeholder="0x..." maxlength="42">
          <ul v-if="mainnetErrors && mainnetErrors.length > 0" class="error-list -contracts">
            <li v-for="(error, index) in mainnetErrors" :key="index" class="error-item">{{ error }}</li>
          </ul>
        </div>
      </li>
      <li class="item">
        <div class="name">Ropsten</div>
        <div class="input-wrapper" :class="ropstenErrors && ropstenErrors.length > 0 ? '--has-errors' : ''">
          <input class="input" type="text" @input="validate('ropsten')" v-model="ropsten" placeholder="0x..." maxlength="42">
          <ul v-if="ropstenErrors && ropstenErrors.length > 0" class="error-list -contracts">
            <li v-for="(error, index) in ropstenErrors" :key="index" class="error-item">{{ error }}</li>
          </ul>
        </div>
      </li>
      <li class="item">
        <div class="name">Kovan</div>
        <div class="input-wrapper" :class="kovanErrors && kovanErrors.length > 0 ? '--has-errors' : ''">
          <input class="input" type="text" @input="validate('kovan')" v-model="kovan" placeholder="0x..." maxlength="42">
          <ul v-if="kovanErrors && kovanErrors.length > 0" class="error-list -contracts">
            <li v-for="(error, index) in kovanErrors" :key="index" class="error-item">{{ error }}</li>
          </ul>
        </div>
      </li>
      <li class="item">
        <div class="name">Rinkeby</div>
        <div class="input-wrapper" :class="rinkebyErrors && rinkebyErrors.length > 0 ? '--has-errors' : ''">
          <input class="input" type="text" @input="validate('rinkeby')" v-model="rinkeby" placeholder="0x..." maxlength="42">
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
            this[field].length !== 42 ? errors.data.push(`Address must be exactly 42 characters`) : ''
            !this[field].startsWith('0x') ? errors.data.push(`Address must start with 0x`) : ''
          }
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
    &.-contracts {
      padding: 10px;
    }
  }

  .heading {
    text-align: center;
    margin-top: 1.25rem;
    margin-bottom: .75rem;
  }

  .input-wrapper {
    &.--has-errors {
      border-color: $color--tart-orange;
    }
  }

  .item {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
  }

  .name {
    width: 75px;
    padding: 8px 10px;
    text-align: right;
  }

  .input-wrapper {
    flex: 1;
    box-shadow: 0 0 20px rgba($color--mine-shaft,.05);
    border: 1px solid transparent;
  }

  input {
    width: 100%;
    padding: 8px 10px;
    border: none;
    background: rgba(lighten($color--gallery, 100%),.9);
  }
</style>
