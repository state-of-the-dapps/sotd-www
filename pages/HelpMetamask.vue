<template>
  <div class="page">
    <section class="section">
      <div class="text-container">
        <div class="icon-wrapper">
          <IconBadgeMetamask
            :width="36"
            :height="36"
            fill="black"/>
        </div>
        <h1 class="title-1">Welcome MetaMask Friends!</h1>
        <br>
        <p><strong>Welcome to the land of ÐApps and Ethereum.</strong></p>
        <p>Are you confused? We understand and are here to help you! The world of Decentralized Applications (ÐApps) on the Ethereum Blockchain can be quite overwhelming. There are many new confusing terms to understand. The learning curve can be pretty steep. Hang in there, the journey is exciting.</p>
        <p class="button-wrapper">
          <nuxt-link
            :to="localePath({name: 'rankings-platform', params: {platform: 'ethereum'}})"
            class="button"
            @click.native="trackMetamaskHelp">I'm ready to Explore Ethereum ÐApps</nuxt-link></p>
        <h2 class="title-2">Digital wallets</h2>
        <h3>Installing a digital wallet like MetaMask</h3>
        <ul class="list">
          <li>
            To use most ÐApps, you need a digital wallet. Commonly supported are digital wallets, like 
            <a
              href="https://metamask.io/?utm_source=StateOfTheDapps"
              target="_blank">Metamask</a>,  
            <a
              href="https://wallet.coinbase.com/?utm_source=StateOfTheDapps"
              target="_blank">Coinbase Wallet</a>, or 
            <a
              href="https://trustwallet.com/?utm_source=StateOfTheDapps"
              target="_blank">Trust Wallet</a>.
          </li>
          <li>
            After you install one of these wallets, it will guide you to to create an accounts. You can have multiple accounts for different purposes.</li>
          <li>
            You’ll need to put money in your wallet to make your first transaction. We can show you how to do that, too.
          </li>
          <li>
            Note: A digital wallet acts like a bank account — treat it with respect and make sure you don’t forget your password and seed words.
          </li>
        </ul>
        <h3>What are seed words? Why are they important?</h3>
        <p>Some wallets use seed words for backing up your account. They let you restore your account in the case it’s deleted. This also means that anyone with your seed words can access your account and steal your assets. Please be sure to save your seed words, and do not share them with others.</p>
        <h3>Can you change my digital wallet’s password?</h3>
        <p>No, we can’t. Wallets are independent programs that State of the ÐApps does not in any way control. This means we can’t help with resetting passwords or recovering lost accounts.</p>
        <h3>What is a “wallet address”?</h3>
        <p>Your public wallet address (e.g. 0xaba935f589805095a892ecefdb6eb83eff45d67) is a unique identifier for your wallet. It’s like a name. You can share it freely with others, and it’s used to direct assets to your wallet.</p>
        <h2 class="title-2">Ethereum, a digital currency</h2>
        <h3>What’s ether (ETH)? Why do I need it?</h3>
        <ul class="list">
          <li>Ether is a digital currency that powers the Ethereum network, which is what most ÐApps are built on. Ether acts like any other currency — its value fluctuates with the market.</li>
          <li>You need to convert your currency (e.g. USD, EUR, CNY) into ether to pay for things — and interact with ÐApps — on the Ethereum network.</li>
        </ul>
        <h3>How do I get ether? What is Coinbase?</h3>
        <ul class="list">
          <li>Some wallets let you buy currency directly, depending on the wallet and where you live.</li>
          <li>If your wallet doesn’t let you buy currency, you will need to purchase ETH from an exchange, and then transfer the ETH from your exchange wallet to your digital wallet.</li>
          <li>Some commonly used exchanges are 
            <a
              href="https://coinbase.com/?utm_source=StateOfTheDapps"
              target="_blank">Coinbase</a>, 
            <a
              href="https://kraken.com/?utm_source=StateOfTheDapps"
              target="_blank">Kraken</a>, and 
            <a
              href="https://binance.com/?utm_source=StateOfTheDapps"
              target="_blank">Binance</a>.
          </li>
          <li>You can’t use USD/EUR to directly send to a ÐApps — currencies need to be converted into ETH first.</li>
        </ul>
        <h3>How long does it take to receive ether?</h3>
        <p>If it’s your first time purchasing ether, your exchange will need to verify your identify; that can take a day or two, so it’ll leave you time for a cat nap. In addition, if you need to link a bank account to your exchange (rather than a credit card), your bank may need a few more days to verify the charges.</p>
        <h2 class="title-2">Other questions?</h2>
        <p>Do you have any questions not yet covered here? 
          <span
            class="link"
            @click="openIntercom">Ask us, maybe we can help!</span>
        </p>
        <p class="button-wrapper">
          <nuxt-link
            :to="localePath({name: 'rankings-platform', params: {platform: 'ethereum'}})"
            class="button"
            @click.native="trackMetamaskHelp">Explore Ethereum ÐApps</nuxt-link></p>
      </div>
    </section>
  </div>
</template>

<script>
import { trackMetamaskHelp } from '~/helpers/mixpanel'
import { openIntercom } from '~/helpers/mixins'
import IconBadgeMetamask from '~/components/IconBadgeMetamask'

export default {
  components: {
    IconBadgeMetamask
  },
  mixins: [openIntercom],
  methods: {
    trackMetamaskHelp() {
      const action = trackMetamaskHelp()
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  @include button;
  padding: 10px 15px;
  font-size: 1.15rem;
}

.button-wrapper {
  padding: 3rem 0 0 0;
  text-align: center;
}

.icon-wrapper {
  text-align: center;
  padding-bottom: 5px;
}

.intro {
  margin-top: 0.5rem;
}

.link {
  text-decoration: underline;
  cursor: pointer;
}

.list {
  font-size: 1.15rem;
  line-height: 1.4;
}

.option-description {
  margin-top: 0;
}

.option-description-wrapper {
  @include tweakpoint('min-width', 600px) {
    flex: 1;
  }
}

.option-cta {
  @include button;
  width: 100%;
}

.option-cta-wrapper {
  @include tweakpoint('min-width', 600px) {
    width: 150px;
    padding-left: 20px;
  }
}

.option-wrapper {
  padding-top: 1.5rem;
  @include tweakpoint('min-width', 600px) {
    display: flex;
  }
}

.option-title {
  margin: 0;
}

.page {
  padding-bottom: 50px;
}

.text-container {
  p {
    max-width: 100%;
    font-size: 1.2rem;
    line-height: 1.275;
    margin: 0.5rem 0;
  }
  h3 {
    margin-top: 2rem;
    margin-bottom: 0;
  }
}

.title-1 {
  @include title-1;
  font-size: 3.5rem;
  text-align: center;
  margin: 0;
}

.title-2 {
  @include title-2;
  font-size: 3rem;
  margin-bottom: 0;
  margin-top: 3rem;
  line-height: 1;
}
</style>
