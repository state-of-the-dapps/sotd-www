<template>
  <div>
    <p class="heading">Contract addresses</p>
    <ul class="list">
      <li class="item">
        <div class="name">Mainnet</div>
        <div class="input-wrapper"><input class="input" type="text" v-model="mainnet" placeholder="0x..." maxlength="42"></div>
      </li>
      <li class="item">
        <div class="name">Ropsten</div>
        <div class="input-wrapper"><input class="input" type="text" v-model="ropsten" placeholder="0x..." maxlength="42"></div>
      </li>
      <li class="item">
        <div class="name">Kovan</div>
        <div class="input-wrapper"><input class="input" type="text" v-model="kovan" placeholder="0x..." maxlength="42"></div>
      </li>
      <li class="item">
        <div class="name">Rinkeby</div>
        <div class="input-wrapper"><input class="input" type="text" v-model="rinkeby" placeholder="0x..." maxlength="42"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    computed: {
      contracts () {
        return this.$store.getters['submit/contracts']
      },
      mainnet: {
        get () {
          return this.$store.getters['submit/contracts'].mainnet.address
        },
        set (value) {
          const field = {
            name: 'mainnet',
            value: value
          }
          this.$store.dispatch('submit/updateContract', field)
        }
      },
      ropsten: {
        get () {
          return this.$store.getters['submit/contracts'].ropsten.address
        },
        set (value) {
          const field = {
            name: 'ropsten',
            value: value
          }
          this.$store.dispatch('submit/updateContract', field)
        }
      },
      kovan: {
        get () {
          return this.$store.getters['submit/contracts'].kovan.address
        },
        set (value) {
          const field = {
            name: 'kovan',
            value: value
          }
          this.$store.dispatch('submit/updateContract', field)
        }
      },
      rinkeby: {
        get () {
          return this.$store.getters['submit/contracts'].rinkeby.address
        },
        set (value) {
          const field = {
            name: 'rinkeby',
            value: value
          }
          this.$store.dispatch('submit/updateContract', field)
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
  }

  input {
    width: 100%;
    padding: 8px 10px;
    border: none;
    background: rgba(lighten($color--gallery, 100%),.9);
  }
</style>
