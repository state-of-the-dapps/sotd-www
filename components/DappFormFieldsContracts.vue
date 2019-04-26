<template>
  <div
    v-if="platform"
    class="DappFormFieldsContracts">
    <div>
      <p class="heading"><span class="checkmark"><IconCheckmark :fill="isComplete ? 'purple' : 'gray'"/></span><span>{{ platform }} contract <template v-if="platform === 'EOS' || platform === 'Steem'">accounts</template><template v-else>addresses</template></span></p>
      <template v-for="(field, index) in contractFields">
        <ul 
          v-if="platform === field.platform" 
          :key="index"
          class="list">
          <li 
            v-for="(network, index) in field.networks" 
            :id="network.id" 
            :key="index"
            class="item">
            <div class="name">{{ network.name }} <span class="boost">+10% {{ $t('profileStrength') }}</span></div>
            <div 
              :class="network.errors && network.errors.length > 0 ? '--has-errors' : ''" 
              class="input-wrapper">
              <textarea
                :id="network.id + 'Field'"
                :value="network.addresses" 
                class="input"
                placeholder="Enter addresses (one per line)" 
                maxlength="11000" 
                @input="updateAndValidate(network.id, $event.target.value)"/>
              <ul
                v-if="network.errors && network.errors.length > 0" 
                class="error-list -contracts">
                <li 
                  v-for="(error, index) in network.errors" 
                  :key="index" 
                  class="error-item">{{ error }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
import { platforms, platformNetworksWithErrorInfo } from '@/helpers/constants'
import IconCheckmark from './IconCheckmark'

const platformProps = () => {
  const obj = {}
  const networks = platformNetworksWithErrorInfo()
  networks.map(network => {
    obj[network.name] = {
      type: String,
      required: true,
      default: ''
    }
    if (network.canError) {
      obj[network.name + 'Errors'] = {
        type: Array,
        required: true,
        default: () => []
      }
    }
  })
  return obj
}

export default {
  components: {
    IconCheckmark
  },
  props: {
    ...platformProps(),
    platform: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      validationTimer: ''
    }
  },
  computed: {
    contractFields() {
      const fieldList = []
      platforms.map(platform => {
        const obj = {}
        obj['platform'] = platform.name
        if (
          platform.contracts &&
          platform.contracts.networks &&
          platform.contracts.networks.length
        ) {
          obj['networks'] = []
          platform.contracts.networks.map(network => {
            obj['networks'].push({
              addresses: this[network.id],
              id: network.id,
              name: network.name,
              errors: this[network.id + 'Errors']
            })
          })
          obj['canError'] = Boolean(
            platform.contracts.validations &&
              platform.contracts.validations.length
          )
        }
        fieldList.push(obj)
      })
      return fieldList
    },
    isComplete() {
      const completed = []
      platforms.map(platform => {
        if (
          platform.contracts &&
          platform.contracts.networks &&
          platform.contracts.networks.length &&
          platform.contracts.validations &&
          platform.contracts.validations.length
        ) {
          platform.contracts.networks.map(network => {
            if (this.platform === platform.name) {
              if (
                this[network.id].length &&
                !this[network.id + 'Errors'].length
              ) {
                completed.push(network.id)
              }
            }
          })
        }
      })
      return Boolean(completed.length)
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
              platforms.map(platform => {
                if (
                  platform.contracts &&
                  platform.contracts.networks &&
                  platform.contracts.networks.length &&
                  platform.contracts.validations &&
                  platform.contracts.validations.length
                ) {
                  platform.contracts.networks.map(platformNetwork => {
                    if (platformNetwork.id && network === platformNetwork.id) {
                      platform.contracts.validations.map(validation => {
                        if (
                          (validation.type === 'minLength' &&
                            element.length < validation.value) ||
                          (validation.type === 'maxLength' &&
                            element.length > validation.value) ||
                          (validation.type === 'startsWith' &&
                            !element.startsWith(validation.value)) ||
                          (validation.type === 'regEx' &&
                            !element.match(validation.value))
                        ) {
                          contractErrors.push(validation.message)
                        }
                      })
                    }
                  })
                }
              })
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
  @include highlight;
}
</style>
