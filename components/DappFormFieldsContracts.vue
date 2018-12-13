<template>
  <div>
    <div v-if="isEdit">
      <ul class="list">
        <li 
          v-if="ethIsMissing" 
          class="item">
          <div class="name">Ethereum Mainnet Contracts</div>
          <div 
            :class="mainnetErrors && mainnetErrors.length > 0 ? '--has-errors' : ''" 
            class="input-wrapper">
            <textarea 
              :value="mainnet" 
              class="input" 
              placeholder="Enter addresses (one per line)" 
              maxlength="11000" 
              @input="updateAndValidate('mainnet', $event.target.value)"/>
            <ul 
              v-if="mainnetErrors && mainnetErrors.length > 0" 
              class="error-list -contracts">
              <li 
                v-for="(error, index) in mainnetErrors" 
                :key="index" 
                class="error-item">{{ error }}</li>
            </ul>
          </div>
        </li>
        <li 
          v-if="poaIsMissing" 
          class="item">
          <div class="name">POA Mainnet Contracts</div>
          <div 
            :class="poaMainnetErrors && poaMainnetErrors.length > 0 ? '--has-errors' : ''" 
            class="input-wrapper">
            <textarea 
              :value="poaMainnet" 
              class="input" 
              placeholder="Enter POA addresses (one per line)" 
              maxlength="11000" 
              @input="updateAndValidate('poaMainnet', $event.target.value)"/>
            <ul 
              v-if="poaMainnetErrors && poaMainnetErrors.length > 0" 
              class="error-list -contracts">
              <li 
                v-for="(error, index) in poaMainnetErrors" 
                :key="index" 
                class="error-item">{{ error }}</li>
            </ul>
          </div>
        </li>
        <li 
          v-if="eosIsMissing" 
          class="item">
          <div class="name">EOS Mainnet Contracts</div>
          <div 
            :class="eosMainnetErrors && eosMainnetErrors.length > 0 ? '--has-errors' : ''" 
            class="input-wrapper">
            <textarea 
              :value="eosMainnet" 
              class="input" 
              placeholder="Enter EOS accounts (one per line)" 
              maxlength="11000" 
              @input="updateAndValidate('eosMainnet', $event.target.value)"/>
            <ul 
              v-if="eosMainnetErrors && eosMainnetErrors.length > 0" 
              class="error-list -contracts">
              <li 
                v-for="(error, index) in eosMainnetErrors" 
                :key="index" 
                class="error-item">{{ error }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="!isEdit">
      <p class="heading">{{ platform }} contract <span v-if="platform === 'EOS'">accounts</span><span v-else>addresses</span></p>
      <ul 
        v-if="platform === 'Ethereum'" 
        class="list">
        <li class="item">
          <div class="name">Mainnet</div>
          <div 
            :class="mainnetErrors && mainnetErrors.length > 0 ? '--has-errors' : ''" 
            class="input-wrapper">
            <textarea 
              :value="mainnet" 
              class="input"
              placeholder="Enter addresses (one per line)" 
              maxlength="11000" 
              @input="updateAndValidate('mainnet', $event.target.value)"/>
            <ul 
              v-if="mainnetErrors && mainnetErrors.length > 0" 
              class="error-list -contracts">
              <li 
                v-for="(error, index) in mainnetErrors" 
                :key="index" 
                class="error-item">{{ error }}</li>
            </ul>
          </div>
        </li>
        <li class="item">
          <div class="name">Ropsten</div>
          <div 
            :class="ropstenErrors && ropstenErrors.length > 0 ? '--has-errors' : ''" 
            class="input-wrapper">
            <textarea 
              :value="ropsten" 
              class="input" 
              placeholder="Enter addresses (one per line)" 
              maxlength="11000" 
              @input="updateAndValidate('ropsten', $event.target.value)"/>
            <ul 
              v-if="ropstenErrors && ropstenErrors.length > 0" 
              class="error-list -contracts">
              <li 
                v-for="(error, index) in ropstenErrors" 
                :key="index" 
                class="error-item">{{ error }}</li>
            </ul>
          </div>
        </li>
        <li class="item">
          <div class="name">Kovan</div>
          <div 
            :class="kovanErrors && kovanErrors.length > 0 ? '--has-errors' : ''" 
            class="input-wrapper">
            <textarea 
              :value="kovan" 
              class="input" 
              placeholder="Enter addresses (one per line)" 
              maxlength="11000" 
              @input="updateAndValidate('kovan', $event.target.value)"/>
            <ul 
              v-if="kovanErrors && kovanErrors.length > 0" 
              class="error-list -contracts">
              <li 
                v-for="(error, index) in kovanErrors" 
                :key="index" 
                class="error-item">{{ error }}</li>
            </ul>
          </div>
        </li>
        <li class="item">
          <div class="name">Rinkeby</div>
          <div 
            :class="rinkebyErrors && rinkebyErrors.length > 0 ? '--has-errors' : ''" 
            class="input-wrapper">
            <textarea 
              :value="rinkeby" 
              class="input" 
              placeholder="Enter addresses (one per line)" 
              maxlength="11000" 
              @input="updateAndValidate('rinkeby', $event.target.value)"/>
            <ul 
              v-if="rinkebyErrors && rinkebyErrors.length > 0" 
              class="error-list -contracts">
              <li 
                v-for="(error, index) in rinkebyErrors" 
                :key="index" 
                class="error-item">{{ error }}</li>
            </ul>
          </div>
        </li>
      </ul>
      <ul 
        v-if="platform === 'POA'" 
        class="list">
        <li class="item">
          <div class="name">Mainnet</div>
          <div 
            :class="poaMainnetErrors && poaMainnetErrors.length > 0 ? '--has-errors' : ''" 
            class="input-wrapper">
            <textarea 
              :value="poaMainnet" 
              class="input" 
              placeholder="Enter POA addresses (one per line)" 
              maxlength="11000" 
              @input="updateAndValidate('poaMainnet', $event.target.value)"/>
            <ul 
              v-if="poaMainnetErrors && poaMainnetErrors.length > 0" 
              class="error-list -contracts">
              <li 
                v-for="(error, index) in poaMainnetErrors" 
                :key="index" 
                class="error-item">{{ error }}</li>
            </ul>
          </div>
        </li>
        <li class="item">
          <div class="name">Sokol Testnet</div>
          <div 
            :class="poaTestnetErrors && poaTestnetErrors.length > 0 ? '--has-errors' : ''" 
            class="input-wrapper">
            <textarea 
              :value="poaTestnet" 
              class="input" 
              placeholder="Enter POA addresses (one per line)" 
              maxlength="11000" 
              @input="updateAndValidate('poaTestnet', $event.target.value)"/>
            <ul 
              v-if="poaTestnetErrors && poaTestnetErrors.length > 0" 
              class="error-list -contracts">
              <li 
                v-for="(error, index) in poaTestnetErrors" 
                :key="index" 
                class="error-item">{{ error }}</li>
            </ul>
          </div>
        </li>
      </ul>
      <ul 
        v-if="platform === 'EOS'" 
        class="list">
        <li class="item">
          <div class="name">Mainnet</div>
          <div 
            :class="eosMainnetErrors && eosMainnetErrors.length > 0 ? '--has-errors' : ''" 
            class="input-wrapper">
            <textarea 
              :value="eosMainnet" 
              class="input" 
              placeholder="Enter EOS accounts (one per line)" 
              maxlength="11000" 
              @input="updateAndValidate('eosMainnet', $event.target.value)"/>
            <ul 
              v-if="eosMainnetErrors && eosMainnetErrors.length > 0" 
              class="error-list -contracts">
              <li 
                v-for="(error, index) in eosMainnetErrors" 
                :key="index" 
                class="error-item">{{ error }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    platform: {
      type: String,
      required: true
    },
    contracts: {
      type: Object,
      required: true
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    ethIsMissing: {
      type: Boolean,
      default: false
    },
    poaIsMissing: {
      type: Boolean,
      default: false
    },
    eosIsMissing: {
      type: Boolean,
      default: false
    },
    mainnet: {
      type: String,
      required: true
    },
    mainnetErrors: {
      type: Array,
      required: true
    },
    ropsten: {
      type: String,
      required: true
    },
    ropstenErrors: {
      type: Array,
      required: true
    },
    kovan: {
      type: String,
      required: true
    },
    kovanErrors: {
      type: Array,
      required: true
    },
    rinkeby: {
      type: String,
      required: true
    },
    rinkebyErrors: {
      type: Array,
      required: true
    },
    poaMainnet: {
      type: String,
      required: true
    },
    poaMainnetErrors: {
      type: Array,
      required: true
    },
    poaTestnet: {
      type: String,
      required: true
    },
    poaTestnetErrors: {
      type: Array,
      required: true
    },
    eosMainnet: {
      type: String,
      required: true
    },
    eosMainnetErrors: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      validationTimer: ''
    }
  },
  methods: {
    updateAndValidate(network, value) {
      this.$emit('updateContract', network, value)
      const field = network
      clearTimeout(this.validationTimer)
      const errors = {
        field: field,
        data: []
      }
      this.validationTimer = setTimeout(() => {
        if (this[field].length > 0) {
          let contractArray = this[field].split('\n')
          let contractErrors = []
          contractArray.forEach(function(element) {
            if (element.length > 0) {
              if (network.startsWith(`eos`)) {
                !element.match(
                  /(^[a-z1-5.]{1,11}[a-z1-5]$)|(^[a-z1-5.]{12}[a-j1-5]$)/
                )
                  ? contractErrors.push(`Account name invalid`)
                  : ''
              } else {
                element.length !== 42
                  ? contractErrors.push(`Address must be exactly 42 characters`)
                  : ''
                !element.startsWith('0x')
                  ? contractErrors.push(`Address must start with 0x`)
                  : ''
              }
            }
          })
          if (contractErrors.length > 0) {
            errors.data.push(
              `One or more of your contract addresses are invalid`
            )
          }
        }
        this.$emit('updateErrors', errors)
      }, 750)
    }
  }
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
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
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
  flex-grow: 1;
  box-shadow: 0 0 20px rgba($color--black, 0.05);
  border: 1px solid transparent;
  background: rgba(lighten($color--gray, 100%), 0.9);
}

.input {
  @include font-monospace;
  display: block;
  resize: none;
  min-height: 75px;
  width: 100%;
  padding: 10px 20px;
  border: none;
}
</style>