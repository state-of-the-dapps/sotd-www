<template>
  <div>
    <div>
      <ul class="list">
        <li class="item">
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
        <li class="item">
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
        <li class="item">
          <div class="name">GoChain Mainnet Contracts</div>
          <div 
            :class="goChainMainnetErrors && goChainMainnetErrors.length > 0 ? '--has-errors' : ''" 
            class="input-wrapper">
            <textarea 
              :value="goChainMainnet" 
              class="input" 
              placeholder="Enter GoChain addresses (one per line)" 
              maxlength="11000" 
              @input="updateAndValidate('goChainMainnet', $event.target.value)"/>
            <ul 
              v-if="goChainMainnetErrors && goChainMainnetErrors.length > 0" 
              class="error-list -contracts">
              <li 
                v-for="(error, index) in goChainMainnetErrors" 
                :key="index" 
                class="error-item">{{ error }}</li>
            </ul>
          </div>
        </li>
        <li class="item">
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
        <li class="item">
          <div class="name">Steem Mainnet Contracts</div>
          <div
            :class="steemMainnetErrors && steemMainnetErrors.length > 0 ? '--has-errors' : ''"
            class="input-wrapper">
            <textarea
              :value="steemMainnet"
              class="input"
              placeholder="Enter Steem accounts (one per line)"
              maxlength="11000"
              @input="updateAndValidate('steemMainnet', $event.target.value)"/>
            <ul
              v-if="steemMainnetErrors && steemMainnetErrors.length > 0"
              class="error-list -contracts">
              <li
                v-for="(error, index) in steemMainnetErrors"
                :key="index"
                class="error-item">{{ error }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <p class="heading"><span class="checkmark"><IconCheckmark :fill="isComplete ? 'purple' : 'gray'"/></span><span>{{ platform }} contract <template v-if="platform === 'EOS' || platform === 'Steem'">accounts</template><template v-else>addresses</template></span></p>
      <ul 
        v-if="platform === 'Ethereum'" 
        class="list">
        <li class="item">
          <div class="name">Mainnet <span class="boost">+10% {{ $t('profileStrength') }}</span></div>
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
          <div class="name">Mainnet <span class="boost">+10% {{ $t('profileStrength') }}</span></div>
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
      </ul>
      <ul 
        v-if="platform === 'GoChain'" 
        class="list">
        <li class="item">
          <div class="name">Mainnet <span class="boost">+10% {{ $t('profileStrength') }}</span></div>
          <div 
            :class="goChainMainnetErrors && goChainMainnetErrors.length > 0 ? '--has-errors' : ''" 
            class="input-wrapper">
            <textarea 
              :value="goChainMainnet" 
              class="input" 
              placeholder="Enter GoChain addresses (one per line)" 
              maxlength="11000" 
              @input="updateAndValidate('goChainMainnet', $event.target.value)"/>
            <ul 
              v-if="goChainMainnetErrors && goChainMainnetErrors.length > 0" 
              class="error-list -contracts">
              <li 
                v-for="(error, index) in goChainMainnetErrors" 
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
          <div class="name">Mainnet <span class="boost">+10% {{ $t('profileStrength') }}</span></div>
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
      <ul
        v-if="platform === 'Steem'"
        class="list">
        <li class="item">
          <div class="name">Mainnet <span class="boost">+10% {{ $t('profileStrength') }}</span></div>
          <div
            :class="steemMainnetErrors && steemMainnetErrors.length > 0 ? '--has-errors' : ''"
            class="input-wrapper">
            <textarea
              :value="steemMainnet"
              class="input"
              placeholder="Enter Steem accounts (one per line)"
              maxlength="11000"
              @input="updateAndValidate('steemMainnet', $event.target.value)"/>
            <ul
              v-if="steemMainnetErrors && steemMainnetErrors.length > 0"
              class="error-list -contracts">
              <li
                v-for="(error, index) in steemMainnetErrors"
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
import IconCheckmark from './IconCheckmark'

export default {
  components: {
    IconCheckmark
  },
  props: {
    platform: {
      type: String,
      required: true,
      default: ''
    },
    mainnet: {
      type: String,
      required: true,
      default: ''
    },
    mainnetErrors: {
      type: Array,
      required: true,
      default: () => []
    },
    ropsten: {
      type: String,
      required: true,
      default: ''
    },
    ropstenErrors: {
      type: Array,
      required: true,
      default: () => []
    },
    kovan: {
      type: String,
      required: true,
      default: ''
    },
    kovanErrors: {
      type: Array,
      required: true,
      default: () => []
    },
    rinkeby: {
      type: String,
      required: true,
      default: ''
    },
    rinkebyErrors: {
      type: Array,
      required: true,
      default: () => []
    },
    poaMainnet: {
      type: String,
      required: true,
      default: ''
    },
    poaMainnetErrors: {
      type: Array,
      required: true,
      default: () => []
    },
    goChainMainnet: {
      type: String,
      required: true,
      default: ''
    },
    goChainMainnetErrors: {
      type: Array,
      required: true,
      default: () => []
    },
    eosMainnet: {
      type: String,
      required: true,
      default: ''
    },
    eosMainnetErrors: {
      type: Array,
      required: true,
      default: () => []
    },
    steemMainnet: {
      type: String,
      required: true,
      default: ''
    },
    steemMainnetErrors: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      validationTimer: ''
    }
  },
  computed: {
    isComplete() {
      const ethereumIsComplete = Boolean(
        this.platform === 'Ethereum' &&
          ((this.mainnet.length >= 42 && !this.mainnetErrors.length) ||
            (this.ropsten.length >= 42 && !this.ropstenErrors.length) ||
            (this.kovan.length >= 42 && !this.kovanErrors.length) ||
            (this.rinkeby.length >= 42 && !this.rinkebyErrors.length))
      )
      const eosIsComplete = Boolean(
        this.platform === 'EOS' &&
          (this.eosMainnet.length && !this.eosMainnetErrors.length)
      )
      const poaIsComplete = Boolean(
        this.platform === 'POA' &&
          (this.poaMainnet.length >= 42 && !this.poaMainnetErrors.length)
      )
      const goChainIsComplete = Boolean(
        this.platform === 'GoChain' &&
          (this.goChainMainnet.length >= 42 &&
            !this.goChainMainnetErrors.length)
      )
      const steemIsComplete = Boolean(
        this.platform === 'Steem' &&
          (this.steemMainnet.length && !this.steemMainnetErrors.length)
      )
      return Boolean(
        ethereumIsComplete ||
          eosIsComplete ||
          poaIsComplete ||
          goChainIsComplete ||
          steemIsComplete
      )
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
              } else if (network.startsWith(`steem`)) {
                // https://steemit.com/programming/@cryptosharon/the-5-rules-of-a-valid-username-on-the-steem-blockchain-and-a-3-sbd-contest-to-make-an-account-name-validation-regex
                !element.match(
                  /(^[a-z](-[a-z0-9](-[a-z0-9])*)?(-[a-z0-9]|[a-z0-9])*(?:\.[a-z](-[a-z0-9](-[a-z0-9])*)?(-[a-z0-9]|[a-z0-9])*)*$)/
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
.error-list {
  &.-contracts {
    padding: 10px;
  }
}

.heading {
  font-weight: 700;
  margin-top: 20px !important;
  margin-bottom: 0.5rem;
}

.input-wrapper {
  &.--has-errors {
    border-color: $color--error;
  }
}

.list {
  margin-top: 5px;
}

.item {
  margin-bottom: 5px;
}

.name {
  padding: 8px 0;
}

.input-wrapper {
  flex-grow: 1;
  box-shadow: 0 0 20px rgba($color--black, 0.05);
  border: 1px solid transparent;
  background: rgba(lighten($color--gray, 100%), 0.9);
}

.input {
  @include font-text-mono;
  display: block;
  resize: none;
  min-height: 75px;
  width: 100%;
  padding: 10px 15px;
  border: none;
  font-size: 0.95rem;
}
</style>
