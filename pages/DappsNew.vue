<template>
  <LayoutMain>
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
    <DappForm
      endpoint="dapps"
      mp-event-name="New DApp - Submit"/>
  </LayoutMain>
</template>

<script>
import { openIntercom } from '~/helpers/mixins'
import DappForm from '~/components/DappForm'
import LayoutMain from '~/components/LayoutMain'
import PageTitle from '~/components/PageTitle'

export default {
  components: {
    DappForm,
    LayoutMain,
    PageTitle
  },
  mixins: [openIntercom],
  beforeRouteLeave(to, from, next) {
    if (typeof window !== 'undefined') {
      const answer = window.confirm(
        'You are about to leave. Any unsubmitted changes will be lost'
      )
      if (answer) {
        next()
      } else {
        next(false)
      }
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
