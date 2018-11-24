<template>
  <LayoutMain>
    <div>
      <section class="section">
        <div class="text-container">
          <h1>About</h1>
          <p class="intro">State of the ÐApps is a not-for-profit curated directory of Decentralized Applications, also called ÐApps, on the <a 
            href="https://ethereum.org/" 
            target="_blank" 
            rel="noopener noreferrer">Ethereum Blockchain</a>. State of ÐApps was created to categorize and showcase developed projects built on the Ethereum Blockchain.</p>
          <p>The inspiration for State of the ÐApps came from FreshMeat now known as <a 
            href="http://freecode.com/" 
            target="_blank" 
            rel="noopener noreferrer">FreeCode</a> which was a site reference for Linux users, which had a big inventory of the open source applications, games and all sources for Linux.</p>
          <p>In State of the ÐApps there are many projects covering different fields such as health, Ponzi schemes, games, virtual reality, artificial intelligence, education, registries, job markets, tinder for horses and many more. The directory has become one of the biggest reference for the Ethereum ecosystem, we are referred to in talks, workshops, meetups; <a 
            href="https://twitter.com/VitalikButerin" 
            target="_blank" 
            rel="noopener noreferrer">Vitalik Buterin</a> included uses State of the ÐApps.</p>
          <p>We already have a really wonderful team contributing to the growth of the project, and our goal is to connect ÐApp creators and users.</p>
          <p>State of the ÐApps is a privately funded and independent project. We are open to collaboration with others when it is a good match for both parties, but what makes us successful is our autonomy &amp; objectivity.</p>
          <p>The entire project is open-source and available on github: <a 
            href="https://github.com/state-of-the-dapps" 
            target="_blank" 
            rel="noopener noreferrer">https://github.com/state-of-the-dapps</a></p>
          <p>Watch our video presentation of the project: <a 
            href="https://youtu.be/iqBNPh5IMqM" 
            target="_blank" 
            rel="noopener noreferrer">https://youtu.be/iqBNPh5IMqM</a></p>
          <p>And remember... smart contracts are neither smart, nor contracts!</p>
        </div>
      </section>
    </div>
  </LayoutMain>
</template>

<script>
import LayoutMain from '~/components/LayoutMain'

export default {
  components: {
    LayoutMain
  },
  head() {
    return {
      title: 'State of the ÐApps — About'
    }
  },
  mounted() {
    this.$store.dispatch('setSiteSection', '')
  }
}
</script>
