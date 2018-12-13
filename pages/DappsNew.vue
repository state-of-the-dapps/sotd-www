<template>
  <LayoutMain>
    <div>
      <section class="section -intro">
        <div class="container">
          <PageTitle title="Submit a ÐApp"/>
          <div class="help-wrapper">
            <div class="icon-wrapper">
              <img
                src="~assets/images/dapp-icons/11.jpg"
                width="120"
                class="icon-image horse">
              <img
                src="~assets/images/dapp-icons/0.jpg"
                width="120"
                class="icon-image kitty">
            </div>
            <div class="text-wrapper">
              <p>Whether you are looking for new users, testers, concept feedback, partners, or investors, submitting a ÐApp (Decentralized Application) to this definitive registry will help your project gain traction.</p>
              <p>We welcome ÐApps at any stage in the product life-cycle (concepts are encouraged), or even ÐApps that you didn't make but noticed are missing.
                <a 
                  href="#"
                  @click="openIntercom">Ask us</a> if you have any questions!</p>
            </div>
          </div>
        </div>
      </section>
      <section class="section -form">
        <div class="container">
          <DappFormFields
            :errors="errors"
            :existing-dapp="existingDapp"
            :fields="fields"
            :warnings="warnings"
            @updateContract="updateContract"
            @updateErrors="updateErrors"
            @updateField="updateField"
            @updateSiteUrl="updateSiteUrl"
            @updateStatus="updateStatus"
            @updateWarnings="updateWarnings"
            @updateExistingDapp="updateExistingDapp"/>
          <DappFormSave/>
        </div>
      </section>
    </div>
  </LayoutMain>
</template>

<script>
import { dispatchErrors, dispatchWarnings } from '~/helpers/mixins'
import { mapActions, mapGetters } from 'vuex'
import { openIntercom } from '~/helpers/mixins'
import DappFormFields from '~/components/DappFormFields'
import DappFormSave from '~/components/DappFormSave'
import LayoutMain from '~/components/LayoutMain'
import PageTitle from '~/components/PageTitle'

export default {
  components: {
    DappFormFields,
    DappFormSave,
    LayoutMain,
    PageTitle
  },
  mixins: [dispatchErrors, dispatchWarnings, openIntercom],
  computed: {
    ...mapGetters('dapps/form', [
      'fields',
      'errors',
      'existingDapp',
      'warnings'
    ])
  },
  mounted() {
    this.$store.dispatch('setSiteSection', 'dapps')
  },
  methods: {
    ...mapActions('dapps/form', [
      'setContract',
      'setExistingDapp',
      'setField',
      'setSiteUrl',
      'setStatus'
    ]),
    updateContract(field, value) {
      const fieldObj = {
        name: field,
        value: value
      }
      this.setContract(fieldObj)
    },
    updateExistingDapp(dapp) {
      this.setExistingDapp(dapp)
    },
    updateErrors(errors) {
      this.dispatchErrors(errors, 'dapps')
    },
    updateField(field, value) {
      const fieldObj = {
        name: field,
        value: value
      }
      this.setField(fieldObj)
    },
    updateSiteUrl(field, value) {
      const fieldObj = {
        name: field,
        value: value
      }
      this.setSiteUrl(fieldObj)
    },
    updateStatus(value) {
      this.setStatus(value)
    },
    updateWarnings(warnings) {
      this.dispatchWarnings(warnings, 'dapps')
    }
  },
  head() {
    return {
      title: 'State of the ÐApps — Submit a ÐApp'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.title-1 {
  @include title-1;
  text-align: center;
  font-size: 3.2rem;
  margin: 0;
}

.description {
  text-align: left;
  max-width: 600px;
  margin: 0.5rem auto 0 auto;
  font-size: 1.1rem;
}

.container {
  padding-top: 0;
  padding-bottom: 0;
}

.help-wrapper {
  margin: 0 auto;
  max-width: 735px;
  font-size: 1.15rem;
  line-height: 1.4;
  @include tweakpoint('min-width', $tweakpoint--default) {
    display: flex;
    flex-direction: row-reverse;
  }
}

.icon-image {
  border-radius: 4px;
  transform: rotate(4deg);
  box-shadow: 0 5px 15px rgba($color--black, 0.1);
  &.horse {
    transform: rotate(0deg);
  }
  &.kitty {
    position: relative;
    top: 4px;
    left: -20px;
  }
}

.icon-wrapper {
  padding-top: 15px;
  text-align: center;
}

.section {
  &.-intro {
    position: relative;
    z-index: 15;
  }
  &.-form {
    .container {
      display: flex;
      flex-direction: column;
      margin: 20px auto;
      @include tweakpoint('min-width', $tweakpoint--default) {
        margin: 30px auto 200px;
        flex-direction: row;
        width: 800px;
      }
    }
  }
}

.text-wrapper {
  flex: 1;
  padding: 0 10px;
  @include tweakpoint('min-width', $tweakpoint--default) {
    padding: 0;
    padding-right: 20px;
  }
}
</style>
